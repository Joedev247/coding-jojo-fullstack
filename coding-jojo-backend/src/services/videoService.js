const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class VideoService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads/videos');
    this.tempDir = path.join(__dirname, '../../uploads/temp');
    
    // Ensure directories exist
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  // Upload video with multiple quality options
  async uploadVideo(filePath, options = {}) {
    try {
      const {
        folder = 'coding-jojo/videos',
        generateSubtitles = true,
        createThumbnail = true,
        adaptiveStreaming = true
      } = options;

      const uploadOptions = {
        resource_type: 'video',
        folder,
        use_filename: true,
        unique_filename: true,
        chunk_size: 6000000, // 6MB chunks for large files
      };

      // Add adaptive streaming for bandwidth optimization
      if (adaptiveStreaming) {
        uploadOptions.eager = [
          // Multiple quality versions for adaptive streaming
          { quality: 'auto:low', format: 'mp4' },
          { quality: 'auto:good', format: 'mp4' },
          { quality: 'auto:best', format: 'mp4' },
          // HLS streaming for mobile
          { streaming_profile: 'hd', format: 'auto' }
        ];
        uploadOptions.eager_async = true;
      }

      const result = await cloudinary.uploader.upload(filePath, uploadOptions);

      // Generate thumbnail if requested
      let thumbnail = null;
      if (createThumbnail) {
        thumbnail = await this.generateThumbnail(result.public_id);
      }

      // Extract video metadata
      const metadata = await this.extractVideoMetadata(filePath);

      return {
        success: true,
        data: {
          videoId: result.public_id,
          url: result.secure_url,
          duration: result.duration,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          thumbnail: thumbnail?.secure_url,
          adaptiveUrls: this.generateAdaptiveUrls(result.public_id),
          metadata
        }
      };
    } catch (error) {
      console.error('Video upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate multiple quality URLs for adaptive streaming
  generateAdaptiveUrls(publicId) {
    return {
      '240p': cloudinary.url(publicId, {
        resource_type: 'video',
        quality: 'auto:low',
        format: 'mp4'
      }),
      '480p': cloudinary.url(publicId, {
        resource_type: 'video',
        quality: 'auto:good',
        format: 'mp4'
      }),
      '720p': cloudinary.url(publicId, {
        resource_type: 'video',
        quality: 'auto:best',
        format: 'mp4'
      }),
      hls: cloudinary.url(publicId, {
        resource_type: 'video',
        streaming_profile: 'hd',
        format: 'auto'
      })
    };
  }

  // Generate video thumbnail
  async generateThumbnail(videoPublicId, timestamp = '50%') {
    try {
      const thumbnailResult = await cloudinary.uploader.upload(
        cloudinary.url(videoPublicId, {
          resource_type: 'video',
          start_offset: timestamp,
          format: 'jpg'
        }),
        {
          folder: 'coding-jojo/thumbnails',
          use_filename: true,
          unique_filename: true
        }
      );

      return thumbnailResult;
    } catch (error) {
      console.error('Thumbnail generation error:', error);
      return null;
    }
  }

  // Extract video metadata using ffmpeg
  async extractVideoMetadata(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
        } else {
          const videoStream = metadata.streams.find(s => s.codec_type === 'video');
          const audioStream = metadata.streams.find(s => s.codec_type === 'audio');

          resolve({
            duration: metadata.format.duration,
            bitrate: metadata.format.bit_rate,
            size: metadata.format.size,
            video: videoStream ? {
              codec: videoStream.codec_name,
              width: videoStream.width,
              height: videoStream.height,
              fps: eval(videoStream.r_frame_rate),
              bitrate: videoStream.bit_rate
            } : null,
            audio: audioStream ? {
              codec: audioStream.codec_name,
              sampleRate: audioStream.sample_rate,
              channels: audioStream.channels,
              bitrate: audioStream.bit_rate
            } : null
          });
        }
      });
    });
  }

  // Process video in chunks for large uploads
  async processChunkedUpload(chunks, originalName, options = {}) {
    try {
      const tempFilePath = path.join(this.tempDir, `${Date.now()}_${originalName}`);
      const writeStream = fs.createWriteStream(tempFilePath);

      // Combine chunks
      for (const chunk of chunks) {
        writeStream.write(chunk);
      }
      writeStream.end();

      // Wait for write to complete
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      // Upload the combined file
      const result = await this.uploadVideo(tempFilePath, options);

      // Clean up temp file
      fs.unlinkSync(tempFilePath);

      return result;
    } catch (error) {
      console.error('Chunked upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate signed URL for secure video access
  generateSecureUrl(videoId, expiryHours = 24) {
    const expiryTimestamp = Math.floor(Date.now() / 1000) + (expiryHours * 3600);
    
    return cloudinary.url(videoId, {
      resource_type: 'video',
      sign_url: true,
      expires_at: expiryTimestamp
    });
  }

  // Get video analytics from Cloudinary
  async getVideoAnalytics(videoId) {
    try {
      const result = await cloudinary.api.resource(videoId, {
        resource_type: 'video',
        image_metadata: true
      });

      return {
        success: true,
        data: {
          views: result.views || 0,
          bytes: result.bytes,
          duration: result.duration,
          format: result.format,
          createdAt: result.created_at,
          lastViewed: result.last_updated
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete video from Cloudinary
  async deleteVideo(videoId) {
    try {
      await cloudinary.uploader.destroy(videoId, {
        resource_type: 'video'
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate video subtitles (placeholder for future integration)
  async generateSubtitles(videoId, language = 'en') {
    // This would integrate with services like:
    // - AWS Transcribe
    // - Google Speech-to-Text
    // - Azure Speech Services
    
    return {
      success: false,
      message: 'Subtitle generation not yet implemented'
    };
  }

  // Optimize video for different regions/bandwidths
  getOptimizedUrl(videoId, options = {}) {
    const {
      quality = 'auto',
      bandwidth = 'auto',
      region = 'auto',
      format = 'auto'
    } = options;

    const transformations = {
      resource_type: 'video',
      quality: bandwidth === 'low' ? 'auto:low' : quality,
      format
    };

    // Add region-specific optimizations
    if (region === 'africa') {
      transformations.quality = 'auto:low';
      transformations.flags = 'lossy';
    }

    return cloudinary.url(videoId, transformations);
  }

  // Create video playlist for sequential lessons
  generatePlaylist(videoIds, options = {}) {
    const {
      autoPlay = true,
      quality = 'auto:good',
      format = 'mp4'
    } = options;

    return videoIds.map((videoId, index) => ({
      id: videoId,
      url: cloudinary.url(videoId, {
        resource_type: 'video',
        quality,
        format
      }),
      thumbnail: this.generateThumbnail(videoId),
      order: index + 1,
      autoPlay: autoPlay && index === 0
    }));
  }

  // Get video streaming statistics
  async getStreamingStats(videoId, period = '7d') {
    try {
      // This would integrate with Cloudinary Analytics API
      // For now, return mock data structure
      return {
        success: true,
        data: {
          totalViews: 0,
          uniqueViewers: 0,
          averageWatchTime: 0,
          completionRate: 0,
          topRegions: [],
          deviceBreakdown: {
            mobile: 0,
            desktop: 0,
            tablet: 0
          },
          qualityDistribution: {
            '240p': 0,
            '480p': 0,
            '720p': 0,
            '1080p': 0
          }
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

module.exports = new VideoService();
