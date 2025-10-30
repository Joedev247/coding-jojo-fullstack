"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Shield, CheckCircle, XCircle, Key } from "lucide-react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import AnimatedBackground from "../../../components/ui/AnimatedBackground";
import { useToast } from "../../../hooks/useToast";

export default function AdminSetupPage() {
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formFocus, setFormFocus] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  const toast = useToast();

  // Password validation
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    isValid: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const validation = {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      isValid: false,
    };
    
    validation.isValid = Object.values({
      minLength: validation.minLength,
      hasUpper: validation.hasUpper,
      hasLower: validation.hasLower,
      hasNumber: validation.hasNumber,
    }).every(Boolean);
    
    setPasswordValidation(validation);
  }, [password]);

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

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!passwordValidation.isValid) {
      setError("Please ensure your password meets all requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://codingjojo-backend.onrender.com/api"}/auth/setup-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Admin password set successfully! You can now login.");
        
        // Redirect to admin login
        setTimeout(() => {
          router.push("/admin/login");
        }, 1500);
      } else {
        setError(data.message || "Failed to set admin password. Please try again.");
        toast.error("Setup failed. Please try again.");
      }
    } catch (error) {
      console.error("Admin setup error:", error);
      setError("Setup failed. Please try again.");
      toast.error("Admin setup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = (field: string) => {
    setFormFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFormFocus((prev) => ({ ...prev, [field]: false }));
  };

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
                Admin Setup
              </h1>
              <p className="text-gray-400 text-sm">
                Set your secure admin password to complete the setup
              </p>
            </div>

            {/* Setup Notice */}
            <div className="bg-blue-900/20 border border-blue-500/30  p-4 mb-6">
              <div className="flex items-start gap-3">
                <Key className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-200 font-medium text-sm mb-1">
                    One-Time Setup
                  </h3>
                  <p className="text-blue-300/80 text-xs">
                    This password will be used to access the admin dashboard. Please choose a strong, memorable password.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 ">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Setup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Admin Password
                </label>
                <div
                  className={`relative transition-all duration-300 ${
                    formFocus.password ? "transform scale-[1.02]" : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className={`h-4 w-4 transition-colors duration-300 ${
                        formFocus.password ? "text-pink-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    className="w-full h-12 pl-12 pr-12 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-gray-700/50  focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                    placeholder="Create a strong password"
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

              {/* Password Requirements */}
              {password && (
                <div className="bg-gray-800/30  p-4 space-y-2">
                  <p className="text-sm text-gray-300 mb-3">Password requirements:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`flex items-center gap-2 ${
                        passwordValidation.minLength ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      {passwordValidation.minLength ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      8+ characters
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordValidation.hasUpper ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      {passwordValidation.hasUpper ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      Uppercase letter
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordValidation.hasLower ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      {passwordValidation.hasLower ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      Lowercase letter
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordValidation.hasNumber ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      {passwordValidation.hasNumber ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      Number
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <div
                  className={`relative transition-all duration-300 ${
                    formFocus.confirmPassword ? "transform scale-[1.02]" : ""
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className={`h-4 w-4 transition-colors duration-300 ${
                        formFocus.confirmPassword ? "text-pink-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                    className="w-full h-12 pl-12 pr-12 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-gray-700/50  focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                    placeholder="Confirm your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-pink-400 focus:outline-none transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className={`flex items-center gap-2 text-xs ${
                  password === confirmPassword ? "text-blue-400" : "text-red-400"
                }`}>
                  {password === confirmPassword ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                </div>
              )}

              {/* Setup Button */}
              <button
                type="submit"
                disabled={isLoading || !passwordValidation.isValid || password !== confirmPassword}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent  text-white font-medium ${
                  isLoading || !passwordValidation.isValid || password !== confirmPassword
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                } transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 group`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="xs" />
                    Setting up...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    Complete Admin Setup
                  </span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  This is a one-time setup. Please save your password securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
