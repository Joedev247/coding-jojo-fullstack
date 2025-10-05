'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  RotateCcw,
  Loader2,
  Download,
  MessageSquare,
  Captions,
  Wifi,
  WifiOff,
  Share2,
  Bookmark,
  Clock
} from 'lucide-react';
import { VideoUpload, videoService } from '../../services/videoService';
import { useToast } from '../../contexts/ToastContext';

interface CustomVideoPlayerProps {
  video: VideoUpload;
  autoplay?: boolean;
  controls?: boolean;
  watermark?: string;
  onProgress?: (progress: number, currentTime: number, duration: number) => void;
  onComplete?: () => void;
  allowDownload?: boolean;
  showComments?: boolean;
  className?: string;
}

interface PlayerSettings {
  quality: string;
  playbackSpeed: number;
  captions: string | null;
  volume: number;
}

export default function CustomVideoPlayer({
  video,
  autoplay = false,
  controls = true,
  watermark,
  onProgress,
  onComplete,
  allowDownload = false,
  showComments = false,
  className = ''
}: CustomVideoPlayerProps) {
  const { success: showSuccess, error: showError } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [watchTime, setWatchTime] = useState(0);
  
  const [settings, setSettings] = useState<PlayerSettings>({
    quality: '720p',
    playbackSpeed: 1,
    captions: null,
    volume: 1
  });

  const [comments, setComments] = useState<Array<{
    id: string;
    timestamp: number;
    text: string;
    user: string;
    avatar?: string;
  }>>([]);
  const [newComment, setNewComment] = useState('');
  const [showAddComment, setShowAddComment] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        setIsLoading(false);
      };

      const handleTimeUpdate = () => {
        const current = video.currentTime;
        setCurrentTime(current);
        setWatchTime(prev => prev + 1);

        if (onProgress) {
          onProgress((current / video.duration) * 100, current, video.duration);
        }

        // Record view data periodically
        if (Math.floor(current) % 30 === 0) {
          recordViewData(current);
        }
      };

      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          setBuffered((bufferedEnd / video.duration) * 100);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        recordViewData(video.duration, true);
        if (onComplete) {
          onComplete();
        }
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleWaiting = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('progress', handleProgress);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('canplay', handleCanPlay);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('progress', handleProgress);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [video, onProgress, onComplete]);

  const recordViewData = useCallback(async (currentTime: number, isComplete = false) => {
    try {
      await videoService.recordVideoView(video.id, {
        watchTime: currentTime,
        progress: (currentTime / duration) * 100,
        quality: settings.quality,
        device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        country: 'CM' // Could be detected via IP
      });
    } catch (error) {
      console.error('Error recording view data:', error);
    }
  }, [video.id, duration, settings.quality]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changeVolume = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      setSettings(prev => ({ ...prev, volume: newVolume }));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      
      if (!newMuted && volume === 0) {
        changeVolume(0.5);
      }
    }
  };

  const changeQuality = (quality: string) => {
    if (videoRef.current && video.playbackUrls?.[quality]) {
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;
      
      videoRef.current.src = video.playbackUrls[quality];
      videoRef.current.currentTime = currentTime;
      
      if (wasPlaying) {
        videoRef.current.play();
      }
      
      setSettings(prev => ({ ...prev, quality }));
      showSuccess(`Quality changed to ${quality}`);
    }
  };

  const changePlaybackSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setSettings(prev => ({ ...prev, playbackSpeed: speed }));
      showSuccess(`Playback speed: ${speed}x`);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const hideControlsAfterDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    hideControlsAfterDelay();
  };

  const downloadVideo = async () => {
    try {
      const response = await videoService.generateDownloadLink(video.id, settings.quality);
      if (response.success) {
        const link = document.createElement('a');
        link.href = response.data.downloadUrl;
        link.download = video.originalName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showSuccess('Download started');
      }
    } catch (error) {
      showError('Failed to download video');
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        timestamp: currentTime,
        text: newComment.trim(),
        user: 'Current User', // Replace with actual user
        avatar: '/default-avatar.png'
      };
      
      setComments(prev => [...prev, comment]);
      setNewComment('');
      setShowAddComment(false);
      showSuccess('Comment added');
    }
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const qualityOptions = videoService.getQualityOptions().filter(
    option => video.playbackUrls?.[option.value]
  );

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  if (!isOnline && !video.url) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-900 ">
        <WifiOff className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-300 text-center">
          You're offline. This video is not available for offline viewing.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black  overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.playbackUrls?.[settings.quality] || video.url}
        autoPlay={autoplay}
        className="w-full h-full"
        playsInline
        preload="metadata"
      />

      {/* Watermark */}
      {watermark && (
        <div className="absolute top-4 right-4 text-white text-sm opacity-50 bg-black/30 px-2 py-1 rounded">
          {watermark}
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      {/* Controls Overlay */}
      {controls && (
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {!isOnline && (
                <div className="flex items-center space-x-1 text-yellow-400">
                  <WifiOff className="h-4 w-4" />
                  <span className="text-xs">Offline</span>
                </div>
              )}
              <span className="text-white text-sm">{video.originalName}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {allowDownload && (
                <button
                  onClick={downloadVideo}
                  className="p-2 text-white hover:text-pink-400 transition-colors"
                  title="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
              )}
              
              {showComments && (
                <button
                  onClick={() => setShowAddComment(!showAddComment)}
                  className="p-2 text-white hover:text-pink-400 transition-colors"
                  title="Add Comment"
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
              )}
              
              <button className="p-2 text-white hover:text-pink-400 transition-colors" title="Share">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div 
              ref={progressBarRef}
              className="w-full h-2 bg-gray-600 rounded-full cursor-pointer mb-4 group/progress"
              onClick={handleSeek}
            >
              {/* Buffered Bar */}
              <div 
                className="absolute h-2 bg-gray-500 rounded-full"
                style={{ width: `${buffered}%` }}
              />
              {/* Progress Bar */}
              <div 
                className="absolute h-2 bg-pink-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              {/* Progress Handle */}
              <div 
                className="absolute w-4 h-4 bg-pink-500 rounded-full -top-1 transform -translate-x-1/2 opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlayPause}
                  className="p-1 text-white hover:text-pink-400 transition-colors"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                
                <button
                  onClick={() => skip(-10)}
                  className="p-1 text-white hover:text-pink-400 transition-colors"
                  title="Skip back 10s"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => skip(10)}
                  className="p-1 text-white hover:text-pink-400 transition-colors"
                  title="Skip forward 10s"
                >
                  <SkipForward className="h-5 w-5" />
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="p-1 text-white hover:text-pink-400 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  
                  <div className="w-20 h-1 bg-gray-600 rounded-full cursor-pointer group/volume">
                    <div 
                      className="h-1 bg-pink-500 rounded-full"
                      style={{ width: `${volume * 100}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => changeVolume(parseFloat(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {video.captions && video.captions.length > 0 && (
                  <button
                    className="p-1 text-white hover:text-pink-400 transition-colors"
                    title="Captions"
                  >
                    <Captions className="h-5 w-5" />
                  </button>
                )}
                
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1 text-white hover:text-pink-400 transition-colors"
                    title="Settings"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                  
                  {/* Settings Menu */}
                  {showSettings && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900  p-3 min-w-[200px] shadow-lg">
                      <div className="space-y-3">
                        {/* Quality */}
                        <div>
                          <label className="block text-white text-sm mb-1">Quality</label>
                          <select
                            value={settings.quality}
                            onChange={(e) => changeQuality(e.target.value)}
                            className="w-full bg-gray-800 text-white text-sm rounded p-1"
                          >
                            {qualityOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Speed */}
                        <div>
                          <label className="block text-white text-sm mb-1">Speed</label>
                          <select
                            value={settings.playbackSpeed}
                            onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}
                            className="w-full bg-gray-800 text-white text-sm rounded p-1"
                          >
                            {speedOptions.map((speed) => (
                              <option key={speed} value={speed}>
                                {speed}x
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Captions */}
                        {video.captions && video.captions.length > 0 && (
                          <div>
                            <label className="block text-white text-sm mb-1">Captions</label>
                            <select
                              value={settings.captions || ''}
                              onChange={(e) => setSettings(prev => ({ ...prev, captions: e.target.value || null }))}
                              className="w-full bg-gray-800 text-white text-sm rounded p-1"
                            >
                              <option value="">Off</option>
                              {video.captions.map((caption) => (
                                <option key={caption.id} value={caption.id}>
                                  {caption.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={toggleFullscreen}
                  className="p-1 text-white hover:text-pink-400 transition-colors"
                  title="Fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize className="h-5 w-5" />
                  ) : (
                    <Maximize className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Comment Modal */}
      {showAddComment && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-gray-900  p-6 w-full max-w-md">
            <h3 className="text-white text-lg font-semibold mb-4">Add Comment</h3>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">at {formatTime(currentTime)}</span>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your comment..."
                className="w-full p-3 bg-gray-800 text-white  resize-none"
                rows={3}
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddComment(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white  hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={addComment}
                disabled={!newComment.trim()}
                className="flex-1 px-4 py-2 bg-pink-600 text-white  hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
