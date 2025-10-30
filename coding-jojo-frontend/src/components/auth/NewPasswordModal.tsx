"use client";

import React, { useState } from "react";
import { X, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import LoadingSpinner from "../ui/LoadingSpinner";

interface NewPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  otp: string;
}

const NewPasswordModal: React.FC<NewPasswordModalProps> = ({
  isOpen,
  onClose,
  email,
  otp,
}) => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();
  const toast = useToast();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
    };
  };

  const passwordValidation = validatePassword(passwords.newPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (
    field: "newPassword" | "confirmPassword"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordValidation.isValid) {
      toast.error("Please ensure your password meets all requirements");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email, otp, passwords.newPassword);
      setIsSuccess(true);

      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPasswords({
      newPassword: "",
      confirmPassword: "",
    });
    setShowPassword({
      newPassword: false,
      confirmPassword: false,
    });
    setIsLoading(false);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="  bg-gray-900 border border-gray-800 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            {isSuccess ? "Password Updated!" : "Set New Password"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSuccess ? (
            <>
              <p className="text-gray-300 mb-6">
                Create a new secure password for your account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword.newPassword ? "text" : "password"}
                      value={passwords.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-12 py-3  bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("newPassword")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword.newPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                {passwords.newPassword && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">
                      Password requirements:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div
                        className={`flex items-center gap-1 ${
                          passwordValidation.minLength
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.minLength
                              ? "bg-blue-400"
                              : "bg-gray-400"
                          }`}
                        />
                        8+ characters
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordValidation.hasUpper
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.hasUpper
                              ? "bg-blue-400"
                              : "bg-gray-400"
                          }`}
                        />
                        Uppercase letter
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordValidation.hasLower
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.hasLower
                              ? "bg-blue-400"
                              : "bg-gray-400"
                          }`}
                        />
                        Lowercase letter
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordValidation.hasNumber
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.hasNumber
                              ? "bg-blue-400"
                              : "bg-gray-400"
                          }`}
                        />
                        Number
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordValidation.hasSpecial
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.hasSpecial
                              ? "bg-blue-400"
                              : "bg-gray-400"
                          }`}
                        />
                        Special character
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      value={passwords.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-12 py-3  bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword.confirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {passwords.confirmPassword &&
                    passwords.newPassword !== passwords.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">
                        Passwords do not match
                      </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-3 px-4  bg-gray-900 hover:bg-gray-700 text-white transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !passwordValidation.isValid ||
                      passwords.newPassword !== passwords.confirmPassword
                    }
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {" "}
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="xs" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            // Success State
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Password Updated Successfully!
              </h3>
              <p className="text-gray-300 mb-4">
                Your password has been updated. You can now log in with your new
                password.
              </p>
              <LoadingSpinner size="sm" />
              <p className="text-sm text-gray-400 mt-2">
                Redirecting to login...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPasswordModal;
