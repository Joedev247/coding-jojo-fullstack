'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Settings,
  Plus,
  Edit3,
  Trash2,
  Play,
  Pause,
  Square,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Hand,
  Download,
  UserCheck,
  UserX,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  PhoneOff,
  Share,
  Circle,
  FileText,
  Send
} from 'lucide-react';
import { courseService, LiveSession } from '../../services/courseService';
import { useToast } from '../../contexts/ToastContext';

interface LiveSessionManagerProps {
  courseId: string;
  instructorId: string;
  onSessionUpdate?: (session: LiveSession) => void;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isInstructor: boolean;
  isMuted: boolean;
  isCameraOn: boolean;
  isHandRaised: boolean;
  joinedAt: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  type: 'message' | 'system';
}

export default function LiveSessionManager({
  courseId,
  instructorId,
  onSessionUpdate
}: LiveSessionManagerProps) {
  const { success: showSuccess, error: showError } = useToast();
  
  // Session Management
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [activeSession, setActiveSession] = useState<LiveSession | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    scheduledFor: '',
    duration: 60,
    maxParticipants: 100,
    isRecorded: true,
    agenda: [''],
    materials: []
  });

  // Live Session State
  const [isLive, setIsLive] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Controls State
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showParticipants, setShowParticipants] = useState(true);
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    loadSessions();
  }, [courseId]);

  const loadSessions = async () => {
    try {
      const response = await courseService.getLiveSessions(courseId);
      setSessions(response.data);
    } catch (error: any) {
      showError(error.message || 'Failed to load live sessions');
    }
  };

  const createSession = async () => {
    try {
      const sessionData = {
        ...newSession,
        courseId,
        instructorId,
        agenda: (newSession.agenda || []).filter(item => item.trim() !== ''),
        scheduledFor: new Date(newSession.scheduledFor).toISOString()
      };

      const response = await courseService.createLiveSession(sessionData);
      setSessions(prev => [...(prev || []), response.data]);
      setIsCreating(false);
      setNewSession({
        title: '',
        description: '',
        scheduledFor: '',
        duration: 60,
        maxParticipants: 100,
        isRecorded: true,
        agenda: [''],
        materials: []
      });
      
      showSuccess('Live session created successfully!');
      
      if (onSessionUpdate) {
        onSessionUpdate(response.data);
      }
    } catch (error: any) {
      showError(error.message || 'Failed to create live session');
    }
  };

  const startSession = async (sessionId: string) => {
    try {
      const response = await courseService.startLiveSession(sessionId);
      setActiveSession(response.data);
      setIsLive(true);
      
      // Initialize participants with instructor
      setParticipants([{
        id: instructorId,
        name: 'Instructor',
        email: '',
        isInstructor: true,
        isMuted: false,
        isCameraOn: true,
        isHandRaised: false,
        joinedAt: new Date().toISOString()
      }]);
      
      // Add system message
      setChatMessages([{
        id: `msg_${Date.now()}`,
        userId: 'system',
        userName: 'System',
        message: 'Live session started',
        timestamp: new Date().toISOString(),
        type: 'system'
      }]);
      
      showSuccess('Live session started successfully!');
    } catch (error: any) {
      showError(error.message || 'Failed to start live session');
    }
  };

  const endSession = async () => {
    if (!activeSession) return;
    
    try {
      await courseService.endLiveSession(activeSession.id);
      setIsLive(false);
      setActiveSession(null);
      setParticipants([]);
      setChatMessages([]);
      
      showSuccess('Live session ended');
      loadSessions();
    } catch (error: any) {
      showError(error.message || 'Failed to end live session');
    }
  };

  const toggleRecording = async () => {
    if (!activeSession) return;
    
    try {
      const newRecordingState = !isRecording;
      await courseService.toggleSessionRecording(activeSession.id, newRecordingState);
      setIsRecording(newRecordingState);
      
      // Add system message
      const message: ChatMessage = {
        id: `msg_${Date.now()}`,
        userId: 'system',
        userName: 'System',
        message: newRecordingState ? 'Recording started' : 'Recording stopped',
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      setChatMessages(prev => [...(prev || []), message]);
      
      showSuccess(newRecordingState ? 'Recording started' : 'Recording stopped');
    } catch (error: any) {
      showError(error.message || 'Failed to toggle recording');
    }
  };

  const sendChatMessage = () => {
    if (!newMessage.trim() || !activeSession) return;
    
    const message: ChatMessage = {
      id: `msg_${Date.now()}`,
      userId: instructorId,
      userName: 'Instructor',
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'message'
    };
    
    setChatMessages(prev => [...(prev || []), message]);
    setNewMessage('');
    
    // In real implementation, this would send via WebSocket
  };

  const muteParticipant = (participantId: string) => {
    setParticipants(prev =>
      (prev || []).map(p =>
        p.id === participantId ? { ...p, isMuted: !p.isMuted } : p
      )
    );
  };

  const removeParticipant = (participantId: string) => {
    setParticipants(prev => (prev || []).filter(p => p.id !== participantId));
    
    const participant = (participants || []).find(p => p.id === participantId);
    if (participant) {
      const message: ChatMessage = {
        id: `msg_${Date.now()}`,
        userId: 'system',
        userName: 'System',
        message: `${participant.name} has been removed from the session`,
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      setChatMessages(prev => [...(prev || []), message]);
    }
  };

  const addAgendaItem = () => {
    setNewSession(prev => ({
      ...prev,
      agenda: [...(prev.agenda || []), '']
    }));
  };

  const updateAgendaItem = (index: number, value: string) => {
    setNewSession(prev => ({
      ...prev,
      agenda: (prev.agenda || []).map((item, i) => i === index ? value : item)
    }));
  };

  const removeAgendaItem = (index: number) => {
    setNewSession(prev => ({
      ...prev,
      agenda: (prev.agenda || []).filter((_, i) => i !== index)
    }));
  };

  if (isLive && activeSession) {
    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white font-medium">LIVE</span>
              </div>
              <h1 className="text-xl font-semibold text-white">
                {activeSession.title}
              </h1>
              <span className="px-2 py-1 bg-gray-600 rounded text-sm text-gray-300">
                {(participants || []).length} participants
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {isRecording && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-red-600 rounded-full">
                  <Circle className="h-4 w-4 text-white" />
                  <span className="text-white text-sm">REC</span>
                </div>
              )}
              
              <button
                onClick={endSession}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white "
              >
                <PhoneOff className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Main Video Area */}
          <div className="flex-1 bg-gray-900 p-4">
            <div className="aspect-video bg-gray-800  border-2 border-gray-600 flex items-center justify-center mb-4">
              <div className="text-center">
                <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Main Video Stream</p>
                <p className="text-gray-500">Camera and screen sharing area</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5 text-white" />
                ) : (
                  <Mic className="h-5 w-5 text-white" />
                )}
              </button>

              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-3 rounded-full ${
                  !isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isCameraOn ? (
                  <Camera className="h-5 w-5 text-white" />
                ) : (
                  <CameraOff className="h-5 w-5 text-white" />
                )}
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 rounded-full ${
                  isScreenSharing ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isScreenSharing ? (
                  <MonitorOff className="h-5 w-5 text-white" />
                ) : (
                  <Monitor className="h-5 w-5 text-white" />
                )}
              </button>

              <button
                onClick={toggleRecording}
                className={`p-3 rounded-full ${
                  isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <Circle className="h-5 w-5 text-white" />
              </button>

              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className={`p-3 rounded-full ${
                  showParticipants ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <Users className="h-5 w-5 text-white" />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-3 rounded-full ${
                  showChat ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            {/* Participants */}
            {showParticipants && (
              <div className="border-b border-gray-700 p-4">
                <h3 className="font-semibold text-white mb-3">
                  Participants ({(participants || []).length})
                </h3>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {(participants || []).map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm text-white font-medium">
                            {participant.name.charAt(0)}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-sm text-white truncate">
                            {participant.name}
                            {participant.isInstructor && (
                              <span className="ml-1 px-1 py-0.5 bg-pink-600 rounded text-xs">
                                Host
                              </span>
                            )}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {participant.isHandRaised && (
                            <Hand className="h-4 w-4 text-yellow-400" />
                          )}
                          
                          {participant.isMuted ? (
                            <MicOff className="h-4 w-4 text-red-400" />
                          ) : (
                            <Mic className="h-4 w-4 text-green-400" />
                          )}
                          
                          {participant.isCameraOn ? (
                            <Camera className="h-4 w-4 text-green-400" />
                          ) : (
                            <CameraOff className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                      </div>
                      
                      {!participant.isInstructor && (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => muteParticipant(participant.id)}
                            className="p-1 text-gray-400 hover:text-white"
                            title="Mute/Unmute"
                          >
                            {participant.isMuted ? (
                              <VolumeX className="h-3 w-3" />
                            ) : (
                              <Volume2 className="h-3 w-3" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => removeParticipant(participant.id)}
                            className="p-1 text-red-400 hover:text-red-300"
                            title="Remove"
                          >
                            <UserX className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat */}
            {showChat && (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-semibold text-white">Chat</h3>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-2">
                    {(chatMessages || []).map((message) => (
                      <div key={message.id} className={`${
                        message.type === 'system' 
                          ? 'text-center text-gray-400 text-sm italic' 
                          : ''
                      }`}>
                        {message.type === 'message' ? (
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-white">
                                {message.userName}
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-gray-300">{message.message}</p>
                          </div>
                        ) : (
                          <p>{message.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600  text-white text-sm"
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white "
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Sessions</h1>
          <p className="text-gray-400">Schedule and manage live sessions for your course</p>
        </div>
        
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white "
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Session</span>
        </button>
      </div>

      {/* Create Session Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6  max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Schedule Live Session</h2>
              <button
                onClick={() => setIsCreating(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Session Title
                  </label>
                  <input
                    type="text"
                    value={newSession.title}
                    onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                    placeholder="Enter session title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Scheduled Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newSession.scheduledFor}
                    onChange={(e) => setNewSession(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newSession.description}
                  onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                  rows={3}
                  placeholder="Describe what will be covered in this session..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="480"
                    value={newSession.duration}
                    onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={newSession.maxParticipants}
                    onChange={(e) => setNewSession(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                  />
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newSession.isRecorded}
                      onChange={(e) => setNewSession(prev => ({ ...prev, isRecorded: e.target.checked }))}
                      className="rounded bg-gray-700 border-gray-600 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-sm text-gray-300">Record Session</span>
                  </label>
                </div>
              </div>
              
              {/* Session Agenda */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Session Agenda
                  </label>
                  <button
                    onClick={addAgendaItem}
                    className="text-sm text-pink-400 hover:text-pink-300"
                  >
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(newSession.agenda || []).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400 w-6">{index + 1}.</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateAgendaItem(index, e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                        placeholder="Agenda item..."
                      />
                      {(newSession.agenda || []).length > 1 && (
                        <button
                          onClick={() => removeAgendaItem(index)}
                          className="p-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              
              <button
                onClick={createSession}
                disabled={!newSession.title || !newSession.scheduledFor}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:opacity-50 text-white "
              >
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sessions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(sessions || []).map((session) => (
          <div key={session.id} className="bg-gray-800 p-6 ">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {session.title}
                </h3>
                <p className="text-gray-400 mb-3">{session.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(session.scheduledFor).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(session.scheduledFor).toLocaleTimeString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{session.participants?.length || 0}/{session.maxParticipants}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  session.status === 'live'
                    ? 'bg-red-600 text-white'
                    : session.status === 'scheduled'
                    ? 'bg-pink-600 text-white'
                    : session.status === 'completed'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {session.status?.toUpperCase()}
                </span>
                
                {session.isRecorded && (
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Circle className="h-3 w-3" />
                    <span>Recorded</span>
                  </div>
                )}
              </div>
            </div>

            {/* Agenda */}
            {session.agenda && session.agenda.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Agenda:</h4>
                <ul className="space-y-1">
                  {(session.agenda || []).map((item, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-start">
                      <span className="mr-2">{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {session.status === 'scheduled' && (
                  <button
                    onClick={() => startSession(session.id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white  text-sm"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Session</span>
                  </button>
                )}
                
                {session.recordingUrl && (
                  <a
                    href={session.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white  text-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </a>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-white">
                  <Edit3 className="h-4 w-4" />
                </button>
                
                <button className="p-1 text-red-400 hover:text-red-300">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(sessions || []).length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No live sessions scheduled</h2>
          <p className="text-gray-400 mb-6">
            Create your first live session to engage with your students in real-time
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white "
          >
            Schedule Your First Session
          </button>
        </div>
      )}
    </div>
  );
}
