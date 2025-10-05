const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const crypto = require('crypto');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3();

class FileStorageService {
  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET || 'coding-jojo-files';
    this.cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN;
  }

  // Configure multer for S3 uploads
  getS3Upload() {
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: this.bucketName,
        metadata: (req, file, cb) => {
          cb(null, {
            fieldName: file.fieldname,
            uploadedBy: req.user?.id || 'anonymous',
            uploadedAt: new Date().toISOString()
          });
        },
        key: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileExtension = path.extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtension}`;
          
          // Organize files by type
          let folder = 'misc';
          if (file.mimetype.startsWith('image/')) {
            folder = 'images';
          } else if (file.mimetype.startsWith('video/')) {
            folder = 'videos';
          } else if (file.mimetype.startsWith('audio/')) {
            folder = 'audio';
          } else if (file.mimetype === 'application/pdf') {
            folder = 'documents';
          }
          
          cb(null, `${folder}/${fileName}`);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE
      }),
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
        files: 10 // Maximum 10 files per upload
      },
      fileFilter: (req, file, cb) => {
        // Define allowed file types
        const allowedTypes = [
          'image/jpeg', 'image/png', 'image/gif', 'image/webp',
          'video/mp4', 'video/webm', 'video/ogg',
          'audio/mp3', 'audio/wav', 'audio/ogg',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/zip',
          'text/plain'
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(`File type ${file.mimetype} not allowed`), false);
        }
      }
    });
  }

  // Direct upload to S3
  async uploadFile(fileBuffer, fileName, options = {}) {
    try {
      const {
        contentType = 'application/octet-stream',
        folder = 'misc',
        isPublic = true,
        metadata = {}
      } = options;

      const key = `${folder}/${fileName}`;
      
      const uploadParams = {
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
        Metadata: {
          ...metadata,
          uploadedAt: new Date().toISOString()
        }
      };

      if (isPublic) {
        uploadParams.ACL = 'public-read';
      }

      const result = await s3.upload(uploadParams).promise();

      return {
        success: true,
        data: {
          key: result.Key,
          url: result.Location,
          cdnUrl: this.cloudfrontDomain ? 
            `https://${this.cloudfrontDomain}/${result.Key}` : 
            result.Location,
          bucket: result.Bucket,
          etag: result.ETag
        }
      };
    } catch (error) {
      console.error('S3 upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate presigned URL for direct browser uploads
  generatePresignedUrl(fileName, fileType, expiryMinutes = 15) {
    const key = `uploads/${Date.now()}-${fileName}`;
    
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: expiryMinutes * 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    return new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            uploadUrl: url,
            key: key,
            fileUrl: `https://${this.bucketName}.s3.${AWS.config.region}.amazonaws.com/${key}`
          });
        }
      });
    });
  }

  // Get file from S3
  async getFile(key) {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key
      };

      const result = await s3.getObject(params).promise();
      
      return {
        success: true,
        data: {
          body: result.Body,
          contentType: result.ContentType,
          contentLength: result.ContentLength,
          lastModified: result.LastModified,
          metadata: result.Metadata
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete file from S3
  async deleteFile(key) {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key
      };

      await s3.deleteObject(params).promise();
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete multiple files
  async deleteFiles(keys) {
    try {
      const params = {
        Bucket: this.bucketName,
        Delete: {
          Objects: keys.map(key => ({ Key: key })),
          Quiet: false
        }
      };

      const result = await s3.deleteObjects(params).promise();
      
      return {
        success: true,
        deleted: result.Deleted,
        errors: result.Errors
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate signed URL for secure file access
  generateSignedUrl(key, expiryHours = 24) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: expiryHours * 3600
    };

    return s3.getSignedUrl('getObject', params);
  }

  // Copy file within bucket
  async copyFile(sourceKey, destinationKey) {
    try {
      const params = {
        Bucket: this.bucketName,
        CopySource: `${this.bucketName}/${sourceKey}`,
        Key: destinationKey
      };

      const result = await s3.copyObject(params).promise();
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // List files in a folder
  async listFiles(prefix = '', maxKeys = 100) {
    try {
      const params = {
        Bucket: this.bucketName,
        Prefix: prefix,
        MaxKeys: maxKeys
      };

      const result = await s3.listObjectsV2(params).promise();
      
      return {
        success: true,
        data: {
          files: result.Contents.map(file => ({
            key: file.Key,
            size: file.Size,
            lastModified: file.LastModified,
            etag: file.ETag,
            url: `https://${this.bucketName}.s3.${AWS.config.region}.amazonaws.com/${file.Key}`
          })),
          totalFiles: result.KeyCount,
          isTruncated: result.IsTruncated,
          nextToken: result.NextContinuationToken
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get file metadata
  async getFileMetadata(key) {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key
      };

      const result = await s3.headObject(params).promise();
      
      return {
        success: true,
        data: {
          contentType: result.ContentType,
          contentLength: result.ContentLength,
          lastModified: result.LastModified,
          etag: result.ETag,
          metadata: result.Metadata
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Backup database to S3
  async backupDatabase(backupData, backupName) {
    try {
      const key = `backups/database/${backupName}-${Date.now()}.json`;
      const buffer = Buffer.from(JSON.stringify(backupData, null, 2));

      const result = await this.uploadFile(buffer, key, {
        contentType: 'application/json',
        folder: 'backups/database',
        isPublic: false,
        metadata: {
          backupType: 'database',
          backupName,
          backupDate: new Date().toISOString()
        }
      });

      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Optimize images using AWS Lambda (if configured)
  async optimizeImage(imageKey, options = {}) {
    try {
      const {
        width = 800,
        height = 600,
        quality = 80,
        format = 'webp'
      } = options;

      // This would typically invoke a Lambda function
      // For now, return the original image URL
      const optimizedKey = `optimized/${imageKey}`;
      
      return {
        success: true,
        data: {
          originalKey: imageKey,
          optimizedKey,
          originalUrl: `https://${this.bucketName}.s3.${AWS.config.region}.amazonaws.com/${imageKey}`,
          optimizedUrl: `https://${this.bucketName}.s3.${AWS.config.region}.amazonaws.com/${optimizedKey}`
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create multipart upload for large files
  async createMultipartUpload(fileName, contentType) {
    try {
      const key = `uploads/large/${Date.now()}-${fileName}`;
      
      const params = {
        Bucket: this.bucketName,
        Key: key,
        ContentType: contentType
      };

      const result = await s3.createMultipartUpload(params).promise();
      
      return {
        success: true,
        data: {
          uploadId: result.UploadId,
          key: result.Key,
          bucket: result.Bucket
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Upload part for multipart upload
  async uploadPart(uploadId, key, partNumber, body) {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
        PartNumber: partNumber,
        UploadId: uploadId,
        Body: body
      };

      const result = await s3.uploadPart(params).promise();
      
      return {
        success: true,
        data: {
          etag: result.ETag,
          partNumber: partNumber
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Complete multipart upload
  async completeMultipartUpload(uploadId, key, parts) {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts.map(part => ({
            ETag: part.etag,
            PartNumber: part.partNumber
          }))
        }
      };

      const result = await s3.completeMultipartUpload(params).promise();
      
      return {
        success: true,
        data: {
          location: result.Location,
          bucket: result.Bucket,
          key: result.Key,
          etag: result.ETag
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new FileStorageService();
