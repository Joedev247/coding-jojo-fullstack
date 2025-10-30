'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bell, Phone, Video, MoreVertical, Plus, Paperclip, Mic, 
  Send, ChevronDown, FileText, Image, MicIcon, PhoneOff, MicOff, VideoOff, 
  MessageCircle, Share, Users, UserPlus
 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline: boolean;
  isActive?: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

export default function ProfessionalCommunityChat() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'instructors' | 'peers'>('peers');
  const [activeChat, setActiveChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // Class groups (in-memory mock)
  type GroupRole = 'instructor' | 'student';
  interface GroupParticipant { id: string; name: string; avatar: string; role: GroupRole; }
  interface ClassGroup { id: string; name: string; courseCode: string; participants: GroupParticipant[]; }
  const [groups, setGroups] = useState<ClassGroup[]>([
    {
      id: 'g1',
      name: 'React Basics - Cohort A',
      courseCode: 'REACT101',
      participants: [
        { id: 'inst1', name: 'Lead Instructor', avatar: '/testimonial-avatar.jpg', role: 'instructor' },
        { id: 'stu1', name: 'Sarah Johnson', avatar: '/testimonial-avatar.jpg', role: 'student' }
      ]
    }
  ]);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCourse, setNewGroupCourse] = useState('');
  const [joinCode, setJoinCode] = useState('');
  // Participants panel and scheduling
  const [showParticipants, setShowParticipants] = useState(false);
  const [raisedHands, setRaisedHands] = useState<Record<string, boolean>>({});
  interface ScheduledClass { id: string; groupId: string; title: string; startsAt: string; }
  const [scheduled, setScheduled] = useState<ScheduledClass[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleTitle, setScheduleTitle] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mock data for contacts
  const contacts: ChatContact[] = [
    {
      id: '1',
      name: 'Nathael Roy',
      avatar: '/testimonial-avatar.jpg',
      lastMessage: 'Good Morning!',
      timestamp: '10:30',
      unreadCount: 0,
      isOnline: true,
      isActive: true
    },
    {
      id: '2',
      name: 'Paris Liana',
      avatar: '/testimonial-avatar.jpg',
      lastMessage: 'Let me check that!',
      timestamp: '9:45',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '3',
      name: 'Ellise Remmi',
      avatar: '/testimonial-avatar.jpg',
      lastMessage: 'I will come tomorrow',
      timestamp: '8:20',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '4',
      name: 'Walter Osborne',
      avatar: '/testimonial-avatar.jpg',
      lastMessage: 'No!',
      timestamp: '7:15',
      unreadCount: 3,
      isOnline: true
    },
    {
      id: '5',
      name: 'Rosallie Adelyn',
      avatar: '/testimonial-avatar.jpg',
      lastMessage: 'That\'s for your next...',
      timestamp: '6:30',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '6',
      name: 'Murphey',
      avatar: '/testimonial-avatar.jpg',
      lastMessage: 'Good Morning!',
      timestamp: '5:45',
      unreadCount: 5,
      isOnline: true
    }
  ];

  // Mock data for messages
  const messages: ChatMessage[] = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Nathael Roy',
      senderAvatar: '/testimonial-avatar.jpg',
      message: 'Hi Mashok, I love the work you did on the cleaning service landing page. Are you available for hire at the moment?',
      timestamp: '5 min ago',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'user',
      senderName: 'Martin nel',
      senderAvatar: '/testimonial-avatar.jpg',
      message: 'Hello, Thank you for your reply. The landing page I am looking for is for a mobile application which I am launching soon. I want to have some details about and how it works. Nothing too much just simple and clear. Have a description of it, main features, and a link to download.',
      timestamp: '10 min ago',
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Nathael Roy',
      senderAvatar: '/testimonial-avatar.jpg',
      message: 'Thanks i see your website, i can provide you design and development both, our price rang $450-$500 with 3-5 time revision.',
      timestamp: '15 min ago',
      isOwn: false
    }
  ];

  const activeContact = contacts.find(contact => contact.id === activeChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatCallDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startCall = (type: 'audio' | 'video') => {
    setCallType(type);
    setIsCalling(true);
    // Simulate connecting
    setTimeout(() => {
      setIsCalling(false);
      setIsInCall(true);
      setCallDuration(0);
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }, 1000);
  };

  const endCall = () => {
    setIsCalling(false);
    setIsInCall(false);
    setCallType(null);
    setIsMuted(false);
    setIsVideoOff(false);
    setCallDuration(0);
    if (callTimerRef.current) clearInterval(callTimerRef.current);
  };

  const toggleMute = () => setIsMuted(prev => !prev);
  const toggleVideo = () => setIsVideoOff(prev => !prev);

  // Groups helpers
  const createGroup = () => {
    if (!newGroupName.trim() || !newGroupCourse.trim()) return;
    const g: ClassGroup = {
      id: `g-${Date.now()}`,
      name: newGroupName.trim(),
      courseCode: newGroupCourse.trim().toUpperCase(),
      participants: user ? [{ id: user.id, name: user.name, avatar: user.profilePicture || '/testimonial-avatar.jpg', role: 'instructor' }] : []
    };
    setGroups(prev => [g, ...prev]);
    setActiveGroup(g.id);
    setShowCreateGroup(false);
    setNewGroupName('');
    setNewGroupCourse('');
  };

  const joinGroup = () => {
    const g = groups.find(gr => gr.courseCode.toUpperCase() === joinCode.trim().toUpperCase());
    if (g && user && !g.participants.some(p => p.id === user.id)) {
      const updated: ClassGroup = { ...g, participants: [...g.participants, { id: user.id, name: user.name, avatar: user.profilePicture || '/testimonial-avatar.jpg', role: 'student' }] };
      setGroups(prev => prev.map(x => (x.id === g.id ? updated : x)));
      setActiveGroup(g.id);
      setShowJoinGroup(false);
      setJoinCode('');
    }
  };

  const activeGroupObj = activeGroup ? groups.find(g => g.id === activeGroup) : undefined;
  const isInstructorInActiveGroup = !!(activeGroupObj && user && activeGroupObj.participants.some(p => p.id === user.id && p.role === 'instructor'));

  const raiseHand = () => {
    if (!user) return;
    setRaisedHands(prev => ({ ...prev, [user.id]: !prev[user.id] }));
  };

  const scheduleClass = () => {
    if (!activeGroup || !scheduleTitle.trim() || !scheduleTime) return;
    const sc: ScheduledClass = { id: `sc-${Date.now()}`, groupId: activeGroup, title: scheduleTitle.trim(), startsAt: scheduleTime };
    setScheduled(prev => [sc, ...prev]);
    setShowScheduleModal(false);
    setScheduleTitle('');
    setScheduleTime('');
  };

  const formatCountdown = (iso: string) => {
    const now = new Date().getTime();
    const target = new Date(iso).getTime();
    const diff = Math.max(0, target - now);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `${h}h ${m}m`;
  };

  return (
    <>
    <div className="h-screen bg-gradient-to-br from-green-50 via-blue-50 to-pink-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-gray-800">Chat</h1>
          <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <img 
              src="/testimonial-avatar.jpg" 
              alt="User" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-800">Martin nel</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - 25% */}
        <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Chat</h2>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Tab Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('instructors')}
                className={`flex-1 py-2 px-4  font-medium text-sm transition-colors ${
                  activeTab === 'instructors'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white text-green-600 border border-green-500 hover:bg-green-50'
                }`}
              >
                Instructors
              </button>
              <button
                onClick={() => setActiveTab('peers')}
                className={`flex-1 py-2 px-4  font-medium text-sm transition-colors ${
                  activeTab === 'peers'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white text-green-600 border border-green-500 hover:bg-green-50'
                }`}
              >
                Peers
              </button>
            </div>

            {/* Class Groups Actions */}
            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={() => setShowCreateGroup(true)}
                className="flex-1 py-2 px-3  bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                Create Class
              </button>
              <button
                onClick={() => setShowJoinGroup(true)}
                className="flex-1 py-2 px-3  border border-blue-600 text-blue-600 text-sm hover:bg-blue-50 transition"
              >
                Join
              </button>
            </div>
          </div>

          {/* Chat List & Class Groups */}
          <div className="flex-1 overflow-y-auto">
            {/* Class Groups Section */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Class Groups</span>
              </div>
              <span className="text-xs text-gray-500">{groups.length}</span>
            </div>
            {groups.map((g) => (
              <div
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeGroup === g.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10  bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    {g.courseCode.slice(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{g.name}</h3>
                      <div className="flex items-center space-x-2">
                        {scheduled.filter(s => s.groupId === g.id).slice(0,1).map(s => (
                          <span key={s.id} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">{formatCountdown(s.startsAt)}</span>
                        ))}
                        <span className="text-xs text-gray-500">{g.courseCode}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{g.participants.length} members</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Contacts Section */}
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setActiveChat(contact.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  contact.isActive ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">
                        {contact.name}
                      </h3>
                      <span className="text-xs text-gray-500">{contact.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {contact.lastMessage}
                    </p>
                  </div>
                  
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <div className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {contact.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Chat Area - 75% */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={activeContact?.avatar || '/testimonial-avatar.jpg'}
                  alt={activeContact?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {activeContact?.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{activeContact?.name}</h3>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Group-aware Call Buttons with instructor-only enforcement */}
              <button
                onClick={() => startCall('audio')}
                disabled={isCalling || isInCall || (activeGroup && !isInstructorInActiveGroup)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors disabled:opacity-50"
                title={activeGroup && !isInstructorInActiveGroup ? 'Only instructors can start class calls' : (activeGroup ? 'Start class audio call' : 'Start audio call')}
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => startCall('video')}
                disabled={isCalling || isInCall || (activeGroup && !isInstructorInActiveGroup)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
                title={activeGroup && !isInstructorInActiveGroup ? 'Only instructors can start class calls' : (activeGroup ? 'Start class video call' : 'Start video call')}
              >
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-green-50 via-blue-50 to-pink-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                  {!message.isOwn && (
                    <img
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  
                  <div className={`px-4 py-2  ${
                    message.isOwn 
                      ? 'bg-pink-200 text-gray-800' 
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                  
                  {message.isOwn && (
                    <img
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              {/* Attachment Icons */}
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-1">
                  <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical className="w-3 h-3" />
                </button>
              </div>

              {/* Message Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {(isCalling || isInCall) && (
      <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
        <div className="absolute inset-0 bg-gray-900 opacity-95"></div>

        <div className="relative flex-1 flex flex-col items-center justify-center px-4">
          {isCalling ? (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <img
                  src={activeContact?.avatar || '/testimonial-avatar.jpg'}
                  alt={activeContact?.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse"></div>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">{activeContact?.name}</h2>
              <p className="text-white/70 text-lg">Calling...</p>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4">
                  <img
                    src={activeContact?.avatar || '/testimonial-avatar.jpg'}
                    alt={activeContact?.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-white mb-1">{activeContact?.name}</h2>
                <p className="text-white/70 text-sm">{formatCallDuration(callDuration)}</p>
              </div>

              {callType === 'video' && (
                <div className="mb-8">
                  <div className="relative bg-gray-800  overflow-hidden aspect-video">
                    {isVideoOff ? (
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
                            <MessageCircle className="w-8 h-8" />
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

        <div className="relative bg-gray-800/90 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleVideo}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                title={isVideoOff ? 'Turn on video' : 'Turn off video'}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowParticipants(prev => !prev)}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                title="Participants"
              >
                <Users className="w-5 h-5" />
              </button>
              <button
                onClick={raiseHand}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition ${raisedHands[user?.id || ''] ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/20 hover:bg-white/30'}`}
                title={raisedHands[user?.id || ''] ? 'Lower hand' : 'Raise hand'}
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                <Share className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                title="Schedule class"
              >
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
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

        {/* Participants Drawer */}
        {showParticipants && (
          <div className="absolute left-0 right-0 bottom-20 mx-auto max-w-3xl bg-gray-900/80  border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold text-sm">Participants ({activeGroupObj?.participants.length || 0})</h4>
              <button onClick={() => setShowParticipants(false)} className="text-white/60 hover:text-white text-sm">Close</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
              {(activeGroupObj?.participants || []).map(p => (
                <div key={p.id} className="flex items-center justify-between bg-white/10 rounded p-2">
                  <div className="flex items-center space-x-2">
                    <img src={p.avatar} className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <p className="text-white text-xs font-medium">{p.name}</p>
                      <p className="text-white/60 text-[10px]">{p.role}</p>
                    </div>
                  </div>
                  {isInstructorInActiveGroup && p.role === 'student' && (
                    <button className="text-white/80 hover:text-white text-xs">Mute</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Create Group Modal */}
    {showCreateGroup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white  shadow-xl w-full max-w-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Class Group</h3>
          <div className="space-y-3">
            <input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Class name (e.g. React Basics - Cohort A)"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={newGroupCourse}
              onChange={(e) => setNewGroupCourse(e.target.value)}
              placeholder="Course code (e.g. REACT101)"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
          </div>
          <div className="mt-4 flex items-center justify-end space-x-2">
            <button onClick={() => setShowCreateGroup(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Cancel</button>
            <button onClick={createGroup} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
          </div>
        </div>
      </div>
    )}

    {/* Join Group Modal */}
    {showJoinGroup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white  shadow-xl w-full max-w-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Join Class Group</h3>
          <div className="space-y-3">
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter course code (e.g. REACT101)"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
          </div>
          <div className="mt-4 flex items-center justify-end space-x-2">
            <button onClick={() => setShowJoinGroup(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Cancel</button>
            <button onClick={joinGroup} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Join</button>
          </div>
        </div>
      </div>
    )}

    {/* Schedule Class Modal */}
    {showScheduleModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white  shadow-xl w-full max-w-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Class</h3>
          <div className="space-y-3">
            <input
              value={scheduleTitle}
              onChange={(e) => setScheduleTitle(e.target.value)}
              placeholder="Title (e.g. Live Q&A)"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 flex items-center justify-end space-x-2">
            <button onClick={() => setShowScheduleModal(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Cancel</button>
            <button onClick={scheduleClass} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Schedule</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}