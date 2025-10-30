"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Users,
  User,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { useToast } from "../../hooks/useToast";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../../components/Navbar";

// Member interface
interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  lastActive: string;
}

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white text-gray-800 relative flex items-center justify-center">
        <div className="z-10 flex flex-col items-center">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  return <SignupContent />;
}

// Main signup form component - Updated with new design
function SignupContent() {
  const router = useRouter();
  const { signup, googleSignIn, githubSignIn, isAuthenticated, isLoading } =
    useAuth();
  const toast = useToast();

  // Handle OAuth errors from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    const provider = urlParams.get("provider");
    const message = urlParams.get("message");

    if (error) {
      let errorMessage = message || "Authentication failed. Please try again.";

      switch (error) {
        case "oauth_failed":
          errorMessage = provider
            ? `${provider.charAt(0).toUpperCase() + provider.slice(1)
            } sign-up failed. Please try again.`
            : "Social sign-up failed. Please try again.";
          break;
        case "access_denied":
          errorMessage = "Access was denied. Please try again.";
          break;
        default:
          errorMessage = message || "Authentication failed. Please try again.";
      }

      setError(errorMessage);
      toast.error(errorMessage);

      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Check if user needs onboarding before redirecting
      const needsOnboarding = localStorage.getItem('needs_onboarding');
      const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
      
      if (needsOnboarding === 'true' && !hasCompletedOnboarding) {
        console.log('Authenticated user needs onboarding, redirecting...');
        router.push("/onboarding");
      } else if (hasCompletedOnboarding) {
        console.log('Authenticated user has completed onboarding, redirecting to authenticated page');
        router.push("/");
      }
      // If user is authenticated but has no onboarding flags, let them stay on signup (shouldn't happen in normal flow)
    }
  }, [isAuthenticated, isLoading, router]);

  // Form state - Updated to match new design
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirm password
    acceptTerms: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength checker
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasNumber: false,
    hasSpecial: false,
    hasUppercase: false,
  });

  // Animation and UI states
  const [formFocus, setFormFocus] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false, // Added confirm password focus
  });

  // Form field management
  const handleFocus = (field: string) => {
    setFormFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFormFocus((prev) => ({ ...prev, [field]: false }));
  };

  // Type the event properly - Updated for new design
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear any previous errors when the user types
    if (error) setError(null);

    // Check password strength when password field changes
    if (name === "password") {
      setPasswordStrength({
        length: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        hasUppercase: /[A-Z]/.test(value),
      });
    }
  };

  // Updated submit handler to include confirm password validation
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Simple validation - Updated for new design
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password strength
    const passwordStrengthScore =
      Object.values(passwordStrength).filter(Boolean).length;
    if (passwordStrengthScore < 3) {
      setError("Please create a stronger password.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const result = await signup(
        formData.fullName,
        formData.email,
        formData.password
      );
      if (result.success) {
        // Set a flag to indicate user just signed up and needs onboarding
        localStorage.setItem('needs_onboarding', 'true');
        console.log('✅ Set needs_onboarding flag after successful signup');
        
        toast.success(
          "Account created successfully! Let's personalize your learning experience..."
        );
        router.push("/onboarding");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (error) {
      setError("Failed to create account. Please try again.");
      toast.error(
        "Account creation failed. Please check your information and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Set flag for Google sign up users to also go through onboarding
      localStorage.setItem('needs_onboarding', 'true');
      
      await googleSignIn();
      toast.success("Google sign up successful! Redirecting...");
    } catch (error) {
      // Remove the flag if Google sign up fails
      localStorage.removeItem('needs_onboarding');
      setError("Google sign up failed. Please try again.");
      toast.error("Google sign up failed. Please try again later.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsSubmitting(true);
      // Pass the Google credential to the auth service
      await googleSignIn(credentialResponse.credential);
      toast.success("Google sign up successful! Redirecting...");
      // The AuthContext will handle the redirect automatically
    } catch (error) {
      setError("Google sign up failed. Please try again.");
      toast.error("Google sign up failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google sign up was cancelled or failed.");
    toast.error("Google sign up failed. Please try again.");
  };

  const handleOAuthGoogle = async () => {
    try {
      setIsSubmitting(true);
      // Use OAuth redirect flow as fallback
      await googleSignIn(); // Without credential = OAuth redirect
    } catch (error) {
      toast.error("Google sign-up failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsSubmitting(true);
      await githubSignIn(); // This will redirect to GitHub OAuth
    } catch (error) {
      toast.error("GitHub sign-up failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle GitHub OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // GitHub OAuth callback
      githubSignIn(code);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [githubSignIn]);

  // Calculate overall password strength
  const passwordStrengthScore =
    Object.values(passwordStrength).filter(Boolean).length;
  const getPasswordStrengthLabel = () => {
    if (passwordStrengthScore === 0)
      return { text: "Very Weak", color: " bg-gray-900" };
    if (passwordStrengthScore === 1)
      return { text: "Weak", color: "bg-red-500" };
    if (passwordStrengthScore === 2)
      return { text: "Fair", color: "bg-yellow-500" };
    if (passwordStrengthScore === 3)
      return { text: "Good", color: "bg-blue-500" };
    return { text: "Strong", color: "bg-blue-500" };
  };

  const strengthInfo = getPasswordStrengthLabel();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-white overflow-hidden">
      {/* Purple decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-100 via-blue-900 to-gray-100 rounded-bl-[100px] z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-100 via-blue-900 to-gray-100 rounded-tr-[100px] z-0" />

      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <div className="flex w-full max-w-6xl h-[600px] bg-white  shadow-2xl overflow-hidden">
          
          {/* Left Side - Learning Platform Content */}
          <div className="w-[70%] relative overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop')",
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-900/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12 text-white">
              <div className="mb-8">
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                  <span className="text-sm font-semibold">✨ Join Our Community</span>
                </div>
                <h2 className="text-5xl font-bold mb-6">Begin Your <br /> Learning Adventure</h2>
                <p className="text-lg leading-relaxed max-w-lg text-center mb-8">
                  Create your account and unlock access to world-class courses. Learn from industry experts and earn recognized certificates.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                <div className="bg-white/10 backdrop-blur-md  p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">500+</div>
                  <div className="text-xs text-white/80">Courses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md  p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">50K+</div>
                  <div className="text-xs text-white/80">Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md  p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">4.8★</div>
                  <div className="text-xs text-white/80">Rating</div>
                </div>
              </div>

              {/* Featured Course Card */}
              <div className="mt-8 bg-white  p-4 shadow-2xl max-w-sm w-full">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-semibold text-gray-800">Popular Course</div>
                    <div className="text-xs text-gray-500 mt-1">Python Programming Complete</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-xs">★★★★★</span>
                      </div>
                      <span className="text-xs text-gray-400">4.9 (3.2K)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">$39</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="w-[30%] bg-white p-8 flex flex-col justify-center">

            <h1 className="text-2xl text-center font-bold text-gray-800 mt-15 mb-1">Create Account</h1>
            <p className="text-xs text-center text-gray-500 mb-6">Join thousands of learners today</p>

            {/* Display error message if there is one */}
            {error && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 ">
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-xs text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs text-gray-600 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="student@example.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-xs text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs text-gray-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white py-3  font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm ${
                  isSubmitting 
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-1">
                    <LoadingSpinner size="xs" />
                    Creating Account...
                  </span>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </button>

              {/* Terms */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">Terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">Privacy Policy</Link>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-400">OR SIGN UP WITH</span>
                </div>
              </div>

              {/* Social Sign Up Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="flex items-center justify-center px-3 py-2 border border-gray-200  hover:bg-gray-50 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2 text-xs text-gray-600">Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleGithubSignIn}
                  disabled={isSubmitting}
                  className="flex items-center justify-center px-3 py-2 border border-gray-200  hover:bg-gray-50 transition-all"
                >
                  <Github className="w-4 h-4 text-gray-700" />
                  <span className="ml-2 text-xs text-gray-600">GitHub</span>
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-4">
              <Link href="/login" className="flex items-center text-xs text-center pl-9 pb-12 text-gray-600 hover:text-indigo-600 transition-colors group">
                <span>Already have an account? Sign in</span>
                <svg 
                  className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
