#!/usr/bin/env node

/**
 * Database Backup Script for Coding JoJo Backend
 * This script creates backups of MongoDB data and uploads to S3
 */

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const fileStorageService = require('../src/services/fileStorageService');

class DatabaseBackup {
  constructor() {
    this.backupDir = path.join(__dirname, '../backups');
    this.timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  }

  async ensureBackupDirectory() {
    try {
      await fs.mkdir(this.backupDir, { recursive: true });
      console.log('✅ Backup directory ready');
    } catch (error) {
      console.error('❌ Failed to create backup directory:', error);
      throw error;
    }
  }

  async createMongoDump() {
    const dumpPath = path.join(this.backupDir, `mongodb-dump-${this.timestamp}`);
    
    return new Promise((resolve, reject) => {
      console.log('🗄️  Creating MongoDB dump...');
      
      const uri = process.env.MONGODB_URI;
      const args = [
        '--uri', uri,
        '--out', dumpPath
      ];

      const mongodump = spawn('mongodump', args, {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let output = '';
      let errorOutput = '';

      mongodump.stdout.on('data', (data) => {
        output += data.toString();
      });

      mongodump.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      mongodump.on('close', (code) => {
        if (code === 0) {
          console.log('✅ MongoDB dump created successfully');
          resolve(dumpPath);
        } else {
          console.error('❌ MongoDB dump failed:', errorOutput);
          reject(new Error(`mongodump exited with code ${code}: ${errorOutput}`));
        }
      });

      mongodump.on('error', (error) => {
        console.error('❌ Failed to start mongodump:', error);
        reject(error);
      });
    });
  }

  async createJSONBackup() {
    console.log('📄 Creating JSON backup...');
    
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      
      const collections = await mongoose.connection.db.listCollections().toArray();
      const backup = {
        timestamp: new Date().toISOString(),
        database: mongoose.connection.name,
        collections: {}
      };

      for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        console.log(`   Backing up collection: ${collectionName}`);
        
        const collection = mongoose.connection.db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        
        backup.collections[collectionName] = {
          count: documents.length,
          documents: documents
        };
      }

      const backupPath = path.join(this.backupDir, `backup-${this.timestamp}.json`);
      await fs.writeFile(backupPath, JSON.stringify(backup, null, 2));
      
      console.log(`✅ JSON backup created: ${backupPath}`);
      return backupPath;
    } catch (error) {
      console.error('❌ JSON backup failed:', error);
      throw error;
    }
  }

  async compressBackup(sourcePath) {
    console.log('🗜️  Compressing backup...');
    
    return new Promise((resolve, reject) => {
      const outputPath = `${sourcePath}.tar.gz`;
      const tar = spawn('tar', ['-czf', outputPath, '-C', path.dirname(sourcePath), path.basename(sourcePath)]);

      tar.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Backup compressed successfully');
          resolve(outputPath);
        } else {
          reject(new Error(`tar exited with code ${code}`));
        }
      });

