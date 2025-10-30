"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Mail, RotateCcw, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  email: string;
  type: "login" | "signup" | "password-reset";
  onPasswordResetVerified?: (otp: string) => void;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  email,
  type,
  onPasswordResetVerified,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const { verifyOTP, resendOTP } = useAuth();

  // Refs for OTP inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Start resend timer when modal opens
  useEffect(() => {
    if (isOpen && resendTimer === 0) {
      setResendTimer(60);
    }
  }, [isOpen]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = Array(6).fill("");

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextEmptyIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs.current[nextEmptyIndex]?.focus();
  };
  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      return;
    }

    setIsLoading(true);

    try {
      const isValid = await verifyOTP(email, otpString);

      if (isValid) {
        setIsVerified(true);
        // Wait a moment to show success state, then proceed
        setTimeout(() => {
          if (type === "password-reset" && onPasswordResetVerified) {
            onPasswordResetVerified(otpString);
          } else {
            onVerify(otpString);
          }
        }, 1500);
      } else {
        // Clear OTP on error
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      // Error handling is done in the AuthContext
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setIsResending(true);

    try {
      await resendOTP(email);
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      // Error handling is done in the AuthContext
    } finally {
      setIsResending(false);
    }
  };

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
    setIsLoading(false);
    setIsResending(false);
    setIsVerified(false);
    setResendTimer(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="  bg-gray-900 border border-gray-800 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            {isVerified ? "Email Verified!" : "Verify Your Email"}
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
          {!isVerified ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-pink-500" />
                </div>
                <p className="text-gray-300">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-white font-medium mt-1">{email}</p>
              </div>

              {/* OTP Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
                  Enter Verification Code
                </label>
                <div className="flex gap-2 justify-center">
                  {" "}
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center text-xl font-bold  bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              {/* Resend OTP */}
              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm mb-2">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0 || isResending}
                  className="text-pink-500 hover:text-pink-400 text-sm font-medium disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 mx-auto"
                >
                  {isResending ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Sending...
                    </>
                  ) : resendTimer > 0 ? (
                    `Resend in ${resendTimer}s`
                  ) : (
                    <>
                      <RotateCcw className="h-4 w-4" />
                      Resend Code
                    </>
                  )}
                </button>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={isLoading || otp.join("").length !== 6}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {" "}
                {isLoading ? (
                  <>
                    <LoadingSpinner size="xs" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </button>
            </>
          ) : (
            // Success State
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Email Verified Successfully!
              </h3>{" "}
              <p className="text-gray-300 mb-4">
                {type === "signup"
                  ? "Your account has been created and verified."
                  : type === "password-reset"
                  ? "Your email has been verified. Setting up password reset..."
                  : "You can now access your account."}
              </p>
              <LoadingSpinner size="sm" />
              <p className="text-sm text-gray-400 mt-2">Redirecting...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;
