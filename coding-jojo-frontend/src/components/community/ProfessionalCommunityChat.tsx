'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Send, Phone, Video, Mic, MicOff, MoreVertical, Smile, Paperclip, Settings, Search, Users, 
  PhoneCall, VideoIcon, Share, Download, Trash2, Edit, Copy, Reply, Heart, ScreenShare,
  Pin, Star, Code, Image, FileText, Plus, X, Check, Upload, Zap, MessageCircle, Clock,
  ChevronDown, ThumbsUp, Laugh, Play, Pause, AtSign, Type, Calendar, MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { chatService } from '../../services/chatService';

interface ChatMessage {
  _id: string;
  message: string;
  sender: {
    _id: string;
    username: string;
    email: string;
    profilePicture?: string;
  };
  timestamp: Date;
  messageType: 'text' | 'voice' | 'image' | 'file' | 'code' | 'system';
  reactions?: Array<{
    userId: string;
    emoji: string;
    username?: string;
  }>;
  replyTo?: {
    messageId: string;
    message: string;
    sender: string;
  };
  isEdited?: boolean;
  isPinned?: boolean;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  voiceDuration?: number;
  codeLanguage?: string;
  codeContent?: string;
  editHistory?: Array<{
    content: string;
    editedAt: Date;
  }>;
}

interface OnlineUser {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: Date;
  isTyping?: boolean;
}

interface CallState {
  isActive: boolean;
  type: 'audio' | 'video';
  participants: string[];
  startTime?: Date;
  isScreenSharing?: boolean;
}

interface VoiceRecordingState {
  isRecording: boolean;
  duration: number;
  audioBlob?: Blob;
  audioUrl?: string;
}

const UserAvatar: React.FC<{ user: { username?: string; profilePicture?: string; email?: string }, size?: 'sm' | 'md' | 'lg' }> = ({ user, size = 'md' }) => {
  const getInitials = (name: string) => {
    return name?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';
  };

  const displayName = user.username || user.email || 'Unknown';

  if (user.profilePicture && typeof user.profilePicture === 'string' && user.profilePicture.trim()) {
    return (
      <img
        src={user.profilePicture}
        alt={displayName}
        className="w-full h-full object-cover rounded-full"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex');
        }}
      />
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
      {getInitials(displayName)}
    </div>
  );
};

const EmojiPicker: React.FC<{ onEmojiSelect: (emoji: string) => void; isOpen: boolean; onClose: () => void }> = ({
  onEmojiSelect,
  isOpen,
  onClose
}) => {
  const emojiCategories = {
    general: ['😀', '😂', '🤣', '😊', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '👏', '🎉', '😎', '🤝', '👌'],
    developer: ['💻', '⚡', '🚀', '🔧', '⚙️', '🐛', '💡', '📝', '📊', '🎯', '✨', '🔥', '💪', '🎨', '📱', '🌟'],
    reactions: ['👀', '🤯', '🙌', '💎', '🏆', '⭐', '✅', '❌', '❓', '💬', '📢', '🚨', '⚠️', '🎊', '🎭', '🎪']
  };

  const [activeCategory, setActiveCategory] = useState<'general' | 'developer' | 'reactions'>('general');

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-50 w-72">
      {/* Category tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {Object.keys(emojiCategories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as any)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-t-xl capitalize ${
              activeCategory === category
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Emoji grid */}
      <div className="p-3 grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
        {emojiCategories[activeCategory].map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              onEmojiSelect(emoji);
              onClose();
            }}
            className="text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// Message Action Menu Component
