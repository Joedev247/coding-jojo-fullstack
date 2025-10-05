import React, { useState } from 'react';
import { Upload, X, Play, FileVideo, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface CourseUploadFormProps {
  onCourseCreated?: (course: any) => void;
}

const CourseUploadForm: React.FC<CourseUploadFormProps> = ({ onCourseCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [uploadedThumbnail, setUploadedThumbnail] = useState<any>(null);
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const toast = useToast();

  // Handle thumbnail file selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle video file selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  // Upload thumbnail to Cloudinary
  const uploadThumbnail = async () => {
    if (!thumbnailFile) return null;

    const formData = new FormData();
    formData.append('thumbnail', thumbnailFile);

    try {
      const response = await fetch('/api/upload/course-thumbnail', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Thumbnail uploaded successfully:', data.data);
        setUploadedThumbnail(data.data);
        toast.success('Thumbnail uploaded successfully');
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to upload thumbnail');
      }
    } catch (error) {
      console.error('Thumbnail upload error:', error);
      toast.error('Failed to upload thumbnail');
      throw error;
    }
  };

  // Upload video to Cloudinary
  const uploadVideo = async () => {
    if (!videoFile) return null;

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('/api/upload/course-video', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Video uploaded successfully:', data.data);
        setUploadedVideo(data.data);
        toast.success('Video uploaded successfully');
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to upload video');
      }
    } catch (error) {
      console.error('Video upload error:', error);
      toast.error('Failed to upload video');
      throw error;
    }
  };

  // Handle file uploads
  const handleUploadFiles = async () => {
    setIsUploading(true);
    try {
      const thumbnailData = await uploadThumbnail();
      const videoData = await uploadVideo();
      
      console.log('Files uploaded:', { thumbnailData, videoData });
      
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Create course with uploaded files
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedThumbnail || !uploadedVideo) {
      toast.error('Please upload both thumbnail and video first');
      return;
    }

    setIsCreating(true);
    
    try {
      const courseData = {
        ...formData,
        thumbnailUrl: uploadedThumbnail.thumbnailUrl, // FIXED: Use secure_url
        thumbnail: uploadedThumbnail.thumbnail,
        courseContent: [
          {
            sectionTitle: 'Introduction',
            lessons: [
              {
                title: 'Welcome to the Course',
                videoUrl: uploadedVideo.videoUrl, // FIXED: Use secure_url
                videoData: uploadedVideo.videoData,
              }
            ]
          }
        ]
      };

      // Debug: Log course data being sent
      console.log('Creating course with data:', courseData);

      const response = await fetch('/api/upload/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`,
        },
        body: JSON.stringify(courseData),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Course created successfully!');
        console.log('Course created:', result.data);
        
        if (onCourseCreated) {
          onCourseCreated(result.data);
        }
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          level: 'beginner',
          price: 0,
        });
        setThumbnailFile(null);
        setVideoFile(null);
        setThumbnailPreview('');
        setUploadedThumbnail(null);
        setUploadedVideo(null);
        
      } else {
        throw new Error(result.error || 'Failed to create course');
      }
    } catch (error) {
      console.error('Course creation error:', error);
      toast.error('Failed to create course');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Course</h2>
      
      <form onSubmit={handleCreateCourse} className="space-y-6">
        {/* Basic Course Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            rows={4}
            required
          />
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Thumbnail
            </label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              {thumbnailPreview ? (
                <div className="relative">
                  <img src={thumbnailPreview} alt="Preview" className="w-full h-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnailFile(null);
                      setThumbnailPreview('');
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-400">Upload thumbnail</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Video
            </label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              {videoFile ? (
                <div className="flex items-center justify-center space-x-2">
                  <FileVideo className="w-8 h-8 text-green-400" />
                  <span className="text-white">{videoFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setVideoFile(null)}
                    className="bg-red-600 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Play className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-400">Upload video</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Files Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleUploadFiles}
            disabled={!thumbnailFile || !videoFile || isUploading}
            className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-md flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Files'}</span>
          </button>
        </div>

        {/* Create Course Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!uploadedThumbnail || !uploadedVideo || isCreating}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-8 py-3 rounded-md text-lg"
          >
            {isCreating ? 'Creating Course...' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseUploadForm;
