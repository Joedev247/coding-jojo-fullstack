'use client';

import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration for frontend
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 'your-api-key',
  // Note: API secret should never be exposed on frontend
};

// Configure cloudinary (for server-side usage only)
if (typeof window === 'undefined') {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export { cloudinary };

// Utility functions for Cloudinary URLs
export const getCloudinaryUrl = (publicId: string, options: any = {}) => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}`;
  
  // Build transformation string
  let transformation = '';
  if (options.width || options.height || options.crop || options.quality) {
    const transformations = [];
    
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);
    if (options.quality) transformations.push(`q_${options.quality}`);
    if (options.format) transformations.push(`f_${options.format}`);
    
    transformation = transformations.length > 0 ? `/${transformations.join(',')}` : '';
  }
  
  return `${baseUrl}/image/upload${transformation}/${publicId}`;
};

export const getVideoUrl = (publicId: string, options: any = {}) => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}`;
  
  // Build transformation string for video
  let transformation = '';
  if (options.width || options.height || options.quality) {
    const transformations = [];
    
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.quality) transformations.push(`q_${options.quality}`);
    if (options.format) transformations.push(`f_${options.format}`);
    
    transformation = transformations.length > 0 ? `/${transformations.join(',')}` : '';
  }
  
  return `${baseUrl}/video/upload${transformation}/${publicId}`;
};

// Image optimization presets
export const imagePresets = {
  thumbnail: {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto'
  },
  courseCard: {
    width: 300,
    height: 200,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto'
  },
  avatar: {
    width: 150,
    height: 150,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto:good',
    format: 'auto'
  },
  hero: {
    width: 1200,
    height: 600,
    crop: 'fill',
    quality: 'auto:best',
    format: 'auto'
  }
};

// Video optimization presets
export const videoPresets = {
  preview: {
    quality: 'auto:low',
    format: 'mp4'
  },
  hd: {
    quality: 'auto:good',
    format: 'mp4'
  },
  mobile: {
    width: 720,
    quality: 'auto:low',
    format: 'mp4'
  }
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, preset: keyof typeof imagePresets = 'thumbnail') => {
  return getCloudinaryUrl(publicId, imagePresets[preset]);
};

// Helper function to get optimized video URL
export const getOptimizedVideoUrl = (publicId: string, preset: keyof typeof videoPresets = 'hd') => {
  return getVideoUrl(publicId, videoPresets[preset]);
};

// Upload preset names (configured in Cloudinary dashboard)
export const uploadPresets = {
  images: 'coding_jojo_images',
  videos: 'coding_jojo_videos',
  thumbnails: 'coding_jojo_thumbnails',
  avatars: 'coding_jojo_avatars',
  resources: 'coding_jojo_resources'
};

// File size limits (in bytes)
export const fileLimits = {
  image: 10 * 1024 * 1024, // 10MB
  video: 500 * 1024 * 1024, // 500MB
  thumbnail: 5 * 1024 * 1024, // 5MB
  avatar: 2 * 1024 * 1024, // 2MB
  resource: 50 * 1024 * 1024, // 50MB
};

// Allowed file types
export const allowedTypes = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  video: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'],
  resource: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/zip',
    'application/x-zip-compressed'
  ]
};
