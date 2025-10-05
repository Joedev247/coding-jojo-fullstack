import { apiClient, ApiResponse } from '../lib/api';

export interface VideoUpload {
  id: string;
  originalName: string;
  filename: string;
  size: number;
  duration?: number;
  resolution?: string;
  format: string;
  status: 'uploading' | 'processing' | 'ready' | 'failed';
  progress: number;
  url?: string;
  thumbnailUrl?: string;
  playbackUrls?: {
    [quality: string]: string; // 480p, 720p, 1080p
  };
  captions?: VideoCaption[];
  watermarkEnabled: boolean;
  drmEnabled: boolean;
  downloadEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VideoCaption {
  id: string;
  language: string;
  label: string;
  url: string;
  default: boolean;
}

export interface VideoAnalytics {
  videoId: string;
  totalViews: number;
  totalWatchTime: number; // in seconds
  averageWatchTime: number;
  completionRate: number; // percentage
  viewsByCountry: { [country: string]: number };
  viewsByDevice: { [device: string]: number };
  retentionData: Array<{
    timestamp: number;
    retention: number;
  }>;
}

export interface ChunkUploadSession {
  sessionId: string;
  totalChunks: number;
  chunkSize: number;
  uploadedChunks: number[];
  filename: string;
}

class VideoService {
  private baseURL: string;
  private chunkSize: number = 5 * 1024 * 1024; // 5MB chunks

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://codingjojo-backend.onrender.com/api';
  }

  // Chunked Video Upload
  async initializeChunkedUpload(file: File): Promise<ApiResponse<ChunkUploadSession>> {
    const totalChunks = Math.ceil(file.size / this.chunkSize);
    
    return apiClient.post('/videos/upload/initialize', {
      filename: file.name,
      fileSize: file.size,
      totalChunks,
      chunkSize: this.chunkSize,
      contentType: file.type
    });
  }

