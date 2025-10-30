"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import AnimatedBackground from "../../../components/ui/AnimatedBackground";
import { useToast } from "../../../hooks/useToast";

// Note: Since this is a client component, metadata should be set in layout.tsx or a parent server component
// This page is for admin access only - should not be indexed by search engines

export default function AdminLoginPage() {
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formFocus, setFormFocus] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    setMounted(true);
    // Check if already authenticated as admin
    const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    if (token) {
      // Optionally verify the token is valid and belongs to admin
      router.push("/admin");
    }
    
    // Check if admin exists
    checkAdminExists();
  }, [router]);

  const checkAdminExists = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://codingjojo-backend.onrender.com/api"}/auth/admin-status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setAdminExists(data.adminExists || false);
    } catch (error) {
      console.error("Error checking admin status:", error);
      // If we can't check, assume admin doesn't exist to allow setup
      setAdminExists(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white relative flex items-center justify-center">
        <div className="z-10 flex flex-col items-center">
          <LoadingSpinner size="sm"  />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://codingjojo-backend.onrender.com/api"}/auth/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success && data.token) {
        // Store the token
        localStorage.setItem("auth_token", data.token);
        sessionStorage.setItem("auth_token", data.token);

        // Store user info
        if (data.data?.user) {
          localStorage.setItem("user_info", JSON.stringify(data.data.user));
          sessionStorage.setItem("user_info", JSON.stringify(data.data.user));
        }

        toast.success("Admin login successful! Redirecting to dashboard...");
        
        // Redirect to admin dashboard
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        setError(data.message || "Invalid admin password. Please try again.");
        toast.error("Admin login failed. Please check your password.");
        
        // If admin doesn't exist, show setup option
        if (data.message && data.message.includes("admin")) {
          setError("Admin not set up yet. Please complete the setup first.");
        }
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setError("Login failed. Please try again.");
      toast.error("Admin login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = () => setFormFocus(true);
  const handleBlur = () => setFormFocus(false);

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/40 backdrop-blur-sm  p-8 shadow-2xl border border-gray-700/50">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20 blur-md transform scale-110"></div>
                <div className="flex items-center justify-center h-full relative z-10">
                  <Image
                    src="/image-removebg-preview.png"
                    alt="Coding Jojo Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400 mb-2">
                Admin Access
              </h1>
              <p className="text-gray-400 text-sm">
                Enter your admin password to access the dashboard
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-amber-900/20 border border-amber-500/30  p-4 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-amber-200 font-medium text-sm mb-1">
                    Secure Admin Portal
                  </h3>
                  <p className="text-amber-300/80 text-xs">
                    This is a protected admin area. Only authorized personnel should access this system.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 ">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Admin Password
                </label>
                <div
                  className={`relative transition-all duration-300 ${
                    formFocus ? "transform scale-[1.02]" : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className={`h-4 w-4 transition-colors duration-300 ${
                        formFocus ? "text-pink-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full h-12 pl-12 pr-12 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-gray-700/50  focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                    placeholder="Enter admin password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-pink-400 focus:outline-none transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent  text-white font-medium ${
                  isLoading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                } transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 group`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="xs" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    Access Admin Dashboard
                  </span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-3">
                  Protected by enterprise-grade security
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-400">Secure Connection</span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    First time setup?
                  </p>
                  {adminExists === false && (
                    <button
                      onClick={() => router.push("/admin/setup")}
                      className="text-xs text-pink-400 hover:text-pink-300 transition-colors underline"
                    >
                      Complete Admin Setup
                    </button>
                  )}
                  {adminExists === true && (
                    <p className="text-xs text-gray-400">
                      Admin account is already configured
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
