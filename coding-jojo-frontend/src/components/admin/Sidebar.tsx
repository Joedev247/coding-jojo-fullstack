// components/dashboard/Sidebar.tsx
import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageCircle,
  Settings,
  PlusCircle,
  HelpCircle,
  LogOut,
  DollarSign,
  Shield,
  UserCheck,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  activeSidebar: string;
  setActiveSidebar: (sidebar: string) => void;
  setActiveForm: (form: 'course' | 'post' | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSidebar,
  setActiveSidebar,
  setActiveForm
}) => {
  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-1.5">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">CODING JOJO</h1>
            <span className="text-xs text-gray-400">Admin Dashboard</span>
          </div>
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="space-y-1">
          <button
            onClick={() => setActiveSidebar('dashboard')}
            className={`w-full flex items-center px-3 py-2.5 ${activeSidebar === 'dashboard' ? 'bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium' : 'text-gray-300 hover:bg-gray-800/70'}`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveSidebar('courses')}
            className={`w-full flex items-center px-3 py-2.5 ${activeSidebar === 'courses' ? 'bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium' : 'text-gray-300 hover:bg-gray-800/70'}`}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            Courses
          </button>
          <button
            onClick={() => setActiveSidebar('users')}
            className={`w-full flex items-center px-3 py-2.5 ${activeSidebar === 'users' ? 'bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium' : 'text-gray-300 hover:bg-gray-800/70'}`}
          >
            <Users className="h-5 w-5 mr-3" />
            Users
          </button>
          <button
            onClick={() => setActiveSidebar('verification')}
            className={`w-full flex items-center px-3 py-2.5 ${activeSidebar === 'verification' ? 'bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium' : 'text-gray-300 hover:bg-gray-800/70'}`}
          >
            <Shield className="h-5 w-5 mr-3" />
            Instructor Verification
          </button>
          <button
            onClick={() => setActiveSidebar('community')}
            className={`w-full flex items-center px-3 py-2.5 ${activeSidebar === 'community' ? 'bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium' : 'text-gray-300 hover:bg-gray-800/70'}`}
          >
            <MessageCircle className="h-5 w-5 mr-3" />
            Community
          </button>
          <button
            onClick={() => setActiveSidebar('purchases')}
            className={`w-full flex items-center px-3 py-2.5 ${activeSidebar === 'purchases' ? 'bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium' : 'text-gray-300 hover:bg-gray-800/70'}`}
          >
            <DollarSign className="h-5 w-5 mr-3" />
            Purchases
          </button>
          <button
            onClick={() => setActiveSidebar('instructors')}
            className={`w-full flex items-center px-3 py-2.5 ${activeSidebar === 'instructors' ? 'bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium' : 'text-gray-300 hover:bg-gray-800/70'}`}
          >
            <UserCheck className="h-5 w-5 mr-3" />
            Instructors
          </button>
          <button
            onClick={() => setActiveSidebar('earnings')}
            className={`w-full flex items-center px-3 py-2.5 ${activeSidebar === 'earnings' ? 'bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium' : 'text-gray-300 hover:bg-gray-800/70'}`}
          >
            <TrendingUp className="h-5 w-5 mr-3" />
            Earnings & Payouts
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="border-t border-gray-800 pt-4">
          <h3 className="text-xs uppercase text-gray-500 font-semibold mb-3 px-3">Content Creation</h3>
          <div className="space-y-2">
            <button
              onClick={() => setActiveForm('course')}
              className="w-full flex items-center px-3 py-2.5 text-gray-300 hover:bg-gray-800/70 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-3 text-pink-400" />
              Add New Course
            </button>
            <button
              onClick={() => setActiveForm('post')}
              className="w-full flex items-center px-3 py-2.5 text-gray-300 hover:bg-gray-800/70 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-3 text-pink-400" />
              Community Post
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="border-t border-gray-800 pt-4">
          <h3 className="text-xs uppercase text-gray-500 font-semibold mb-3 px-3">Account</h3>
          <div className="space-y-1">
            <button className="w-full flex items-center px-3 py-2.5 text-gray-300 hover:bg-gray-800/70">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
            <button className="w-full flex items-center px-3 py-2.5 text-gray-300 hover:bg-gray-800/70">
              <HelpCircle className="h-5 w-5 mr-3" />
              Help & Support
            </button>
            <button className="w-full flex items-center px-3 py-2.5 text-gray-300 hover:bg-gray-800/70">
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;