  async uploadChunk(
    sessionId: string,
    chunkIndex: number,
    chunk: Blob,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ chunkIndex: number; uploaded: boolean }>> {
    const formData = new FormData();
    formData.append('sessionId', sessionId);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('chunk', chunk);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            success: true,
            data: JSON.parse(xhr.responseText),
            message: 'Chunk uploaded successfully'
          });
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Upload failed'));
      };

      xhr.open('POST', `${this.baseURL}/videos/upload/chunk`);
      
      // Add authorization header if available
      const token = localStorage.getItem('token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      xhr.send(formData);
    });
  }

  async completeChunkedUpload(
    sessionId: string,
    metadata: {
      title: string;
      description?: string;
      courseId?: string;
      lessonId?: string;
      watermarkEnabled?: boolean;
      drmEnabled?: boolean;
      downloadEnabled?: boolean;
    }
  ): Promise<ApiResponse<VideoUpload>> {
    return apiClient.post('/videos/upload/complete', {
      sessionId,
      ...metadata
    });
  }

  async uploadVideo(
    file: File,
    metadata: {
      title: string;
      description?: string;
      courseId?: string;
      lessonId?: string;
      watermarkEnabled?: boolean;
      drmEnabled?: boolean;
      downloadEnabled?: boolean;
    },
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<VideoUpload>> {
    try {
      // Initialize chunked upload
      const initResponse = await this.initializeChunkedUpload(file);
      if (!initResponse.success) {
        throw new Error(initResponse.message);
      }

      const session = initResponse.data;
      const totalChunks = session.totalChunks;
      let overallProgress = 0;

      // Upload chunks
      for (let i = 0; i < totalChunks; i++) {
        const start = i * this.chunkSize;
        const end = Math.min(start + this.chunkSize, file.size);
        const chunk = file.slice(start, end);

        await this.uploadChunk(session.sessionId, i, chunk, (chunkProgress) => {
          // Calculate overall progress
          const chunkWeight = 1 / totalChunks;
          overallProgress = (i * chunkWeight + (chunkProgress / 100) * chunkWeight) * 100;
          
          if (onProgress) {
            onProgress(Math.min(overallProgress, 95)); // Reserve 5% for completion
          }
        });
      }

      // Complete upload
      const completeResponse = await this.completeChunkedUpload(session.sessionId, metadata);
      
      if (onProgress) {
        onProgress(100);
      }

      return completeResponse;
    } catch (error: any) {
      throw new Error(error.message || 'Video upload failed');
    }
  }

  // Video Management
  async getVideo(videoId: string): Promise<ApiResponse<VideoUpload>> {
    return apiClient.get(`/videos/${videoId}`);
  }

  async getVideos(courseId?: string, page = 1, limit = 20): Promise<ApiResponse<{
    videos: VideoUpload[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (courseId) {
      params.append('courseId', courseId);
    }

    return apiClient.get(`/videos?${params.toString()}`);
  }

  async updateVideo(videoId: string, updates: Partial<VideoUpload>): Promise<ApiResponse<VideoUpload>> {
    return apiClient.put(`/videos/${videoId}`, updates);
  }

  async deleteVideo(videoId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/videos/${videoId}`);
  }

  // Video Processing
  async reprocessVideo(videoId: string, options: {
    generateThumbnails?: boolean;
    transcodeQuality?: string[];
    extractAudio?: boolean;
    generateCaptions?: boolean;
  }): Promise<ApiResponse<VideoUpload>> {
    return apiClient.post(`/videos/${videoId}/reprocess`, options);
  }

  async getProcessingStatus(videoId: string): Promise<ApiResponse<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    currentStep: string;
    estimatedTimeRemaining?: number;
  }>> {
    return apiClient.get(`/videos/${videoId}/processing-status`);
  }

  // Captions and Subtitles
  async uploadCaptions(videoId: string, file: File, language: string, label: string): Promise<ApiResponse<VideoCaption>> {
    const formData = new FormData();
    formData.append('captions', file);
    formData.append('language', language);
    formData.append('label', label);

    return apiClient.post(`/videos/${videoId}/captions`, formData);
  }

  async generateAutoCaptions(videoId: string, language = 'en'): Promise<ApiResponse<VideoCaption>> {
    return apiClient.post(`/videos/${videoId}/captions/auto-generate`, {
      language
    });
  }

  async deleteCaptions(videoId: string, captionId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/videos/${videoId}/captions/${captionId}`);
  }

  // Video Analytics
  async getVideoAnalytics(videoId: string, timeRange = '30d'): Promise<ApiResponse<VideoAnalytics>> {
    return apiClient.get(`/videos/${videoId}/analytics?timeRange=${timeRange}`);
  }

  async recordVideoView(videoId: string, data: {
    watchTime: number;
    progress: number;
    quality: string;
    device: string;
    country?: string;
  }): Promise<ApiResponse<void>> {
    return apiClient.post(`/videos/${videoId}/views`, data);
  }

  // Video Security
  async generateSecurePlaybackUrl(videoId: string, expiresIn = 3600): Promise<ApiResponse<{
    playbackUrl: string;
    expiresAt: string;
    token: string;
  }>> {
    return apiClient.post(`/videos/${videoId}/secure-url`, {
      expiresIn
    });
  }

  async enableWatermark(videoId: string, options: {
    text?: string;
    imageUrl?: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    opacity: number;
  }): Promise<ApiResponse<VideoUpload>> {
    return apiClient.post(`/videos/${videoId}/watermark`, options);
  }

  async disableWatermark(videoId: string): Promise<ApiResponse<VideoUpload>> {
    return apiClient.delete(`/videos/${videoId}/watermark`);
  }

  // CDN and Optimization
  async optimizeForRegion(videoId: string, regions: string[]): Promise<ApiResponse<{
    optimizedUrls: { [region: string]: string };
  }>> {
    return apiClient.post(`/videos/${videoId}/optimize-regions`, {
      regions
    });
  }

  async preloadVideo(videoId: string): Promise<ApiResponse<void>> {
    return apiClient.post(`/videos/${videoId}/preload`);
  }

  // Download Management
  async generateDownloadLink(videoId: string, quality = 'original'): Promise<ApiResponse<{
    downloadUrl: string;
    expiresAt: string;
    fileSize: number;
  }>> {
    return apiClient.post(`/videos/${videoId}/download`, {
      quality
    });
  }

  async enableOfflineDownload(videoId: string): Promise<ApiResponse<VideoUpload>> {
    return apiClient.put(`/videos/${videoId}/offline-download`, {
      enabled: true
    });
  }

  async disableOfflineDownload(videoId: string): Promise<ApiResponse<VideoUpload>> {
    return apiClient.put(`/videos/${videoId}/offline-download`, {
      enabled: false
    });
  }

  // Utility Methods
  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  }

  getVideoThumbnail(videoId: string, timestamp = 0): string {
    return `${this.baseURL}/videos/${videoId}/thumbnail?t=${timestamp}`;
  }

  getSupportedFormats(): string[] {
    return ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm'];
  }

  getQualityOptions(): Array<{ value: string; label: string; bitrate: string }> {
    return [
      { value: '240p', label: '240p (Low)', bitrate: '400 kbps' },
      { value: '360p', label: '360p (Medium)', bitrate: '800 kbps' },
      { value: '480p', label: '480p (Good)', bitrate: '1.2 Mbps' },
      { value: '720p', label: '720p (HD)', bitrate: '2.5 Mbps' },
      { value: '1080p', label: '1080p (Full HD)', bitrate: '5 Mbps' },
      { value: '1440p', label: '1440p (2K)', bitrate: '8 Mbps' },
      { value: '2160p', label: '2160p (4K)', bitrate: '15 Mbps' }
    ];
  }
}

export const videoService = new VideoService();
export default videoService;
