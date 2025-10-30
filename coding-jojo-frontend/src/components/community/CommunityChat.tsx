"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Send,
  Smile,
  Reply,
  Copy,
  Users,
  MessageCircle,
  Code,
  Image as ImageIcon,
  RefreshCw,
  Phone,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  MoreVertical,
  Share,
  Hand,
  Plus,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";

interface ChatMessage {
  _id: string;
  content: string;
  sender: {
    _id: string;
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: string;
  type: "text" | "image" | "file" | "code";
  reactions?: { [emoji: string]: any[] };
  replyTo?: {
    _id: string;
    content: string;
    sender: { _id: string; name: string; avatar: string };
  };
  edited?: boolean;
  editedAt?: string;
}

interface CallState {
  isInCall: boolean;
  callType: "audio" | "video" | null;
  isCalling: boolean;
  isReceivingCall: boolean;
  caller?: {
    _id: string;
    name: string;
    avatar: string;
  };
  isMuted: boolean;
  isVideoOff: boolean;
  callDuration: number;
}

const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [callState, setCallState] = useState<CallState>({
    isInCall: false,
    callType: null,
    isCalling: false,
    isReceivingCall: false,
    isMuted: false,
    isVideoOff: false,
    callDuration: 0,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const callDurationRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
  const toast = useToast();

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Mock data for now - will be replaced with real API calls
  const mockMessages: ChatMessage[] = [
    {
      _id: "1",
      content: "Welcome to the community chat! 🎉",
      sender: {
        _id: "admin1",
        name: "Admin",
        avatar: "/testimonial-avatar.jpg",
        role: "admin"
      },
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: "text",
      reactions: {}
    },
    {
      _id: "2",
      content: "Hey everyone! Just finished the React course. Amazing content! 💫",
      sender: {
        _id: "user1",
        name: "Sarah Johnson",
        avatar: "/testimonial-avatar.jpg",
        role: "student"
      },
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      type: "text",
      reactions: { "👍": [{ _id: "user2", name: "John" }] }
    },
    {
      _id: "3",
      content: "Does anyone have experience with Next.js 13 App Router?",
      sender: {
        _id: "user2",
        name: "Mike Chen",
        avatar: "/testimonial-avatar.jpg",
        role: "student"
      },
      timestamp: new Date(Date.now() - 900000).toISOString(),
      type: "text",
      reactions: {}
    }
  ];

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
      setOnlineCount(Math.floor(Math.random() * 20) + 5);
    }, 1000);
  }, []);

  // Auto-scroll on initial load
  useEffect(() => {
    if (!loading && messages.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [loading, messages.length, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !user) return;

    const messageContent = newMessage.trim();
    
    setNewMessage("");
    setReplyTo(null);
    setSending(true);

    // Simulate sending message
    setTimeout(() => {
      const newMsg: ChatMessage = {
        _id: `msg-${Date.now()}`,
        content: messageContent,
        sender: {
          _id: user.id,
          name: user.name,
          avatar: user.profilePicture || "/testimonial-avatar.jpg",
          role: user.role || "student"
        },
        timestamp: new Date().toISOString(),
        type: "text",
        reactions: {},
      };
      
      setMessages(prev => [...prev, newMsg]);
      setSending(false);
      setTimeout(scrollToBottom, 100);
    }, 500);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Success", { description: "Chat refreshed" });
    }, 1000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Call functionality
  const startCall = (type: "audio" | "video") => {
    setCallState(prev => ({
      ...prev,
      isCalling: true,
      callType: type,
      caller: {
        _id: "community",
        name: "Community Chat",
        avatar: "/testimonial-avatar.jpg"
      }
    }));
    
    // Simulate call connection
    setTimeout(() => {
      setCallState(prev => ({
        ...prev,
        isCalling: false,
        isInCall: true,
        callDuration: 0
      }));
      
      // Start call duration timer
      callDurationRef.current = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          callDuration: prev.callDuration + 1
        }));
      }, 1000);
      
      toast.success("Call Connected", { description: `${type} call started` });
    }, 2000);
  };

  const endCall = () => {
    if (callDurationRef.current) {
      clearInterval(callDurationRef.current);
    }
    
    setCallState({
      isInCall: false,
      callType: null,
      isCalling: false,
      isReceivingCall: false,
      isMuted: false,
      isVideoOff: false,
      callDuration: 0,
    });
    
    toast.success("Call Ended", { description: "Call has been disconnected" });
  };

  const toggleMute = () => {
    setCallState(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
  };

  const toggleVideo = () => {
    setCallState(prev => ({
      ...prev,
      isVideoOff: !prev.isVideoOff
    }));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callDurationRef.current) {
        clearInterval(callDurationRef.current);
      }
    };
  }, []);

  const MessageBubble: React.FC<{ message: ChatMessage; index: number }> = ({ message, index }) => {
    const isOwnMessage = message.sender._id === user?.id;
    const showAvatar = index === 0 || messages[index - 1]?.sender._id !== message.sender._id;

    return (
      <div className={`group relative mb-2 ${showAvatar ? "mt-4" : "mt-1"}`}>
        <div className={`flex items-start space-x-3 ${isOwnMessage ? "flex-row-reverse space-x-reverse" : ""}`}>
          <div className={`flex-shrink-0 ${showAvatar ? "visible" : "invisible"}`}>
            <img
              src={message.sender.avatar || "/testimonial-avatar.jpg"}
              alt={message.sender.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>

          <div className={`flex-1 max-w-xs md:max-w-md ${isOwnMessage ? "text-right" : ""}`}>
            <div className={`inline-block p-2 max-w-full break-words  ${
              isOwnMessage
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900"
            }`}>
              {showAvatar && !isOwnMessage && (
                <div className="text-xs text-gray-600 mb-1 font-medium flex items-center space-x-1">
                  <span>{message.sender.name}</span>
                  <span className={`px-1 py-0.5 rounded text-xs ${
                    message.sender.role === "admin"
                      ? "bg-red-100 text-red-600"
                      : message.sender.role === "instructor"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {message.sender.role}
                  </span>
                </div>
              )}

              <div className="text-sm leading-relaxed">{message.content}</div>
            </div>

            <div className={`flex items-center mt-1 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ${
              isOwnMessage ? "justify-end" : ""
            }`}>
              <span className="text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </span>

              {/* Reactions */}
              {message.reactions && Object.keys(message.reactions).length > 0 && (
                <div className="flex space-x-1">
                  {Object.entries(message.reactions).map(([emoji, users]) => (
                    <button
                      key={emoji}
                      className="flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <span>{emoji}</span>
                      <span>{users.length}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-full bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-6 w-6 border-b-2 border-blue-500 mx-auto mb-3"></div>
            <p className="text-gray-600 text-sm">Loading chat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="flex-shrink-0 p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-600 rounded">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900">Community Chat</h3>
              <p className="text-xs text-gray-600 flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{onlineCount} online</span>
                <span>•</span>
                <span>{messages.length} messages</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Call Buttons */}
            <button
              onClick={() => startCall("audio")}
              disabled={callState.isInCall || callState.isCalling}
              className="p-1.5 text-green-600 hover:text-green-700 transition hover:bg-green-50 rounded disabled:opacity-50 border border-green-200 hover:border-green-300"
              title="Start audio call"
            >
              <Phone className="w-3 h-3" />
            </button>
            <button
              onClick={() => startCall("video")}
              disabled={callState.isInCall || callState.isCalling}
              className="p-1.5 text-blue-600 hover:text-blue-700 transition hover:bg-blue-50 rounded disabled:opacity-50 border border-blue-200 hover:border-blue-300"
              title="Start video call"
            >
              <Video className="w-3 h-3" />
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-1.5 text-gray-500 hover:text-gray-700 transition hover:bg-gray-200 rounded disabled:opacity-50"
              title="Refresh chat"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-600 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gradient-to-b from-gray-50/30 to-white">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="p-3 bg-gray-100 rounded-full mb-3 mx-auto w-fit">
                <MessageCircle className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2 text-sm">No messages yet</p>
              <p className="text-gray-600 text-xs">Be the first to start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble key={message._id} message={message} index={index} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Reply indicator */}
      {replyTo && (
        <div className="flex-shrink-0 px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs">
            <Reply className="w-3 h-3 text-gray-500" />
            <span className="text-gray-600">Replying to</span>
            <span className="text-gray-900 font-medium">{replyTo.sender.name}</span>
            <span className="text-gray-500 truncate max-w-xs">"{replyTo.content}"</span>
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ×
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="space-y-2">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              className="p-1.5 text-gray-500 hover:text-gray-700 transition hover:bg-gray-100 rounded"
              title="Add image"
            >
              <ImageIcon className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-500 hover:text-gray-700 transition hover:bg-gray-100 rounded"
              title="Code snippet"
            >
              <Code className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={user ? "Type a message..." : "Please login to chat"}
                disabled={!user || sending}
                rows={1}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition"
                style={{ minHeight: "36px", maxHeight: "100px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!newMessage.trim() || !user || sending}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[36px]"
            >
              {sending ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-3 h-3" />
              )}
            </button>
          </div>
        </form>

        {!user && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Please login to participate in the community chat
          </p>
        )}
      </div>

      {/* WhatsApp-style Call UI Overlay */}
      {(callState.isInCall || callState.isCalling) && (
        <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
          {/* Dark textured background */}
          <div className="absolute inset-0 bg-gray-900 opacity-95" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          {/* Call Content */}
          <div className="relative flex-1 flex flex-col items-center justify-center px-4">
            {callState.isCalling ? (
              /* Calling State */
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <img
                    src={callState.caller?.avatar || "/testimonial-avatar.jpg"}
                    alt={callState.caller?.name || "Caller"}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {callState.caller?.name || "Community Chat"}
                </h2>
                <p className="text-white/70 text-lg">Calling...</p>
              </div>
            ) : (
              /* Active Call State */
              <div className="w-full max-w-md">
                {/* Caller Info */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <img
                      src={callState.caller?.avatar || "/testimonial-avatar.jpg"}
                      alt={callState.caller?.name || "Caller"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {callState.caller?.name || "Community Chat"}
                  </h2>
                  <p className="text-white/70 text-sm">
                    {formatCallDuration(callState.callDuration)}
                  </p>
                </div>

                {/* Video Feed (for video calls) */}
                {callState.callType === "video" && (
                  <div className="mb-8">
                    <div className="relative bg-gray-800  overflow-hidden aspect-video">
                      {callState.isVideoOff ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-600 rounded-full flex items-center justify-center">
                              <VideoOff className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-white/70 text-sm">Video Off</p>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                              <Users className="w-8 h-8" />
                            </div>
                            <p className="text-sm">Your Video</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="relative bg-gray-800/90 backdrop-blur-sm px-6 py-4">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {/* Left Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleVideo}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                  title={callState.isVideoOff ? "Turn on video" : "Turn off video"}
                >
                  {callState.isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                  title={callState.isMuted ? "Unmute" : "Mute"}
                >
                  {callState.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>

              {/* Center Controls */}
              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                  <Hand className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                  <Share className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                  <MoreVertical className="w-4 h-4" />
                </button>
                <button
                  onClick={endCall}
                  className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition"
                  title="End call"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChat;
