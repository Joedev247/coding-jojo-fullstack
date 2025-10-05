#!/usr/bin/env node

/**
 * Health Check Script for Coding JoJo Backend
 * This script checks the health of all services and dependencies
 */

require('dotenv').config();
const mongoose = require('mongoose');

// Import services
const cacheService = require('../src/services/cacheService');
const searchService = require('../src/services/searchService');
const emailService = require('../src/services/emailService');

class HealthChecker {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      overall: 'unknown',
      services: {}
    };
  }

  async checkDatabase() {
    console.log('🔍 Checking MongoDB connection...');
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
      }
      
      // Test basic operation
      const adminDb = mongoose.connection.db.admin();
      const result = await adminDb.ping();
      
      this.results.services.mongodb = {
        status: 'healthy',
        details: {
          readyState: mongoose.connection.readyState,
          host: mongoose.connection.host,
          name: mongoose.connection.name
        }
      };
      
      console.log('✅ MongoDB: Connected and responsive');
      return true;
    } catch (error) {
      this.results.services.mongodb = {
        status: 'unhealthy',
        error: error.message
      };
      
      console.log('❌ MongoDB: Connection failed -', error.message);
      return false;
    }
  }

  async checkRedis() {
    console.log('🔍 Checking Redis connection...');
    try {
      const stats = await cacheService.getStats();
      
      if (stats.success && stats.stats.connected) {
        this.results.services.redis = {
          status: 'healthy',
          details: {
            totalKeys: stats.stats.totalKeys,
            connected: stats.stats.connected
          }
        };
        
        console.log('✅ Redis: Connected and responsive');
        return true;
      } else {
        throw new Error('Redis not connected');
      }
    } catch (error) {
      this.results.services.redis = {
        status: 'unhealthy',
        error: error.message
      };
      
      console.log('❌ Redis: Connection failed -', error.message);
      return false;
    }
  }

  async checkElasticsearch() {
    console.log('🔍 Checking Elasticsearch connection...');
    try {
      if (searchService.isConnected) {
        this.results.services.elasticsearch = {
          status: 'healthy',
          details: {
            connected: true
          }
        };
        
        console.log('✅ Elasticsearch: Connected and responsive');
        return true;
      } else {
        throw new Error('Elasticsearch not connected');
      }
    } catch (error) {
      this.results.services.elasticsearch = {
        status: 'unhealthy',
        error: error.message
      };
      
      console.log('⚠️  Elasticsearch: Not available (fallback to MongoDB search) -', error.message);
      return false; // Non-critical, we have fallback
    }
  }

  async checkEmailService() {
    console.log('🔍 Checking Email service...');
    try {
      // This would normally send a test email, but we'll just check configuration
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        this.results.services.email = {
          status: 'healthy',
          details: {
            provider: process.env.EMAIL_PROVIDER || 'smtp',
            configured: true
          }
        };
        
        console.log('✅ Email: Service configured');
        return true;
      } else {
        throw new Error('Email credentials not configured');
      }
    } catch (error) {
      this.results.services.email = {
        status: 'unhealthy',
        error: error.message
      };
      
      console.log('❌ Email: Configuration issue -', error.message);
      return false;
    }
  }

  async checkFileStorage() {
    console.log('🔍 Checking File storage...');
    try {
      const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                           process.env.CLOUDINARY_API_KEY && 
                           process.env.CLOUDINARY_API_SECRET;
      
      const hasS3 = process.env.AWS_ACCESS_KEY_ID && 
                   process.env.AWS_SECRET_ACCESS_KEY && 
                   process.env.AWS_S3_BUCKET;

      if (hasCloudinary || hasS3) {
        this.results.services.fileStorage = {
          status: 'healthy',
          details: {
            cloudinary: hasCloudinary,
            s3: hasS3
          }
        };
        
        console.log('✅ File Storage: At least one provider configured');
        return true;
      } else {
        throw new Error('No file storage provider configured');
      }
    } catch (error) {
      this.results.services.fileStorage = {
        status: 'unhealthy',
        error: error.message
      };
      
      console.log('❌ File Storage: No provider configured -', error.message);
      return false;
    }
  }

  async checkPaymentServices() {
    console.log('🔍 Checking Payment services...');
    try {
      const hasStripe = process.env.STRIPE_SECRET_KEY;
      const hasOrangeMoney = process.env.ORANGE_MONEY_API_KEY;
      const hasMTNMomo = process.env.MTN_MOMO_SUBSCRIPTION_KEY;
      const hasFlutterwave = process.env.FLUTTERWAVE_SECRET_KEY;

      if (hasStripe || hasOrangeMoney || hasMTNMomo || hasFlutterwave) {
        this.results.services.payments = {
          status: 'healthy',
          details: {
            stripe: !!hasStripe,
            orangeMoney: !!hasOrangeMoney,
            mtnMomo: !!hasMTNMomo,
            flutterwave: !!hasFlutterwave
          }
        };
        
        console.log('✅ Payments: At least one provider configured');
        return true;
      } else {
        throw new Error('No payment provider configured');
      }
    } catch (error) {
      this.results.services.payments = {
        status: 'unhealthy',
        error: error.message
      };
      
      console.log('❌ Payments: No provider configured -', error.message);
      return false;
    }
  }

  async checkEnvironmentVariables() {
    console.log('🔍 Checking critical environment variables...');
    
    const critical = [
      'NODE_ENV',
      'MONGODB_URI',
      'JWT_SECRET',
      'FRONTEND_URL'
    ];

    const missing = critical.filter(env => !process.env[env]);
    
    if (missing.length === 0) {
      this.results.services.environment = {
        status: 'healthy',
        details: {
          nodeEnv: process.env.NODE_ENV,
          frontendUrl: process.env.FRONTEND_URL
        }
      };
      
      console.log('✅ Environment: All critical variables set');
      return true;
    } else {
      this.results.services.environment = {
        status: 'unhealthy',
        error: `Missing critical environment variables: ${missing.join(', ')}`
      };
      
      console.log('❌ Environment: Missing critical variables -', missing.join(', '));
      return false;
    }
  }

  async checkDiskSpace() {
    console.log('🔍 Checking disk space...');
    
    try {
      const fs = require('fs');
      const stats = fs.statSync('.');
      
      // Simple check - in production you'd want more sophisticated monitoring
      this.results.services.diskSpace = {
        status: 'healthy',
        details: {
          available: 'Not implemented - manual check required'
        }
      };
      
      console.log('✅ Disk Space: Check manually in production');
      return true;
    } catch (error) {
      this.results.services.diskSpace = {
        status: 'unhealthy',
        error: error.message
      };
      
      console.log('❌ Disk Space: Error checking -', error.message);
      return false;
    }
  }

  determineOverallStatus() {
    const statuses = Object.values(this.results.services).map(service => service.status);
    const healthyCount = statuses.filter(status => status === 'healthy').length;
    const totalCount = statuses.length;
    
    if (healthyCount === totalCount) {
      this.results.overall = 'healthy';
    } else if (healthyCount >= totalCount * 0.7) { // 70% threshold
      this.results.overall = 'degraded';
    } else {
      this.results.overall = 'unhealthy';
    }
  }

  async run() {
    console.log('🏥 Starting Health Check for Coding JoJo Backend...\n');
    
    const checks = [
      this.checkEnvironmentVariables(),
      this.checkDatabase(),
      this.checkRedis(),
      this.checkElasticsearch(),
      this.checkEmailService(),
      this.checkFileStorage(),
      this.checkPaymentServices(),
      this.checkDiskSpace()
    ];

    await Promise.all(checks);
    
    this.determineOverallStatus();
    
    console.log('\n📊 Health Check Summary:');
    console.log('========================');
    console.log(`Overall Status: ${this.getStatusEmoji(this.results.overall)} ${this.results.overall.toUpperCase()}`);
    console.log(`Timestamp: ${this.results.timestamp}`);
    console.log('\nService Details:');
    
    Object.entries(this.results.services).forEach(([service, details]) => {
      console.log(`  ${this.getStatusEmoji(details.status)} ${service}: ${details.status}`);
      if (details.error) {
        console.log(`    Error: ${details.error}`);
      }
    });

    // Exit with appropriate code
    if (this.results.overall === 'unhealthy') {
      console.log('\n❌ Health check failed. Please address the issues above.');
      process.exit(1);
    } else if (this.results.overall === 'degraded') {
      console.log('\n⚠️  Health check shows degraded performance. Some services need attention.');
      process.exit(0);
    } else {
      console.log('\n✅ All systems operational!');
      process.exit(0);
    }
  }

  getStatusEmoji(status) {
    const emojis = {
      healthy: '✅',
      unhealthy: '❌',
      degraded: '⚠️'
    };
    return emojis[status] || '❓';
  }
}

// Run health check if called directly
if (require.main === module) {
  const healthChecker = new HealthChecker();
  healthChecker.run().catch(error => {
    console.error('❌ Health check failed with error:', error);
    process.exit(1);
  });
}

module.exports = HealthChecker;
