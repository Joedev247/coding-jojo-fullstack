"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookOpen,
  Calendar as CalendarIcon,
  ChevronDown,
  Clock,
  Home,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Bell,
  MoreVertical,
  User,
  Award,
  UserPlus,
  HelpCircle,
  Trash2,
  Trophy,
  Star,
  CheckCircle,
} from "lucide-react";
import { useToast } from "../../../hooks/useToast";
import { profileService } from "../../../services/profileService";
import { dashboardService } from "../../../lib/dashboardService";
import Header from "../../../components/dashboard/Header";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Sidebar from "../../../components/dashboard/Sidebar";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "notification" | "privacy" | "payment">("personal");
  
  // Form state (populate from backend)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const toast = useToast();
  const [stats, setStats] = useState({ coursesInProgress: 0, coursesComplete: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load profile and stats from backend
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!isAuthenticated) return;
      setLoadingProfile(true);
      try {
        const resp = await profileService.getProfile();
        if (!mounted) return;
        if (resp.success && resp.data?.user) {
          const u = resp.data.user;
          setFormData((prev) => ({
            ...prev,
            fullName: u.name || '',
            email: u.email || '',
          }));
        }

        const statsResp = await dashboardService.getUserStats();
        if (!mounted) return;
        if (statsResp.success && statsResp.data) {
          setStats({
            coursesInProgress: statsResp.data.inProgress || statsResp.data.coursesInProgress || 0,
            coursesComplete: statsResp.data.earned || statsResp.data.coursesCompleted || 0
          });
        } else {
          // fallback to enrolled courses count
          const coursesResp = await dashboardService.getUserCourses();
          if (coursesResp.success && coursesResp.data) {
            const inProgress = (coursesResp.data as any[]).filter(c => c.status === 'in-progress').length;
            const completed = (coursesResp.data as any[]).filter(c => c.status === 'completed').length;
            setStats({ coursesInProgress: inProgress, coursesComplete: completed });
          }
        }
      } catch (err) {
        console.error('Failed to load profile or stats:', err);
        setProfileError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoadingProfile(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      const payload: any = {};
      if (formData.fullName) payload.name = formData.fullName;
      if (formData.email) payload.email = formData.email;
      // address/city/state may not be supported by backend; include if present
      const resp = await profileService.updateProfile(payload);
      if (resp.success) {
        toast?.success?.('Profile updated');
      } else {
        toast?.error?.(resp.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Save profile failed:', err);
      toast?.error?.(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancel = () => {
    // Reset form or navigate away
    console.log("Cancelled");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">
            You need to be logged in to access your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Header title="Profile" subtitle="Manage your account settings and preferences" />

        {/* Profile Content */}
        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Profile Card */}
            <div className="col-span-3">
              <div className="bg-white  border border-gray-200 p-6">
                {/* Profile Avatar */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Image
                      src={user?.profilePicture || "/testimonial-avatar.jpg"}
                      alt={user?.name || "User"}
                      width={120}
                      height={120}
                      className="rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {formData.fullName || user?.name || 'Your name'}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                    {user?.isPremium ? 'Pro' : 'Free'}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">{stats.coursesInProgress}</p>
                    <p className="text-xs text-gray-500">Course in progress</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{stats.coursesComplete}</p>
                    <p className="text-xs text-gray-500">Course Complete</p>
                  </div>
                </div>

                {/* Last Achievement */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-4">
                    Last Achievement
                  </h4>
                  <div className="flex justify-between">
                    <div className="text-center">
              <div className="text-3xl mb-1"><Award className="w-6 h-6 text-yellow-500" /></div>
                    </div>
                    <div className="text-center">
                <div className="text-3xl mb-1"><Trophy className="w-6 h-6 text-yellow-600" /></div>
                    </div>
                    <div className="text-center">
                <div className="text-3xl mb-1"><Star className="w-6 h-6 text-indigo-500" /></div>
                    </div>
                    <div className="text-center">
                <div className="text-3xl mb-1"><CheckCircle className="w-6 h-6 text-emerald-500" /></div>
                    </div>
                  </div>
                </div>

                {/* Support Section */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4">Support</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50  transition-colors">
                      <div className="w-8 h-8 bg-blue-100  flex items-center justify-center">
                        <UserPlus className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">Become a Mentor</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50  transition-colors">
                      <div className="w-8 h-8 bg-green-100  flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Support</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50  transition-colors">
                      <div className="w-8 h-8 bg-purple-100  flex items-center justify-center">
                        <UserPlus className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">Invite friend</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50  transition-colors">
                      <div className="w-8 h-8 bg-red-100  flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-sm font-medium">Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Settings */}
            <div className="col-span-9">
              <div className="bg-white  border border-gray-200 p-8">
                {/* Profile Setting Header */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Profile Setting
                </h2>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("personal")}
                      className={`pb-4 text-sm font-medium transition-colors ${
                        activeTab === "personal"
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Personal Details
                    </button>
                    <button
                      onClick={() => setActiveTab("notification")}
                      className={`pb-4 text-sm font-medium transition-colors ${
                        activeTab === "notification"
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Notification
                    </button>
                    <button
                      onClick={() => setActiveTab("privacy")}
                      className={`pb-4 text-sm font-medium transition-colors ${
                        activeTab === "privacy"
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Privacy
                    </button>
                    <button
                      onClick={() => setActiveTab("payment")}
                      className={`pb-4 text-sm font-medium transition-colors ${
                        activeTab === "payment"
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Payment
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    {/* Profile Image Upload */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <Image
                          src={user?.profilePicture || "/testimonial-avatar.jpg"}
                          alt={user?.name || "User"}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                        <button className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        />
                      </div>

                      {/* Address - Full Width */}
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        />
                      </div>

                      {/* State/Province */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State/Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        />
                      </div>

                      {/* Zip Code */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        />
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm appearance-none bg-white"
                        >
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="px-8 py-3 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white  font-semibold hover:from-emerald-500 hover:to-cyan-600 transition-all"
                      >
                        Save profile
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-8 py-3 border-2 border-gray-200 text-gray-700  font-semibold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "notification" && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Notification settings coming soon...</p>
                  </div>
                )}

                {activeTab === "privacy" && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Privacy settings coming soon...</p>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Payment settings coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
