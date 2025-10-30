"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Settings as SettingsIcon,
  ChevronDown,
  Bell,
  User,
  CreditCard,
  Mail,
  AlertCircle,
  Wallet,
  Receipt,
  Lock,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Sidebar from "../../../components/dashboard/Sidebar";
import { toast } from "sonner";
import { billingService } from "../../../services/billingService";
import { subscriptionService } from "../../../services/subscriptionService";

type SettingsTab = "general" | "user-profile" | "email-notification" | "subscription" | "payment" | "learning-reminder";

export default function BillingPage() {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>("email-notification");
  const [isLoading, setIsLoading] = useState(true);
  const [billingData, setBillingData] = useState<any>(null);
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    promotions: true,
    noEmails: false,
    announcements: true,
    examinations: true,
  });

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) {
      loadBillingData();
    }
  }, [isAuthenticated]);

  const loadBillingData = async () => {
    try {
      setIsLoading(true);
      const data = await billingService.getBillingData();
      setBillingData(data);
    } catch (error) {
      console.error('Failed to load billing data:', error);
      toast.error('Failed to load billing information');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNotification = async (key: keyof typeof notifications) => {
    try {
      // Toggle optimistically
      setNotifications(prev => ({
        ...prev,
        [key]: !prev[key],
      }));
      
      // Update on backend
      await billingService.updateNotificationSettings({
        [key]: !notifications[key]
      });
      
      toast.success('Notification preferences updated');
    } catch (error) {
      // Revert on error
      setNotifications(prev => ({
        ...prev,
        [key]: !prev[key],
      }));
      toast.error('Failed to update notification preferences');
    }
  };

  if (!mounted || isLoading) {
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
            You need to be logged in to access billing settings.
          </p>
        </div>
      </div>
    );
  }

  if (!billingData && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">Failed to Load Billing Data</h2>
          <p className="text-gray-600 mb-4">
            There was an error loading your billing information.
          </p>
          <button 
            onClick={loadBillingData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const settingsTabs = [
    {
      id: "general" as SettingsTab,
      label: "General",
      icon: <SettingsIcon className="w-6 h-6" />,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      id: "user-profile" as SettingsTab,
      label: "User Profile",
      icon: <User className="w-6 h-6" />,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      id: "email-notification" as SettingsTab,
      label: "Email Notification",
      icon: <Mail className="w-6 h-6" />,
      color: "text-white",
      bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-500",
    },
    {
      id: "subscription" as SettingsTab,
      label: "Subscription",
      icon: <Wallet className="w-6 h-6" />,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
    {
      id: "payment" as SettingsTab,
      label: "Payment",
      icon: <CreditCard className="w-6 h-6" />,
      color: "text-cyan-500",
      bgColor: "bg-cyan-100",
    },
    {
      id: "learning-reminder" as SettingsTab,
      label: "Learning Reminder",
      icon: <Bell className="w-6 h-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Settings Menu Sidebar */}
        <div className="w-64 bg-transparent p-6 overflow-y-auto">
          <div className="space-y-3">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex flex-col items-center justify-center py-6 px-4  transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-lg"
                    : `${tab.bgColor} ${tab.color} hover:shadow-md`
                }`}
              >
                <div className="mb-2">
                  {tab.icon}
                </div>
                <span className="text-xs font-semibold text-center">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Top Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:bg-white hover:bg-opacity-50  transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <Image
                    src={user?.profilePicture || "/testimonial-avatar.jpg"}
                    alt={user?.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="flex items-center">
                    <p className="text-sm font-semibold text-gray-900 mr-1">
                      {user?.name || "Martin nel"}
                    </p>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="bg-white  shadow-sm p-8 max-w-4xl">
              {activeTab === "email-notification" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Email Notification
                  </h3>
                  <p className="text-sm text-gray-400 mb-8">When email me:</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Promotion, course recommendations
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Receive updates about new courses and special offers
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("promotions")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.promotions
                            ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.promotions
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Don't send any propositional emails
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Opt out of all marketing communications
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("noEmails")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.noEmails
                            ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.noEmails
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Announcement from instructors whose course
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Get important updates from your course instructors
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("announcements")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.announcements
                            ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.announcements
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Examination notice
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Receive notifications about upcoming exams and assessments
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("examinations")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.examinations
                            ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.examinations
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      General Settings
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Account Security</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                              <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
                            </div>
                            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                              Enable
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Password</p>
                              <p className="text-xs text-gray-500 mt-1">Last changed 3 months ago</p>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                              Change
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Preferences</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Language</p>
                              <p className="text-xs text-gray-500 mt-1">Choose your preferred language</p>
                            </div>
                            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                              <option>English</option>
                              <option>French</option>
                              <option>Spanish</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Time Zone</p>
                              <p className="text-xs text-gray-500 mt-1">Set your local time zone</p>
                            </div>
                            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                              <option>UTC</option>
                              <option>GMT</option>
                              <option>EST</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "user-profile" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <Image
                            src={user?.profilePicture || "/testimonial-avatar.jpg"}
                            alt={user?.name || "Profile"}
                            width={100}
                            height={100}
                            className="rounded-full object-cover"
                          />
                          <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg border border-gray-200">
                            <User className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{user?.name}</h4>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                          <button className="mt-2 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            Change Profile Picture
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={user?.name}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user?.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Enter your location"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "subscription" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h3>
                    {billingData?.subscription ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{billingData.subscription.plan}</p>
                            <p className="text-sm text-gray-500">{billingData.subscription.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ${billingData.subscription.amount}/{billingData.subscription.billingCycle}
                            </p>
                            {billingData.subscription.nextBillingDate && (
                              <p className="text-sm text-gray-500">
                                Next billing: {new Date(billingData.subscription.nextBillingDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Subscription Features</h4>
                          <ul className="space-y-2">
                            {billingData.subscription.features?.map((feature: string, index: number) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">✓</span> {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-end space-x-3">
                          {billingData.subscription.status === 'active' && (
                            <button
                              onClick={() => billingService.cancelSubscription(billingData.subscription.id)}
                              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Cancel Subscription
                            </button>
                          )}
                          <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            Manage Subscription
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h4>
                        <p className="text-gray-500 mb-4">Subscribe to access premium features</p>
                        <button
                          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          View Plans
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Add Payment Method
                      </button>
                    </div>
                    
                    {billingData?.paymentMethods?.length > 0 ? (
                      <div className="space-y-4">
                        {billingData.paymentMethods.map((method: any) => (
                          <div key={method.id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div className="flex items-center">
                              <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {method.brand} •••• {method.last4}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Expires {method.expMonth}/{method.expYear}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {method.isDefault && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                              <button
                                onClick={() => billingService.deletePaymentMethod(method.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No Payment Methods</h4>
                        <p className="text-gray-500">Add a payment method to manage your subscription</p>
                      </div>
                    )}
                  </div>

                  {billingData?.transactions?.length > 0 && (
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h3>
                      <div className="space-y-4">
                        {billingData.transactions.map((transaction: any) => (
                          <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                ${transaction.amount}
                              </p>
                              <p className={`text-xs ${
                                transaction.status === 'succeeded' ? 'text-green-600' : 'text-orange-600'
                              }`}>
                                {transaction.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "learning-reminder" && (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="text-purple-500 mb-4">
                      <Bell className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Reminder</h3>
                    <p className="text-gray-500">Learning reminder settings coming soon...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
