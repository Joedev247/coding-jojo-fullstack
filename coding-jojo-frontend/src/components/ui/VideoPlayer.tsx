import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  poster?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title = 'Course Video',
  poster,
  width = '100%',
  height = 'auto',
  className = '',
  autoplay = false,
  controls = true,
  muted = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Debug: Log video URL to check if it's valid
    console.log('Loading video:', {
      videoUrl,
      title,
      poster
    });

    // Check if video URL is valid
    if (!videoUrl || !videoUrl.includes('cloudinary.com')) {
      console.warn('Invalid or missing Cloudinary video URL:', videoUrl);
    }
  }, [videoUrl, title, poster]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video failed to load:', {
      videoUrl,
      error: e.currentTarget.error,
      networkState: e.currentTarget.networkState,
      readyState: e.currentTarget.readyState
    });
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully:', videoUrl);
  };

  if (!videoUrl) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width, height: height === 'auto' ? '300px' : height }}
      >
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-2">📹</div>
          <p>No video available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <video
        ref={videoRef}
        width={width}
        height={height}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        poster={poster}
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
        className="w-full h-full object-cover "
        preload="metadata"
      >
        {/* FIXED: Use secure_url for video source */}
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/mov" />
        
        {/* Fallback for browsers that don't support video tag */}
        Your browser does not support the video tag.
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          Download video
        </a>
      </video>

      {/* Loading overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-200 hover:opacity-100">
        <div className="text-white text-center">
          <div className="text-2xl mb-2">▶️</div>
          <p className="text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
