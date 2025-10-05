'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun,
  Camera,
  Save,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  Settings as SettingsIcon
} from 'lucide-react';
import AnimatedBackground from '../../../components/ui/AnimatedBackground';
import teacherService from '../../../services/teacherService';
import { useToast } from '../../../hooks/useToast';

interface InstructorProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  title: string;
  avatar: string;
  website: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    github: string;
  };
  expertise: string[];
  languages: string[];
}

interface NotificationSettings {
  emailNotifications: {
    newEnrollments: boolean;
    courseReviews: boolean;
    messages: boolean;
    paymentUpdates: boolean;
    systemUpdates: boolean;
    marketing: boolean;
  };
  pushNotifications: {
    newEnrollments: boolean;
    liveSessionReminders: boolean;
    messages: boolean;
    urgentUpdates: boolean;
  };
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const toast = useToast();

  const [profile, setProfile] = useState<InstructorProfile>({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    title: '',
    avatar: '',
    website: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedin: '',
      github: ''
    },
    expertise: [],
    languages: []
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: {
      newEnrollments: true,
      courseReviews: true,
      messages: true,
      paymentUpdates: true,
      systemUpdates: true,
      marketing: false
    },
    pushNotifications: {
      newEnrollments: true,
      liveSessionReminders: true,
      messages: true,
      urgentUpdates: true
    }
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 60
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'en'
  });

  // Fetch instructor profile and settings from backend
  useEffect(() => {
    const loadInstructorData = async () => {
      try {
        setIsLoading(true);
        
        // Load basic instructor info from storage
        const teacherInfo = localStorage.getItem('teacher_info') || sessionStorage.getItem('teacher_info');
        if (teacherInfo) {
          const parsedInfo = JSON.parse(teacherInfo);
          setProfile(prev => ({
            ...prev,
            name: parsedInfo.name || '',
            email: parsedInfo.email || '',
            phone: parsedInfo.phone || '',
            location: parsedInfo.location || '',
            bio: parsedInfo.bio || '',
            title: parsedInfo.title || '',
            avatar: parsedInfo.avatar || '',
            website: parsedInfo.website || '',
            socialLinks: parsedInfo.socialLinks || prev.socialLinks,
            expertise: parsedInfo.expertise || [],
            languages: parsedInfo.languages || []
          }));
        }

        // Try to fetch full profile from backend
        const profileResponse = await teacherService.getProfile();
        if (profileResponse.success && profileResponse.data) {
          setProfile(prev => ({
            ...prev,
            ...profileResponse.data
          }));
          
          // If profile has settings data, use it
          if (profileResponse.data.settings) {
            const settings = profileResponse.data.settings;
            if (settings.notifications) {
              setNotifications(settings.notifications);
            }
            if (settings.security) {
              setSecurity(settings.security);
            }
            if (settings.appearance) {
              setAppearance(settings.appearance);
            }
          }
        }
      } catch (error) {
        console.error('Error loading instructor data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadInstructorData();
  }, []); // Remove toast dependency to prevent infinite re-renders

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: SettingsIcon }
  ];

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`${section} settings saved successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
          />
          <button className="absolute -bottom-2 -right-2 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Profile Photo</h3>
          <p className="text-gray-400 text-sm mb-3">Upload a professional photo that represents you</p>
          <div className="flex space-x-3">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2  text-sm transition-colors">
              Change Photo
            </button>
            <button className="text-red-400 hover:text-red-300 px-4 py-2 text-sm transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => setProfile({...profile, location: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Professional Title</label>
          <input
            type="text"
            value={profile.title}
            onChange={(e) => setProfile({...profile, title: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
          <input
            type="url"
            value={profile.website}
            onChange={(e) => setProfile({...profile, website: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
          rows={4}
          className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none resize-none"
          placeholder="Tell students about yourself, your background, and teaching philosophy..."
        />
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(profile.socialLinks).map(([platform, url]) => {
            const icons = {
              facebook: Facebook,
              twitter: Twitter,
              instagram: Instagram,
              youtube: Youtube,
              linkedin: Linkedin,
              github: Github
            };
            const Icon = icons[platform as keyof typeof icons];
            
            return (
              <div key={platform} className="flex items-center space-x-3">
                <Icon className="h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setProfile({
                    ...profile, 
                    socialLinks: {...profile.socialLinks, [platform]: e.target.value}
                  })}
                  placeholder={`https://${platform}.com/username`}
                  className="flex-1 bg-gray-700 border border-gray-600  px-3 py-2 text-white focus:border-pink-500 focus:outline-none text-sm"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('Profile')}
          disabled={isLoading}
          className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white px-6 py-2  font-medium transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(notifications.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                <p className="text-gray-400 text-sm">
                  {key === 'newEnrollments' && 'Get notified when students enroll in your courses'}
                  {key === 'courseReviews' && 'Receive notifications for new course reviews and ratings'}
                  {key === 'messages' && 'Get email alerts for new messages from students'}
                  {key === 'paymentUpdates' && 'Notifications about payment processing and earnings'}
                  {key === 'systemUpdates' && 'Important platform updates and announcements'}
                  {key === 'marketing' && 'Tips, best practices, and promotional content'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    emailNotifications: {...notifications.emailNotifications, [key]: e.target.checked}
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
        <div className="space-y-4">
          {Object.entries(notifications.pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                <p className="text-gray-400 text-sm">
                  {key === 'newEnrollments' && 'Instant notifications for new student enrollments'}
                  {key === 'liveSessionReminders' && 'Reminders before your scheduled live sessions'}
                  {key === 'messages' && 'Real-time alerts for new messages'}
                  {key === 'urgentUpdates' && 'Critical platform updates and security alerts'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    pushNotifications: {...notifications.pushNotifications, [key]: e.target.checked}
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('Notifications')}
          disabled={isLoading}
          className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white px-6 py-2  font-medium transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      {/* Password */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-gray-700 border border-gray-600  px-4 py-2 pr-12 text-white focus:border-pink-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>
          
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2  font-medium transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
        <div className="bg-gray-700 p-6 ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white font-medium">Enable 2FA</p>
              <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.twoFactorEnabled}
                onChange={(e) => setSecurity({...security, twoFactorEnabled: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            </label>
          </div>
          
          {security.twoFactorEnabled && (
            <div className="space-y-3">
              <p className="text-sm text-gray-300">
                Scan the QR code with your authenticator app or enter the setup key manually.
              </p>
              <div className="bg-white p-4  inline-block">
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                  QR Code
                </div>
              </div>
              <p className="text-sm text-gray-300">
                Setup key: <code className="bg-gray-600 px-2 py-1 rounded text-pink-400">ABCD EFGH IJKL MNOP</code>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Security Options */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Security Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Login Notifications</p>
              <p className="text-gray-400 text-sm">Get notified of new logins to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.loginNotifications}
                onChange={(e) => setSecurity({...security, loginNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
            <select
              value={security.sessionTimeout}
              onChange={(e) => setSecurity({...security, sessionTimeout: parseInt(e.target.value)})}
              className="bg-gray-700 border border-gray-600  px-3 py-2 text-white focus:border-pink-500 focus:outline-none"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={240}>4 hours</option>
              <option value={0}>Never</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('Security')}
          disabled={isLoading}
          className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white px-6 py-2  font-medium transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2  text-sm transition-colors">
            Add Payment Method
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="bg-gray-700 p-4  border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-8 w-8 text-pink-400" />
                <div>
                  <p className="text-white font-medium">Mobile Money - MTN</p>
                  <p className="text-gray-400 text-sm">****-****-**34</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Primary
                </span>
                <button className="text-gray-400 hover:text-white text-sm">Edit</button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Orange Money</p>
                  <p className="text-gray-400 text-sm">****-****-**78</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-pink-400 hover:text-pink-300 text-sm">Set Primary</button>
                <button className="text-gray-400 hover:text-white text-sm">Edit</button>
                <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Earnings Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-6  text-center">
            <p className="text-gray-400 text-sm mb-2">This Month</p>
            <p className="text-2xl font-bold text-white">125,000 XAF</p>
            <p className="text-green-400 text-sm mt-1">+12% from last month</p>
          </div>
          <div className="bg-gray-700 p-6  text-center">
            <p className="text-gray-400 text-sm mb-2">Total Earnings</p>
            <p className="text-2xl font-bold text-white">2,450,000 XAF</p>
            <p className="text-gray-400 text-sm mt-1">All time</p>
          </div>
          <div className="bg-gray-700 p-6  text-center">
            <p className="text-gray-400 text-sm mb-2">Pending</p>
            <p className="text-2xl font-bold text-white">45,000 XAF</p>
            <p className="text-gray-400 text-sm mt-1">Will be paid on March 30</p>
          </div>
        </div>
      </div>

      {/* Payout Settings */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Payout Settings</h3>
        <div className="bg-gray-700 p-6  space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Payout Schedule</label>
            <select className="bg-gray-600 border border-gray-500  px-3 py-2 text-white focus:border-pink-500 focus:outline-none w-full md:w-auto">
              <option>Monthly (30th of each month)</option>
              <option>Bi-weekly</option>
              <option>Weekly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Payout Amount</label>
            <select className="bg-gray-600 border border-gray-500  px-3 py-2 text-white focus:border-pink-500 focus:outline-none w-full md:w-auto">
              <option>25,000 XAF</option>
              <option>50,000 XAF</option>
              <option>100,000 XAF</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-8">
      {/* Theme */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 border-2  cursor-pointer transition-colors ${
              appearance.theme === 'light' 
                ? 'border-pink-500 bg-gray-700' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => setAppearance({...appearance, theme: 'light'})}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Sun className="h-6 w-6 text-yellow-400" />
              <span className="text-white font-medium">Light Mode</span>
            </div>
            <p className="text-gray-400 text-sm">Bright and clean interface</p>
          </div>
          
          <div
            className={`p-4 border-2  cursor-pointer transition-colors ${
              appearance.theme === 'dark' 
                ? 'border-pink-500 bg-gray-700' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => setAppearance({...appearance, theme: 'dark'})}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Moon className="h-6 w-6 text-blue-400" />
              <span className="text-white font-medium">Dark Mode</span>
            </div>
            <p className="text-gray-400 text-sm">Easy on the eyes, perfect for long sessions</p>
          </div>
        </div>
      </div>

      {/* Language */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Interface Language</label>
            <select
              value={appearance.language}
              onChange={(e) => setAppearance({...appearance, language: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
            <select className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:border-pink-500 focus:outline-none">
              <option>West Africa Time (GMT+1)</option>
              <option>Central Europe Time (GMT+1)</option>
              <option>Eastern Time (GMT-5)</option>
              <option>Pacific Time (GMT-8)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('Appearance')}
          disabled={isLoading}
          className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white px-6 py-2  font-medium transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-sm border border-gray-700/50  p-8 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mr-6">
              <SettingsIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                Settings
              </h1>
              <p className="text-gray-300 text-lg">Manage your account preferences and security settings</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-600 text-white p-4  mb-6 flex items-center">
            <div className="h-5 w-5 rounded-full bg-white text-green-600 flex items-center justify-center text-sm font-bold mr-3">
              ✓
            </div>
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3  text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800  border border-gray-700 p-8">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'security' && renderSecurityTab()}
              {activeTab === 'billing' && renderBillingTab()}
              {activeTab === 'appearance' && renderAppearanceTab()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
