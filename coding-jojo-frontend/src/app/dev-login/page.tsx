"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DevLoginPage() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const router = useRouter();
  const loginAsAdmin = async () => {
    try {
      setIsLoading(true);
      setStatus("Creating admin user...");

      const response = await fetch(
        "http://localhost:5000/api/auth/create-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.token) {
        // Store the token in both locations for redundancy
        localStorage.setItem("auth_token", data.token);
        sessionStorage.setItem("auth_token", data.token);

        // Also store user info if available
        if (data.user) {
          localStorage.setItem("user_info", JSON.stringify(data.user));
          sessionStorage.setItem("user_info", JSON.stringify(data.user));
        }

        setStatus("✅ Login successful! Redirecting to admin dashboard...");

        // Redirect to admin dashboard after a short delay
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      } else {
        setStatus("❌ Login failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus(
        "❌ Login failed: " +
          (error instanceof Error ? error.message : "Network error")
      );
    } finally {
      setIsLoading(false);
    }
  };
  const checkCurrentAuth = async () => {
    if (isCheckingAuth) return; // Prevent multiple simultaneous checks

    try {
      setIsCheckingAuth(true);
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");
      if (token) {
        setStatus("🔍 Validating token...");

        // Validate token with the backend
        const response = await fetch(
          "http://localhost:5000/api/auth/verify-token",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setStatus(
              "✅ Already authenticated! You can go to the admin dashboard."
            );
          } else {
            // Token is invalid, clear it
            localStorage.removeItem("auth_token");
            sessionStorage.removeItem("auth_token");
            localStorage.removeItem("user_info");
            sessionStorage.removeItem("user_info");
            setStatus("❌ Token expired or invalid. Please log in again.");
          }
        } else {
          // Token validation failed
          localStorage.removeItem("auth_token");
          sessionStorage.removeItem("auth_token");
          localStorage.removeItem("user_info");
          sessionStorage.removeItem("user_info");
          setStatus("❌ Token validation failed. Please log in again.");
        }
      } else {
        setStatus("❌ Not authenticated.");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setStatus("❌ Authentication check failed.");
    } finally {
      setIsCheckingAuth(false);
    }
  };
  const clearAuth = () => {
    // Clear all authentication data from both storage types
    localStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("user_info");

    // Clear any other auth-related items that might exist
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    setStatus("🧹 Authentication cleared! All tokens and user data removed.");
  };
  useEffect(() => {
    checkCurrentAuth();
  }, []);

  return (
    <div className="min-h-screen   bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full  bg-gray-900  p-8 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Development Login
        </h1>

        <div className="space-y-4">
          <div className="bg-yellow-900/20 border border-yellow-500/50  p-4 text-yellow-200 text-sm">
            <strong>⚠️ Development Only</strong>
            <br />
            This page is for development testing only. It creates/uses a test
            admin account.
          </div>
          {status && (
            <div className="bg-gray-700  p-4 text-gray-200 text-sm font-mono">
              {status}
            </div>
          )}{" "}
          <button
            onClick={loginAsAdmin}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4  transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading
              ? "Creating Admin User..."
              : "Login as Admin (Development)"}
          </button>{" "}
          <button
            onClick={checkCurrentAuth}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4  transition-colors disabled:opacity-50"
            disabled={isCheckingAuth || isLoading}
          >
            {isCheckingAuth
              ? "Checking Authentication..."
              : "Check Authentication Status"}
          </button>{" "}
          <button
            onClick={clearAuth}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4  transition-colors disabled:opacity-50"
            disabled={isLoading || isCheckingAuth}
          >
            Clear Authentication
          </button>
          <div className="text-center pt-4">
            <a
              href="/admin"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Go to Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
