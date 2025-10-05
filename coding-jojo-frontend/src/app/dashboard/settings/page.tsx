"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Camera, Save } from "lucide-react";
import Button from "../../../components/ui/button";
import DangerZone from "../../../components/dashboard/DangerZone";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useProfileUpdate } from "../../../hooks/useProfileUpdate";

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { updateProfile, isUpdating } = useProfileUpdate();
  const [expanded, setExpanded] = useState<string>("profile");
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || user?.name?.split(" ")[0] || "",
    lastName: user?.lastName || user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    bio:
      user?.bio || "Passionate learner exploring new technologies and skills.",
    profilePicture: user?.profilePicture || "",
  });

  // Update form data when user data changes
  React.useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || user.name?.split(" ")[0] || "",
        lastName:
          user.lastName || user.name?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
        bio:
          user.bio ||
          "Passionate learner exploring new technologies and skills.",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  const toggleSection = (section: string) => {
    if (expanded === section) {
      setExpanded("");
    } else {
      setExpanded(section);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSaveProfile = async () => {
    console.log("=== PROFILE SAVE CLICKED ===");
    console.log("Current profileData:", profileData);

    const result = await updateProfile({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      bio: profileData.bio,
      profilePicture: profileData.profilePicture,
    });

    console.log("=== PROFILE SAVE RESULT ===", result);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileData((prev) => ({
          ...prev,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSectionHeader = (title: string, section: string) => (
    <div
      className="flex justify-between items-center cursor-pointer py-6   bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50"
      onClick={() => toggleSection(section)}
    >
      <h3 className="text-lg font-medium text-white px-8">{title}</h3>
      <div className="px-8">
        {expanded === section ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Information */}
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50">
            {renderSectionHeader("Profile Information", "profile")}
            {expanded === "profile" && (
              <div className="py-8 px-8 space-y-8">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        {profileData.profilePicture &&
                        profileData.profilePicture.trim() !== "" ? (
                          <img
                            src={profileData.profilePicture}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-3xl border-4 border-gray-700">
                            {profileData.firstName.charAt(0)}
                            {profileData.lastName.charAt(0)}
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-orange-500 text-white p-3 rounded-full cursor-pointer hover:from-pink-600 hover:to-orange-600 transition-all duration-300">
                          <Camera className="h-5 w-5" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="mt-6 text-sm text-gray-400 text-center">
                        Click the camera icon to upload a new photo
                      </p>
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        variant="primary"
                        onClick={handleSaveProfile}
                        disabled={isUpdating}
                        className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isUpdating ? (
                          <LoadingSpinner size="xs" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50">
            {renderSectionHeader("Password & Security", "security")}
            {expanded === "security" && (
              <div className="py-8 px-8 space-y-8">
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      variant="primary"
                      className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50">
            {renderSectionHeader("Preferences", "preferences")}
            {expanded === "preferences" && (
              <div className="py-8 px-8 space-y-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-4">
                      Notifications
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-6  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50">
                        <div>
                          <p className="text-sm text-white">
                            Email Notifications
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Receive course updates and announcements via email
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-6  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50">
                        <div>
                          <p className="text-sm text-white">
                            Push Notifications
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Receive notifications for course updates in browser
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-4">
                      Language & Region
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Language
                        </label>
                        <select className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="zh">Chinese</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Timezone
                        </label>
                        <select className="w-full  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300">
                          <option value="utc">
                            UTC (Coordinated Universal Time)
                          </option>
                          <option value="est">
                            EST (Eastern Standard Time)
                          </option>
                          <option value="cst">
                            CST (Central Standard Time)
                          </option>
                          <option value="mst">
                            MST (Mountain Standard Time)
                          </option>
                          <option value="pst">
                            PST (Pacific Standard Time)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      variant="primary"
                      className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <DangerZone
            onDeactivateAccount={() => console.log("Deactivate account")}
            onDeleteData={() => console.log("Delete data")}
            onDeleteAccount={() => console.log("Delete account")}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
