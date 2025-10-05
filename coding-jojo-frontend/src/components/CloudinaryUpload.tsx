"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  cloudinaryConfig,
  uploadPresets,
  fileLimits,
  allowedTypes,
} from "../lib/cloudinary";

interface CloudinaryUploadProps {
  onUploadSuccess: (result: any) => void;
  onUploadError?: (error: string) => void;
  uploadType: "image" | "video" | "thumbnail" | "avatar" | "resource";
  maxFiles?: number;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: "uploading" | "success" | "error";
  url?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  uploadType,
  maxFiles = 1,
  children,
  className = "",
  disabled = false,
}) => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    const maxSize = fileLimits[uploadType];
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(
        maxSize / (1024 * 1024)
      )}MB`;
    }

    // Map avatar and thumbnail to image for allowedTypes lookup
    const typeKey = uploadType === "avatar" || uploadType === "thumbnail" ? "image" : uploadType;
    const allowedFileTypes = allowedTypes[typeKey] || allowedTypes.image;
    if (!allowedFileTypes.includes(file.type)) {
      return `File type not allowed. Allowed types: ${allowedFileTypes.join(
        ", "
      )}`;
    }

    return null;
  };

  const uploadToCloudinary = async (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      // Map uploadType to correct uploadPresets key
      let presetKey: keyof typeof uploadPresets;
      switch (uploadType) {
        case "image":
        case "thumbnail":
        case "avatar":
          presetKey = (uploadType + "s") as keyof typeof uploadPresets; // images, thumbnails, avatars
          break;
        case "video":
          presetKey = "videos";
          break;
        case "resource":
          presetKey = "resources";
          break;
        default:
          presetKey = "images";
      }
      formData.append("upload_preset", uploadPresets[presetKey]);
      formData.append("folder", `coding-jojo/${uploadType}s`);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress((prev) =>
            prev.map((item) =>
              item.fileName === file.name ? { ...item, progress } : item
            )
          );
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          setUploadProgress((prev) =>
            prev.map((item) =>
              item.fileName === file.name
                ? { ...item, status: "success", url: result.secure_url }
                : item
            )
          );
          resolve(result);
        } else {
          const error = `Upload failed with status: ${xhr.status}`;
          setUploadProgress((prev) =>
            prev.map((item) =>
              item.fileName === file.name ? { ...item, status: "error" } : item
            )
          );
          reject(new Error(error));
        }
      });

      xhr.addEventListener("error", () => {
        const error = "Upload failed due to network error";
        setUploadProgress((prev) =>
          prev.map((item) =>
            item.fileName === file.name ? { ...item, status: "error" } : item
          )
        );
        reject(new Error(error));
      });

      const resourceType =
        uploadType === "video"
          ? "video"
          : uploadType === "resource"
          ? "raw"
          : "image";
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/${resourceType}/upload`;

      xhr.open("POST", uploadUrl);
      xhr.send(formData);
    });
  };

  const handleFiles = useCallback(
    async (files: FileList) => {
      if (disabled) return;

      const filesToUpload = Array.from(files).slice(0, maxFiles);

      // Initialize upload progress
      const initialProgress: UploadProgress[] = filesToUpload.map((file) => ({
        fileName: file.name,
        progress: 0,
        status: "uploading" as const,
      }));
      setUploadProgress(initialProgress);

      try {
        const uploadPromises = filesToUpload.map(async (file) => {
          // Validate file
          const validationError = validateFile(file);
          if (validationError) {
            throw new Error(validationError);
          }

          // Upload to Cloudinary
          const result = await uploadToCloudinary(file);
          return {
            file,
            result: {
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              size: result.bytes,
              duration: result.duration, // For videos
              resourceType: result.resource_type,
            },
          };
        });

        const results = await Promise.all(uploadPromises);

        // Call success callback
        if (maxFiles === 1) {
          onUploadSuccess(results[0].result);
        } else {
          onUploadSuccess(results.map((r) => r.result));
        }

        // Clear progress after a delay
        setTimeout(() => {
          setUploadProgress([]);
        }, 2000);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        onUploadError?.(errorMessage);

        // Clear progress on error
        setTimeout(() => {
          setUploadProgress([]);
        }, 3000);
      }
    },
    [disabled, maxFiles, uploadType, onUploadSuccess, onUploadError]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (!disabled && e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [disabled, handleFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const getAcceptTypes = () => {
    const typeKey = uploadType === "avatar" || uploadType === "thumbnail" ? "image" : uploadType;
    return allowedTypes[typeKey]?.join(",") || "*/*";
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={maxFiles > 1}
        accept={getAcceptTypes()}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          cursor-pointer transition-all duration-200
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-400"
          }
          border-2 border-dashed  p-6 text-center
        `}
      >
        {children || (
          <div className="space-y-2">
            <div className="text-gray-600">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">
                {uploadType === "image" && "PNG, JPG, WEBP up to 10MB"}
                {uploadType === "video" && "MP4, WebM up to 500MB"}
                {uploadType === "thumbnail" && "PNG, JPG up to 5MB"}
                {uploadType === "avatar" && "PNG, JPG up to 2MB"}
                {uploadType === "resource" && "PDF, DOC, ZIP up to 50MB"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadProgress.map((progress) => (
            <div key={progress.fileName} className="bg-gray-50  p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 truncate">
                  {progress.fileName}
                </span>
                <span className="text-xs text-gray-500">
                  {progress.status === "uploading" && `${progress.progress}%`}
                  {progress.status === "success" && "✓ Complete"}
                  {progress.status === "error" && "✗ Failed"}
                </span>
              </div>

              {progress.status === "uploading" && (
                <div className="w-full  bg-gray-900 rounded-full h-2">
                  <div
                    className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>
              )}

              {progress.status === "success" && progress.url && (
                <div className="text-xs text-green-600">Upload successful</div>
              )}

              {progress.status === "error" && (
                <div className="text-xs text-red-600">Upload failed</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
