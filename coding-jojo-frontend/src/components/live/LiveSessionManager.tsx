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
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-gray-800 font-medium text-sm">LIVE</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-800">
                {activeSession.title}
              </h1>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs border border-blue-200">
                {(participants || []).length} participants
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {isRecording && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded-full border border-red-200">
                  <Circle className="h-3 w-3" />
                  <span className="text-xs">REC</span>
                </div>
              )}
              
              <button
                onClick={endSession}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
              >
                <PhoneOff className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Main Video Area */}
          <div className="flex-1 bg-gray-50 p-3">
            <div className="aspect-video bg-white  border border-gray-200 shadow-sm flex items-center justify-center mb-3">
              <div className="text-center">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-xs">Main Video Stream</p>
                <p className="text-gray-500 text-sm">Camera and screen sharing area</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2.5 rounded-full ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isMuted ? (
                  <MicOff className="h-4 w-4 text-white" />
                ) : (
                  <Mic className="h-4 w-4 text-white" />
                )}
              </button>

              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-2.5 rounded-full ${
                  !isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isCameraOn ? (
                  <Camera className="h-4 w-4 text-white" />
                ) : (
                  <CameraOff className="h-4 w-4 text-white" />
                )}
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-2.5 rounded-full ${
                  isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isScreenSharing ? (
                  <MonitorOff className="h-4 w-4 text-white" />
                ) : (
                  <Monitor className="h-4 w-4 text-white" />
                )}
              </button>

              <button
                onClick={toggleRecording}
                className={`p-2.5 rounded-full ${
                  isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <Circle className="h-4 w-4 text-white" />
              </button>

              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className={`p-2.5 rounded-full ${
                  showParticipants ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <Users className="h-4 w-4 text-white" />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-2.5 rounded-full ${
                  showChat ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72 bg-white border-l border-gray-200 shadow-sm flex flex-col">
            {/* Participants */}
            {showParticipants && (
              <div className="border-b border-gray-200 p-3">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                  Participants ({(participants || []).length})
                </h3>
                
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {(participants || []).map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {participant.name.charAt(0)}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-xs text-gray-800 truncate">
                            {participant.name}
                            {participant.isInstructor && (
                              <span className="ml-1 px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-xs border border-blue-200">
                                Host
                              </span>
                            )}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {participant.isHandRaised && (
                            <Hand className="h-3 w-3 text-yellow-500" />
                          )}
                          
                          {participant.isMuted ? (
                            <MicOff className="h-3 w-3 text-red-500" />
                          ) : (
                            <Mic className="h-3 w-3 text-blue-500" />
                          )}
                          
                          {participant.isCameraOn ? (
                            <Camera className="h-3 w-3 text-blue-500" />
                          ) : (
                            <CameraOff className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      </div>
                      
                      {!participant.isInstructor && (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => muteParticipant(participant.id)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Mute/Unmute"
                          >
                            {participant.isMuted ? (
                              <VolumeX className="h-2.5 w-2.5" />
                            ) : (
                              <Volume2 className="h-2.5 w-2.5" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => removeParticipant(participant.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <UserX className="h-2.5 w-2.5" />
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
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800 text-sm">Chat</h3>
                </div>
                
                <div className="flex-1 p-3 overflow-y-auto">
                  <div className="space-y-2">
                    {(chatMessages || []).map((message) => (
                      <div key={message.id} className={`${
                        message.type === 'system' 
                          ? 'text-center text-gray-500 text-xs italic' 
                          : ''
                      }`}>
                        {message.type === 'message' ? (
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium text-gray-800">
                                {message.userName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">{message.message}</p>
                          </div>
                        ) : (
                          <p>{message.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded"
                    >
                      <Send className="h-3.5 w-3.5" />
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
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Live Sessions</h1>
          <p className="text-gray-600 text-sm">Schedule and manage live sessions for your course</p>
        </div>
        
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm rounded"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Schedule Session</span>
        </button>
      </div>

      {/* Create Session Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white  shadow-xl p-4 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Schedule Live Session</h2>
              <button
                onClick={() => setIsCreating(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Session Title
                  </label>
                  <input
                    type="text"
                    value={newSession.title}
                    onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                    placeholder="Enter session title..."
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Scheduled Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newSession.scheduledFor}
                    onChange={(e) => setNewSession(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Description
                </label>
                <textarea
                  value={newSession.description}
                  onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                  rows={3}
                  placeholder="Describe what will be covered in this session..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="480"
                    value={newSession.duration}
                    onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={newSession.maxParticipants}
                    onChange={(e) => setNewSession(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                  />
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newSession.isRecorded}
                      onChange={(e) => setNewSession(prev => ({ ...prev, isRecorded: e.target.checked }))}
                      className="w-4 h-4 rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-700">Record Session</span>
                  </label>
                </div>
              </div>
              
              {/* Session Agenda */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-gray-600">
                    Session Agenda
                  </label>
                  <button
                    onClick={addAgendaItem}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(newSession.agenda || []).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-4">{index + 1}.</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateAgendaItem(index, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                        placeholder="Agenda item..."
                      />
                      {(newSession.agenda || []).length > 1 && (
                        <button
                          onClick={() => removeAgendaItem(index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsCreating(false)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Cancel
              </button>
              
              <button
                onClick={createSession}
                disabled={!newSession.title || !newSession.scheduledFor}
                className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white text-sm rounded"
              >
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sessions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(sessions || []).map((session) => (
          <div key={session.id} className="bg-white  shadow-md border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-800 mb-2">
                  {session.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{session.description}</p>
                
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(session.scheduledFor).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(session.scheduledFor).toLocaleTimeString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{session.participants?.length || 0}/{session.maxParticipants}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                <span className={`px-2 py-1 rounded text-xs ${
                  session.status === 'live'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : session.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : session.status === 'completed'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {session.status?.toUpperCase()}
                </span>
                
                {session.isRecorded && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Circle className="h-2.5 w-2.5" />
                    <span>Recorded</span>
                  </div>
                )}
              </div>
            </div>

            {/* Agenda */}
            {session.agenda && session.agenda.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs font-medium text-gray-600 mb-1">Agenda:</h4>
                <ul className="space-y-1">
                  {(session.agenda || []).map((item, index) => (
                    <li key={index} className="text-xs text-gray-500 flex items-start">
                      <span className="mr-1">{index + 1}.</span>
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
                    className="flex items-center space-x-1 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                  >
                    <Play className="h-3 w-3" />
                    <span>Start Session</span>
                  </button>
                )}
                
                {session.recordingUrl && (
                  <a
                    href={session.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-2 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </a>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                
                <button className="p-1 text-red-500 hover:text-red-700">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(sessions || []).length === 0 && (
        <div className="text-center py-8 bg-white  shadow-md border border-gray-200">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">No live sessions scheduled</h2>
          <p className="text-gray-600 text-sm mb-4">
            Create your first live session to engage with your students in real-time
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm rounded"
          >
            Schedule Your First Session
          </button>
        </div>
      )}
    </div>
  );
}
