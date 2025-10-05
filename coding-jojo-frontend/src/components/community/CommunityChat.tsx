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

const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
            <div className={`inline-block p-3 max-w-full break-words  ${
              isOwnMessage
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-gray-800/80 text-gray-100"
            }`}>
              {showAvatar && !isOwnMessage && (
                <div className="text-xs text-gray-400 mb-1 font-medium flex items-center space-x-1">
                  <span>{message.sender.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    message.sender.role === "admin"
                      ? "bg-red-500/20 text-red-400"
                      : message.sender.role === "instructor"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-gray-600/20 text-gray-400"
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
                      className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
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
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700  overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading chat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700  overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 ">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Community Chat</h3>
              <p className="text-sm text-gray-400 flex items-center space-x-2">
                <Users className="w-3 h-3" />
                <span>{onlineCount} online</span>
                <span>•</span>
                <span>{messages.length} messages</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-400 hover:text-white transition  hover:bg-gray-700 disabled:opacity-50"
              title="Refresh chat"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 bg-gradient-to-b from-gray-900/20 to-gray-800/20">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="p-4 bg-gray-800/50 rounded-full mb-4 mx-auto w-fit">
                <MessageCircle className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-500 mb-2">No messages yet</p>
              <p className="text-gray-600 text-sm">Be the first to start the conversation!</p>
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
        <div className="px-4 py-2 bg-gray-800/50 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <Reply className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">Replying to</span>
            <span className="text-white font-medium">{replyTo.sender.name}</span>
            <span className="text-gray-500 truncate max-w-xs">"{replyTo.content}"</span>
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="text-gray-400 hover:text-white transition"
          >
            ×
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/20">
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-300 transition hover:bg-gray-700 "
              title="Add image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-300 transition hover:bg-gray-700 "
              title="Code snippet"
            >
              <Code className="w-4 h-4" />
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
                className="w-full bg-gray-800 border border-gray-600  px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition"
                style={{ minHeight: "48px", maxHeight: "120px" }}
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
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white  hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[48px]"
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
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
    </div>
  );
};

export default CommunityChat;
