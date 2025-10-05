"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { authService } from "../../services/authService";

export default function ForgotPasswordPage() {
  const router = useRouter();

  // State for multi-step form
  const [step, setStep] = useState<"email" | "otp" | "password" | "success">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Timer for OTP resend
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(true);

  // Start OTP countdown
  const startOtpTimer = () => {
    setCanResendOtp(false);
    setOtpTimer(60);
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResendOtp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1: Send password reset email
  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.forgotPassword({ email });

      if (response.success) {
        setSuccessMessage(response.data?.message || "Reset code sent successfully.");
        setStep("otp");
        startOtpTimer();
      } else {
        setError(response.message || "Failed to send reset code");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.verifyResetOTP({ email, otp });

      if (response.success) {
        setSuccessMessage(response.data?.message || "Code verified successfully.");
        setStep("password");
      } else {
        setError(response.message || "Invalid or expired code");
      }
    } catch (error) {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Check password strength
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await authService.resetPassword({
        email,
        otp,
        newPassword,
      });

      if (response.success) {
        setSuccessMessage(response.data?.message || "Password reset successfully.");
        setStep("success");
      } else {
        setError(response.message || "Failed to reset password");
      }
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await authService.forgotPassword({ email });

      if (response.success) {
        setSuccessMessage("Reset code sent again!");
        startOtpTimer();
      } else {
        setError(response.message || "Failed to resend code");
      }
    } catch (error) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500  mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {step === "email" && "Forgot Password"}
            {step === "otp" && "Verify Reset Code"}
            {step === "password" && "Set New Password"}
            {step === "success" && "Password Reset Complete"}
          </h1>
          <p className="text-gray-400">
            {step === "email" && "Enter your email to receive a reset code"}
            {step === "otp" && "Enter the 6-digit code sent to your email"}
            {step === "password" && "Create a strong new password"}
            {step === "success" && "Your password has been successfully reset"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm  p-8 shadow-2xl border border-gray-700">
          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleSendResetCode} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 px-4  font-medium hover:from-orange-500 hover:to-pink-500 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Reset Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white text-center text-2xl font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Code sent to: <span className="text-pink-400">{email}</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 px-4  font-medium hover:from-orange-500 hover:to-pink-500 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Verify Code"
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResendOtp || loading}
                  className="text-pink-400 hover:text-pink-300 text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {canResendOtp ? "Resend Code" : `Resend in ${otpTimer}s`}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === "password" && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password strength indicator */}
              <div className="text-xs text-gray-400 space-y-1">
                <p>Password must contain:</p>
                <ul className="ml-4 space-y-1">
                  <li
                    className={
                      newPassword.length >= 6
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    • At least 6 characters
                  </li>
                  <li
                    className={
                      /[a-z]/.test(newPassword)
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    • One lowercase letter
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(newPassword)
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    • One uppercase letter
                  </li>
                  <li
                    className={
                      /\d/.test(newPassword)
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    • One number
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 px-4  font-medium hover:from-orange-500 hover:to-pink-500 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Password Reset Successful!
                </h3>
                <p className="text-gray-400 mb-6">
                  Your password has been successfully reset. You can now log in
                  with your new password.
                </p>
              </div>
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 px-4  font-medium hover:from-orange-500 hover:to-pink-500 transition duration-200"
              >
                Go to Login
              </button>
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30  flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {successMessage && step !== "success" && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30  flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-green-400 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Back to Login */}
          {step !== "success" && (
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-gray-400 hover:text-white transition duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