      tar.on('error', (error) => {
        console.error('❌ Compression failed:', error);
        reject(error);
      });
    });
  }

  async uploadToS3(filePath) {
    console.log('☁️  Uploading backup to S3...');
    
    try {
      const fileBuffer = await fs.readFile(filePath);
      const fileName = path.basename(filePath);
      
      const result = await fileStorageService.uploadFile(fileBuffer, fileName, {
        folder: 'backups/database',
        isPublic: false,
        metadata: {
          backupType: 'database',
          timestamp: this.timestamp,
          size: fileBuffer.length
        }
      });

      if (result.success) {
        console.log('✅ Backup uploaded to S3:', result.data.key);
        return result.data;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('❌ S3 upload failed:', error);
      throw error;
    }
  }

  async cleanupLocalFiles(filePath) {
    console.log('🧹 Cleaning up local backup files...');
    
    try {
      await fs.unlink(filePath);
      
      // Also remove uncompressed directory if it exists
      const dirPath = filePath.replace('.tar.gz', '');
      try {
        await fs.rmdir(dirPath, { recursive: true });
      } catch (error) {
        // Directory might not exist, ignore
      }
      
      console.log('✅ Local files cleaned up');
    } catch (error) {
      console.error('⚠️  Failed to cleanup local files:', error);
      // Don't throw, as backup was successful
    }
  }

  async cleanupOldBackups() {
    console.log('🗑️  Cleaning up old backups...');
    
    try {
      const retentionDays = parseInt(process.env.BACKUP_RETENTION_DAYS) || 30;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      // List S3 backups
      const backups = await fileStorageService.listFiles('backups/database/', 1000);
      
      if (backups.success) {
        const oldBackups = backups.data.files.filter(file => 
          new Date(file.lastModified) < cutoffDate
        );

        if (oldBackups.length > 0) {
          console.log(`   Found ${oldBackups.length} old backups to delete`);
          
          const deleteKeys = oldBackups.map(file => file.key);
          const deleteResult = await fileStorageService.deleteFiles(deleteKeys);
          
          if (deleteResult.success) {
            console.log(`✅ Deleted ${deleteResult.deleted.length} old backups`);
          }
        } else {
          console.log('   No old backups to delete');
        }
      }
    } catch (error) {
      console.error('⚠️  Failed to cleanup old backups:', error);
      // Don't throw, as main backup was successful
    }
  }

  async generateBackupReport(backupInfo) {
    const report = {
      timestamp: new Date().toISOString(),
      success: true,
      backup: backupInfo,
      database: {
        name: mongoose.connection.name,
        host: mongoose.connection.host
      },
      environment: process.env.NODE_ENV
    };

    const reportPath = path.join(this.backupDir, `backup-report-${this.timestamp}.json`);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`📊 Backup report generated: ${reportPath}`);
    return report;
  }

  showHelp() {
    console.log('💾 Coding JoJo Database Backup Tool');
    console.log('Usage: node scripts/backup.js [options]');
    console.log('');
    console.log('Options:');
    console.log('  --type=json     - Create JSON backup (default)');
    console.log('  --type=mongodump - Use mongodump for backup');
    console.log('  --no-upload     - Skip S3 upload');
    console.log('  --no-cleanup    - Keep local files');
    console.log('  --no-compress   - Skip compression');
    console.log('  --help          - Show this help message');
    console.log('');
    console.log('Environment Variables:');
    console.log('  MONGODB_URI           - MongoDB connection string');
    console.log('  AWS_ACCESS_KEY_ID     - AWS credentials for S3 upload');
    console.log('  AWS_SECRET_ACCESS_KEY - AWS credentials for S3 upload');
    console.log('  AWS_S3_BUCKET         - S3 bucket for backups');
    console.log('  BACKUP_RETENTION_DAYS - Days to keep backups (default: 30)');
  }

  async run() {
    const args = process.argv.slice(2);
    
    if (args.includes('--help')) {
      this.showHelp();
      return;
    }

    const options = {
      type: args.find(arg => arg.startsWith('--type='))?.split('=')[1] || 'json',
      upload: !args.includes('--no-upload'),
      cleanup: !args.includes('--no-cleanup'),
      compress: !args.includes('--no-compress')
    };

    console.log('💾 Starting Database Backup...');
    console.log(`   Type: ${options.type}`);
    console.log(`   Upload to S3: ${options.upload}`);
    console.log(`   Compress: ${options.compress}`);
    console.log(`   Cleanup: ${options.cleanup}`);
    console.log('');

    try {
      await this.ensureBackupDirectory();
      
      let backupPath;
      
      if (options.type === 'mongodump') {
        backupPath = await this.createMongoDump();
      } else {
        backupPath = await this.createJSONBackup();
      }

      let finalPath = backupPath;
      
      if (options.compress) {
        finalPath = await this.compressBackup(backupPath);
      }

      let uploadInfo = null;
      if (options.upload) {
        uploadInfo = await this.uploadToS3(finalPath);
        await this.cleanupOldBackups();
      }

      if (options.cleanup) {
        await this.cleanupLocalFiles(finalPath);
      }

      const report = await this.generateBackupReport({
        path: finalPath,
        upload: uploadInfo,
        type: options.type,
        compressed: options.compress
      });

      console.log('\n✅ Backup completed successfully!');
      console.log(`   Backup file: ${finalPath}`);
      if (uploadInfo) {
        console.log(`   S3 location: ${uploadInfo.key}`);
      }

    } catch (error) {
      console.error('\n❌ Backup failed:', error.message);
      process.exit(1);
    } finally {
      if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
      }
    }
  }
}

// Run backup if called directly
if (require.main === module) {
  const backup = new DatabaseBackup();
  backup.run().catch(error => {
    console.error('❌ Backup script failed:', error);
    process.exit(1);
  });
}

module.exports = DatabaseBackup;
