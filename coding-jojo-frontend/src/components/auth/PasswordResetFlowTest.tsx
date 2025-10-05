"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";

// This is a test component to validate the password reset flow
// Remove this file after testing is complete
const PasswordResetFlowTest: React.FC = () => {
  const [testEmail] = useState("test@example.com");
  const [testOTP] = useState("123456");
  const [testPassword] = useState("TestPassword123!");
  const [isTestingFlow, setIsTestingFlow] = useState(false);
  const { requestPasswordReset, verifyOTP, resetPassword } = useAuth();
  const toast = useToast();

  const testCompleteFlow = async () => {
    setIsTestingFlow(true);

    try {
      console.log("🧪 Testing password reset flow...");

      // Step 1: Request password reset
      console.log("📧 Step 1: Requesting password reset...");
      await requestPasswordReset(testEmail);
      console.log("✅ Step 1: Password reset requested successfully");

      // Wait a moment
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 2: Verify OTP
      console.log("🔐 Step 2: Verifying OTP...");
      const isValidOTP = await verifyOTP(testEmail, testOTP);
      if (!isValidOTP) {
        throw new Error("OTP verification failed");
      }
      console.log("✅ Step 2: OTP verified successfully");

      // Wait a moment
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 3: Reset password
      console.log("🔑 Step 3: Resetting password...");
      await resetPassword(testEmail, testOTP, testPassword);
      console.log("✅ Step 3: Password reset successfully");

      console.log("🎉 Complete flow test passed!");
      toast.success("Password reset flow test completed successfully!");
    } catch (error) {
      console.error("❌ Flow test failed:", error);
      toast.error("Password reset flow test failed");
    } finally {
      setIsTestingFlow(false);
    }
  };

  return (
    <div className="p-6   bg-gray-900 border border-gray-800 max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold text-white mb-4">
        Password Reset Flow Test
      </h3>
      <div className="space-y-3 text-sm text-gray-300 mb-4">
        <p>
          <strong>Test Email:</strong> {testEmail}
        </p>
        <p>
          <strong>Test OTP:</strong> {testOTP}
        </p>
        <p>
          <strong>Test Password:</strong> {testPassword}
        </p>
      </div>
      <button
        onClick={testCompleteFlow}
        disabled={isTestingFlow}
        className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isTestingFlow ? "Testing Flow..." : "Test Complete Flow"}
      </button>
      <p className="text-xs text-gray-400 mt-2">
        This will test all three steps of the password reset flow in sequence.
        Check the console for detailed logs.
      </p>
    </div>
  );
};

export default PasswordResetFlowTest;