const MessageActionMenu: React.FC<{
  message: ChatMessage;
  isOpen: boolean;
  onClose: () => void;
  onReact: (emoji: string) => void;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPin: () => void;
  onCopy: () => void;
  currentUserId: string;
}> = ({ message, isOpen, onClose, onReact, onReply, onEdit, onDelete, onPin, onCopy, currentUserId }) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  const quickReactions = ['👍', '❤️', '😂', '🤔', '🔥', '💯'];
  
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 transform translate-x-full z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-1 min-w-48">
        {/* Quick reactions */}
        <div className="flex items-center space-x-1 p-2 border-b border-gray-200 dark:border-gray-700">
          {quickReactions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onReact(emoji);
                onClose();
              }}
              className="text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={() => setShowReactionPicker(!showReactionPicker)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded p-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="py-1">
          <button
            onClick={() => { onReply(); onClose(); }}
            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Reply className="w-4 h-4" />
            <span>Reply</span>
          </button>
          
          {message.sender._id === currentUserId && (
            <>
              <button
                onClick={() => { onEdit(); onClose(); }}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => { onDelete(); onClose(); }}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </>
          )}
          
          <button
            onClick={() => { onPin(); onClose(); }}
            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Pin className="w-4 h-4" />
            <span>{message.isPinned ? 'Unpin' : 'Pin'}</span>
          </button>
          
          <button
            onClick={() => { onCopy(); onClose(); }}
            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
        </div>

        {/* Extended reaction picker */}
        {showReactionPicker && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-2">
            <div className="grid grid-cols-6 gap-1">
              {['😍', '🚀', '💻', '⚡', '🎯', '✨', '🔧', '💡', '🐛', '📝', '🎨', '🌟'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onReact(emoji);
                    onClose();
                  }}
                  className="text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// File Upload Component
const FileUploadModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSend: (file: File, type: 'image' | 'file' | 'code') => void;
}> = ({ isOpen, onClose, onSend }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'image' | 'file' | 'code'>('file');
  const [codeContent, setCodeContent] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      setSelectedFile(files[0]);
      if (files[0].type.startsWith('image/')) {
        setUploadType('image');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      if (files[0].type.startsWith('image/')) {
        setUploadType('image');
      }
    }
  };

  const handleSend = () => {
    if (uploadType === 'code' && codeContent.trim()) {
      // Create a code file
      const codeFile = new File([codeContent], `code.${codeLanguage}`, { type: 'text/plain' });
      onSend(codeFile, 'code');
    } else if (selectedFile) {
      onSend(selectedFile, uploadType);
    }
    
    // Reset
    setSelectedFile(null);
    setCodeContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share Content</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload type selector */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setUploadType('file')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              uploadType === 'file'
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>File</span>
          </button>
          <button
            onClick={() => setUploadType('image')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              uploadType === 'image'
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Image</span>
          </button>
          <button
            onClick={() => setUploadType('code')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              uploadType === 'code'
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code</span>
          </button>
        </div>

        {uploadType === 'code' ? (
          <div>
            <select
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
              className="w-full px-3 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
              <option value="json">JSON</option>
              <option value="markdown">Markdown</option>
            </select>
            <textarea
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
            />
          </div>
        ) : (
          <div>
            {/* File drop zone */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="text-center">
                  <FileText className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Drag and drop your file here, or
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    browse files
                  </button>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept={uploadType === 'image' ? 'image/*' : '*'}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!selectedFile && (!codeContent.trim() || uploadType !== 'code')}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const VoiceRecorder: React.FC<{
  isRecording: boolean;
  duration: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSendVoice: () => void;
  onCancelRecording: () => void;
}> = ({
  isRecording,
  duration,
  onStartRecording,
  onStopRecording,
  onSendVoice,
  onCancelRecording
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isRecording) {
    return (
      <div className="flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 rounded-full px-4 py-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-red-600 dark:text-red-400 font-mono">{formatDuration(duration)}</span>
        <button
          onClick={onStopRecording}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <MicOff className="w-4 h-4" />
        </button>
        <button
          onClick={onSendVoice}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
        <button
          onClick={onCancelRecording}
          className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onStartRecording}
      className="p-3 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
    >
      <Mic className="w-5 h-5" />
    </button>
  );
};

const CallInterface: React.FC<{
  callState: CallState;
  onEndCall: () => void;
  onToggleVideo: () => void;
  onToggleMute: () => void;
  onToggleScreenShare: () => void;
  isMuted: boolean;
  isVideoOff: boolean;
}> = ({
  callState,
  onEndCall,
  onToggleVideo,
  onToggleMute,
  onToggleScreenShare,
  isMuted,
  isVideoOff
}) => {
  if (!callState.isActive) return null;

  const formatCallDuration = (startTime: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-16 h-16" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {callState.type === 'video' ? 'Video Call' : 'Audio Call'}
          </h2>
          <p className="text-gray-300">
            {callState.startTime && formatCallDuration(callState.startTime)}
          </p>
          {callState.isScreenSharing && (
            <p className="text-green-400 mt-2">Screen Sharing Active</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 pb-8">
        <button
          onClick={onToggleMute}
          className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        {callState.type === 'video' && (
          <button
            onClick={onToggleVideo}
            className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
          >
            {isVideoOff ? <VideoIcon className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>
        )}
        
        <button
          onClick={onToggleScreenShare}
          className={`p-4 rounded-full ${callState.isScreenSharing ? 'bg-green-500' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
        >
          <ScreenShare className="w-6 h-6" />
        </button>
        
        <button
          onClick={onEndCall}
          className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <PhoneCall className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default function ProfessionalCommunityChat() {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [callState, setCallState] = useState<CallState>({ isActive: false, type: 'audio', participants: [] });
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [voiceRecording, setVoiceRecording] = useState<VoiceRecordingState>({
    isRecording: false,
    duration: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Enhanced states for new features
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showMessageActions, setShowMessageActions] = useState<string | null>(null);
  const [pinnedMessages, setPinnedMessages] = useState<ChatMessage[]>([]);
  const [showPinnedMessages, setShowPinnedMessages] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load messages
  const loadMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await chatService.getMessages();
      if (response && Array.isArray(response)) {
        setMessages(response);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
      setError('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load online users
  const loadOnlineUsers = useCallback(async () => {
    try {
      const users = await chatService.getOnlineUsers();
      if (users && Array.isArray(users)) {
        setOnlineUsers(users);
      }
    } catch (error) {
      console.error('Failed to load online users:', error);
    }
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !isAuthenticated || !user) return;

    try {
      setIsLoading(true);
      setError(null);

      const messageData = {
        message: newMessage.trim(),
        messageType: 'text' as const,
        ...(replyTo && {
          replyTo: {
            messageId: replyTo._id,
            message: replyTo.message,
            sender: replyTo.sender.username || replyTo.sender.email
          }
        })
      };

      await chatService.sendMessage(messageData);
      setNewMessage('');
      setReplyTo(null);
      
      // Force reload messages
      await loadMessages();
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    messageInputRef.current?.focus();
  };

  // Handle message reaction
  const handleReaction = async (messageId: string, emoji: string) => {
    try {
      await chatService.reactToMessage(messageId, emoji);
      await loadMessages();
    } catch (error) {
      console.error('Failed to react to message:', error);
    }
  };

  // Enhanced message handlers
  const handleEditMessage = async (messageId: string, newContent: string) => {
    try {
      await chatService.editMessage(messageId, newContent);
      setEditingMessage(null);
      setEditContent('');
      await loadMessages();
    } catch (error) {
      console.error('Failed to edit message:', error);
      setError('Failed to edit message');
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await chatService.deleteMessage(messageId);
      await loadMessages();
    } catch (error) {
      console.error('Failed to delete message:', error);
      setError('Failed to delete message');
    }
  };

  const handlePinMessage = async (messageId: string) => {
    try {
      // For now, simulate pinning locally until backend supports it
      console.log('Pinning message:', messageId);
      // await chatService.pinMessage(messageId);
      // await loadMessages();
    } catch (error) {
      console.error('Failed to pin message:', error);
      setError('Failed to pin message');
    }
  };

  const handleCopyMessage = (message: ChatMessage) => {
    navigator.clipboard.writeText(message.message);
    // Could add a toast notification here
  };

  const handleFileUpload = async (file: File, type: 'image' | 'file' | 'code', language?: string, content?: string) => {
    try {
      setIsLoading(true);
      
      let messageData;
      if (type === 'code' && content) {
        messageData = {
          message: `Shared code snippet: ${file.name}`,
          messageType: 'code' as const,
          codeContent: content,
          codeLanguage: language || 'javascript'
        };
      } else {
        // In a real app, you would upload the file to a server first
        // For now, we'll simulate file sharing
        messageData = {
          message: `Shared ${type}: ${file.name}`,
          messageType: type,
          fileName: file.name,
          fileSize: file.size
        };
      }

      await chatService.sendMessage(messageData);
      await loadMessages();
    } catch (error) {
      console.error('Failed to upload file:', error);
      setError('Failed to upload file');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditingMessage = (message: ChatMessage) => {
    setEditingMessage(message);
    setEditContent(message.message);
    setTimeout(() => editInputRef.current?.focus(), 100);
  };

  const cancelEditing = () => {
    setEditingMessage(null);
    setEditContent('');
  };

  const saveEdit = async () => {
    if (editingMessage && editContent.trim()) {
      await handleEditMessage(editingMessage._id, editContent.trim());
    }
  };

  // Voice recording functions
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setVoiceRecording(prev => ({
          ...prev,
          audioBlob: blob,
          audioUrl: url
        }));
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.current.start();
      setVoiceRecording({ isRecording: true, duration: 0 });
      
      // Start duration counter
      recordingInterval.current = setInterval(() => {
        setVoiceRecording(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
      
    } catch (error) {
      console.error('Failed to start recording:', error);
      setError('Microphone access denied');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      recordingInterval.current = null;
    }
    
    setVoiceRecording(prev => ({ ...prev, isRecording: false }));
  };

  const sendVoiceMessage = async () => {
    if (!voiceRecording.audioBlob) return;
    
    try {
      // In a real app, you would upload the audio blob to a server
      // For now, we'll send a text message indicating a voice message
      const messageData = {
        message: `🎤 Voice message (${voiceRecording.duration}s)`,
        messageType: 'voice' as const,
        voiceDuration: voiceRecording.duration
      };
      
      await chatService.sendMessage(messageData);
      cancelVoiceRecording();
      await loadMessages();
      
    } catch (error) {
      console.error('Failed to send voice message:', error);
      setError('Failed to send voice message');
    }
  };

  const cancelVoiceRecording = () => {
    if (voiceRecording.audioUrl) {
      URL.revokeObjectURL(voiceRecording.audioUrl);
    }
    
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      recordingInterval.current = null;
    }
    
    setVoiceRecording({
      isRecording: false,
      duration: 0
    });
  };

  // Call functions
  const startCall = (type: 'audio' | 'video') => {
    setCallState({
      isActive: true,
      type,
      participants: [(user as any)?._id || user?.id || ''],
      startTime: new Date()
    });
  };

  const endCall = () => {
    setCallState({ isActive: false, type: 'audio', participants: [] });
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const toggleScreenShare = () => {
    setCallState(prev => ({
      ...prev,
      isScreenSharing: !prev.isScreenSharing
    }));
  };

  // Handle typing indicator
  const handleTyping = () => {
    setIsTyping(true);
    
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  // Keyboard shortcuts
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Initialize and cleanup
  useEffect(() => {
    if (isAuthenticated && user) {
      loadMessages();
      loadOnlineUsers();
      
      // Set up polling for real-time updates
      pollInterval.current = setInterval(() => {
        loadMessages();
        loadOnlineUsers();
      }, 3000);
    }
    
    return () => {
      if (pollInterval.current) {
        clearInterval(pollInterval.current);
      }
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, [isAuthenticated, user, loadMessages, loadOnlineUsers]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Please log in to access the chat</p>
        </div>
      </div>
    );
  }

  const filteredMessages = searchQuery
    ? messages.filter(msg => 
        msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.sender.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.sender.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="flex flex-col h-full min-h-[700px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden">
      {/* Enhanced Professional Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-purple-500/20">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Developer Chat Hub
            </h2>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">{onlineUsers.length} developers online</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center space-x-1 text-blue-400">
                <Zap className="w-3 h-3" />
                <span>Real-time</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center space-x-1 text-purple-400">
                <Code className="w-3 h-3" />
                <span>Code-ready</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Enhanced Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 text-sm border border-gray-600 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-56 transition-all"
            />
          </div>
          
          {/* Feature Toggle Buttons */}
          <div className="flex items-center space-x-2 bg-gray-800/30 rounded-xl p-1">
            <button
              onClick={() => setShowPinnedMessages(!showPinnedMessages)}
              className={`p-2.5 rounded-lg transition-all transform hover:scale-105 ${
                showPinnedMessages 
                  ? 'bg-yellow-500/20 text-yellow-400 shadow-lg' 
                  : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10'
              }`}
              title="Toggle pinned messages"
            >
              <Pin className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => startCall('audio')}
              className="p-2.5 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all transform hover:scale-105"
              title="Start Audio Call"
            >
              <Phone className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => startCall('video')}
              className="p-2.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all transform hover:scale-105"
              title="Start Video Call"
            >
              <Video className="w-5 h-5" />
            </button>
            
            <button className="p-2.5 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all transform hover:scale-105">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Pinned Messages Bar */}
      {showPinnedMessages && pinnedMessages.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-b border-yellow-700/30 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Pin className="w-4 h-4 text-yellow-400" />
            <h4 className="text-sm font-semibold text-yellow-300">Pinned Messages</h4>
            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
              {pinnedMessages.length}
            </span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {pinnedMessages.map((message) => (
              <div key={message._id} className="p-3 bg-gray-800/40 rounded-lg border border-yellow-700/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-yellow-200 text-sm">
                    {message.sender.username || message.sender.email.split('@')[0]}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300 text-sm truncate">{message.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Online Users Bar */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-800/40 to-purple-900/20 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-semibold text-gray-200">Active Developers</h4>
              <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                {onlineUsers.length}
              </span>
            </div>
            
            {typingUsers.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-purple-400">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>
                  {typingUsers.length === 1 
                    ? `${typingUsers[0]} is typing...`
                    : `${typingUsers.length} people are typing...`
                  }
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setShowOnlineUsers(!showOnlineUsers)}
            className={`p-2 rounded-lg transition-all transform hover:scale-105 ${
              showOnlineUsers 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
            }`}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showOnlineUsers ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {showOnlineUsers && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-3">
              {onlineUsers.map((user, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl px-4 py-3 transition-all transform hover:scale-105 cursor-pointer border border-gray-600/30 backdrop-blur-sm"
                >
                  <div className="relative">
                    <UserAvatar 
                      user={user} 
                      size="md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute -top-1 -left-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <Code className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                      {user.username || user.email?.split('@')[0] || 'Anonymous'}
                    </p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-green-400 font-medium">Online</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-purple-400 truncate">
                        Developer
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="Message">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Call">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {onlineUsers.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">No developers online</p>
                <p className="text-xs text-gray-500 mt-1">Be the first to start coding together!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3  text-sm">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}
        
        {isLoading && messages.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading messages...</span>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {searchQuery ? 'No messages match your search.' : 'No messages yet. Start the conversation!'}
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.sender._id === ((user as any)?._id || user?.id) ? 'justify-end' : 'justify-start'} group`}
            >
              <div className={`max-w-[75%] ${message.sender._id === ((user as any)?._id || user?.id) ? 'order-2' : ''}`}>
                {/* Pinned indicator */}
                {message.isPinned && (
                  <div className="flex items-center space-x-1 mb-1 text-xs text-yellow-600 dark:text-yellow-400">
                    <Pin className="w-3 h-3" />
                    <span>Pinned message</span>
                  </div>
                )}
                
                {/* Reply indicator */}
                {message.replyTo && (
                  <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs border-l-4 border-blue-500">
                    <p className="font-semibold text-gray-600 dark:text-gray-300">
                      Replying to {message.replyTo.sender}:
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 truncate">
                      {message.replyTo.message}
                    </p>
                  </div>
                )}
                
                <div
                  className={`relative group rounded-xl p-4 shadow-sm transition-all hover:shadow-md ${
                    message.sender._id === user._id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-4'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white mr-4 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.sender._id !== user._id && (
                      <div className="w-8 h-8 flex-shrink-0">
                        <UserAvatar user={message.sender} />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      {message.sender._id !== user._id && (
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                            {message.sender.username || message.sender.email.split('@')[0]}
                          </p>
                          <span className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      )}
                      
                      {/* Message content */}
                      {editingMessage?._id === message._id ? (
                        <div className="space-y-2">
                          <input
                            ref={editInputRef}
                            type="text"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                saveEdit();
                              } else if (e.key === 'Escape') {
                                cancelEditing();
                              }
                            }}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEdit}
                              className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="text-xs bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {message.messageType === 'voice' ? (
                            <div className="flex items-center space-x-2">
                              <Mic className="w-4 h-4" />
                              <span>{message.message}</span>
                            </div>
                          ) : message.messageType === 'code' ? (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-xs">
                                <Code className="w-4 h-4" />
                                <span className="font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                                  {message.codeLanguage}
                                </span>
                              </div>
                              <pre className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                                {message.codeContent || message.message}
                              </pre>
                            </div>
                          ) : message.messageType === 'file' ? (
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                              <FileText className="w-8 h-8 text-blue-500" />
                              <div className="flex-1">
                                <p className="font-medium">{message.fileName || 'File'}</p>
                                <p className="text-xs text-gray-500">
                                  {message.fileSize ? `${(message.fileSize / 1024 / 1024).toFixed(2)} MB` : 'Unknown size'}
                                </p>
                              </div>
                              <button className="text-blue-500 hover:text-blue-600">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          ) : message.messageType === 'image' ? (
                            <div className="space-y-2">
                              <img 
                                src={message.fileUrl} 
                                alt={message.fileName}
                                className="max-w-full rounded-lg"
                              />
                              {message.message && (
                                <p className="break-words">{message.message}</p>
                              )}
                            </div>
                          ) : (
                            <p className="break-words">{message.message}</p>
                          )}
                          
                          {message.isEdited && (
                            <span className="text-xs opacity-70 ml-2">(edited)</span>
                          )}
                        </>
                      )}
                      
                      {/* Timestamp for own messages */}
                      {message.sender._id === user._id && (
                        <p className="text-xs mt-2 text-blue-100 text-right">
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Message actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setShowMessageActions(showMessageActions === message._id ? null : message._id)}
                      className="p-1 rounded-full bg-white dark:bg-gray-600 shadow-lg border border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    
                    <MessageActionMenu
                      message={message}
                      isOpen={showMessageActions === message._id}
                      onClose={() => setShowMessageActions(null)}
                      onReact={handleReaction.bind(null, message._id)}
                      onReply={() => setReplyTo(message)}
                      onEdit={() => startEditingMessage(message)}
                      onDelete={() => handleDeleteMessage(message._id)}
                      onPin={() => handlePinMessage(message._id)}
                      onCopy={() => handleCopyMessage(message)}
                      currentUserId={user._id || user.id || ''}
                    />
                  </div>
                  
                  {/* Enhanced Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {message.reactions.reduce((acc, reaction) => {
                        const existing = acc.find(r => r.emoji === reaction.emoji);
                        if (existing) {
                          existing.count++;
                          existing.users.push(reaction.userId);
                        } else {
                          acc.push({
                            emoji: reaction.emoji,
                            count: 1,
                            users: [reaction.userId]
                          });
                        }
                        return acc;
                      }, [] as Array<{emoji: string; count: number; users: string[]}>).map((reaction, index) => (
                        <button
                          key={index}
                          onClick={() => handleReaction(message._id, reaction.emoji)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border transition-colors ${
                            reaction.users.includes(user._id || user.id || '')
                              ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300'
                              : 'bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-500'
                          }`}
                        >
                          <span>{reaction.emoji}</span>
                          <span className="font-medium">{reaction.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Reply banner */}
      {replyTo && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Replying to {replyTo.sender.username || replyTo.sender.email.split('@')[0]}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {replyTo.message}
              </p>
            </div>
            <button
              onClick={() => setReplyTo(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
        <div className="flex items-end space-x-3">
          {/* Enhanced input container */}
          <div className="flex-1 relative">
            <div className="relative">
              <input
                ref={messageInputRef}
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type a message... Press @ for mentions, : for emojis"
                className="w-full px-4 py-3 pr-20 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                disabled={isLoading}
              />
              
              {/* Input actions */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  onClick={() => setShowFileUpload(true)}
                  className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                  title="Add emoji"
                >
                  <Smile className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <EmojiPicker
              isOpen={showEmojiPicker}
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <VoiceRecorder
              isRecording={voiceRecording.isRecording}
              duration={voiceRecording.duration}
              onStartRecording={startVoiceRecording}
              onStopRecording={stopVoiceRecording}
              onSendVoice={sendVoiceMessage}
              onCancelRecording={cancelVoiceRecording}
            />
            
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md transform hover:scale-105"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Enhanced typing indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center space-x-2 mt-3 text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>
              {typingUsers.length === 1 
                ? `${typingUsers[0]} is typing...`
                : `${typingUsers.slice(0, -1).join(', ')} and ${typingUsers[typingUsers.length - 1]} are typing...`
              }
            </span>
          </div>
        )}
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        onSend={handleFileUpload}
      />

      {/* Call Interface */}
      <CallInterface
        callState={callState}
        onEndCall={endCall}
        onToggleVideo={toggleVideo}
        onToggleMute={toggleMute}
        onToggleScreenShare={toggleScreenShare}
        isMuted={isMuted}
        isVideoOff={isVideoOff}
      />
    </div>
  );
}
