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
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { useToast } from "../../hooks/useToast";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";
import OTPVerificationModal from "../../components/auth/OTPVerificationModal";
import NewPasswordModal from "../../components/auth/NewPasswordModal";
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

const Login = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-white flex items-center justify-center">
  
          <LoadingSpinner size="sm" />
        </div>
      </>
    );
  }

  return <LoginContent />;
};

// Main login form component
function LoginContent() {
  const router = useRouter();
  const {
    login,
    googleSignIn,
    githubSignIn,
    isAuthenticated,
    isLoading,
    verifyOTP,
  } = useAuth();
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
            } sign-in failed. Please try again.`
            : "Social sign-in failed. Please try again.";
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

  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Modal states
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingOTP, setPendingOTP] = useState("");
  const [passwordResetFlow, setPasswordResetFlow] = useState(false);

  // Animation and UI states
  // Remove unused isAnimated state
  const [formFocus, setFormFocus] = useState({
    email: false,
    password: false,
  });

  // Motivational slide content for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const motivationalContent = [
    {
      title: "Welcome Back",
      description: "Continue your coding journey with fellow developers",
      stats: [
        { number: "10K+", label: "Developers" },
        { number: "500+", label: "Projects" },
      ],
    },
    {
      title: "Build Together",
      description: "Collaborate on exciting projects with the community",
      stats: [
        { number: "200+", label: "Tutorials" },
        { number: "50+", label: "Courses" },
      ],
    },
    {
      title: "Coding Community",
      description: "Share knowledge and grow with like-minded developers",
      stats: [
        { number: "24/7", label: "Support" },
        { number: "Weekly", label: "Events" },
      ],
    },
  ];
  // Featured members mockup
  const featuredMembers: Member[] = [
    {
      id: "1",
      name: "Alex Morgan",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Instructor",
      lastActive: "Online now",
    },
    {
      id: "2",
      name: "Jamie Chen",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Student",
      lastActive: "Online now",
    },
    {
      id: "3",
      name: "Taylor Swift",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Mentor",
      lastActive: "Online now",
    },
    {
      id: "4",
      name: "Sam Wilson",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Student",
      lastActive: "2h ago",
    },
  ]; // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // For login, users should go directly to home page (they already completed onboarding)
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Animation effect on component mount
  useEffect(() => {
    // Remove unused isAnimated update

    // Auto-carousel for motivational content
    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % motivationalContent.length);
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, [motivationalContent.length]); // Add missing dependency

  // Form field management
  const handleFocus = (field: string) => {
    setFormFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFormFocus((prev) => ({ ...prev, [field]: false }));
  };

  // Type the event properly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear any previous errors when the user types
    if (error) setError(null);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Login successful, redirect to homepage (users who login already completed onboarding)
        router.push("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleOTPVerify = async (otp: string) => {
    try {
      if (passwordResetFlow) {
        // For password reset flow, just verify OTP and proceed to new password
        const isValid = await verifyOTP(pendingEmail, otp);

        if (isValid) {
          setPendingOTP(otp);
          setShowOTPModal(false);
          setShowNewPasswordModal(true);
        } else {
          toast.error("Invalid verification code. Please try again.");
        }
      } else {
        // For regular login flow
        const isValid = await verifyOTP(pendingEmail, otp);

        if (isValid) {
          // Proceed with login after OTP verification
          const result = await login(formData.email, formData.password);
          if (result.success) {
            setShowOTPModal(false);
            toast.success(
              "Login successful! Redirecting to homepage..."
            );
            router.push("/");
          } else {
            toast.error("Login failed after OTP verification.");
          }
        } else {
          toast.error("Invalid verification code. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    }
  };

  const handlePasswordResetOTPRequired = (email: string) => {
    setPendingEmail(email);
    setPasswordResetFlow(true);
    setShowForgotPasswordModal(false);
    setShowOTPModal(true);
  };

  const handlePasswordResetComplete = () => {
    setShowNewPasswordModal(false);
    setPendingEmail("");
    setPendingOTP("");
    setPasswordResetFlow(false);
    toast.success(
      "Password reset complete! You can now log in with your new password."
    );
  };

  const handleClosePasswordResetFlow = () => {
    setShowForgotPasswordModal(false);
    setShowOTPModal(false);
    setShowNewPasswordModal(false);
    setPendingEmail("");
    setPendingOTP("");
    setPasswordResetFlow(false);
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Google sign in successful! Redirecting...");
    } catch (error) {
      setError("Google sign in failed. Please try again.");
      toast.error("Google sign in failed. Please try again later.");
    }
  };
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsSubmitting(true);
      // Pass the Google credential to the auth service
      await googleSignIn(credentialResponse.credential);
      toast.success("Google sign in successful! Redirecting...");
      // The AuthContext will handle the redirect automatically
    } catch (error) {
      setError("Google sign in failed. Please try again.");
      toast.error("Google sign in failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google sign in was cancelled or failed.");
    toast.error("Google sign in failed. Please try again.");
  };

  const handleOAuthGoogle = async () => {
    try {
      setIsSubmitting(true);
      // Use OAuth redirect flow as fallback
      await googleSignIn(); // Without credential = OAuth redirect
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsSubmitting(true);
      await githubSignIn(); // This will redirect to GitHub OAuth
    } catch (error) {
      toast.error("GitHub sign-in failed. Please try again.");
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

  const breadcrumbItems = [{ label: "Login", active: true }];
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white relative flex items-center justify-center">
        <div className="z-10 flex flex-col items-center">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Purple decorative shapes */}
     <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-100 via-blue-900 to-gray-100 rounded-bl-[100px] z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-100 via-blue-900 to-gray-100 rounded-tr-[100px] z-0" />

      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <div className="flex w-full max-w-6xl h-[600px] bg-white  shadow-2xl overflow-hidden">
          
          {/* Left Side - Sign In Form */}
          <div className="w-[30%] bg-white p-8 flex flex-col justify-center">
            {/* Blue accent bar at top */}
            <div className="w-70 h-0.5 bg-indigo-600 mb-6 rounded-full" />

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome Back!</h1>
            <p className="text-xs text-center text-gray-500 mb-6">Sign in to continue your learning journey</p>

            {/* Display error message if there is one */}
            {error && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 ">
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className="w-full px-3 py-2 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="student@example.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-xs text-gray-600">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className="w-full px-3 py-2 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Sign In Button */}
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
                    Signing in...
                  </span>
                ) : (
                  "START LEARNING"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-400">OR CONTINUE WITH</span>
                </div>
              </div>

              {/* Social Sign In Buttons */}
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

            {/* Create Account Link */}
            <div className="mt-4">
              <Link href="/signup" className="flex items-center text-xs text-center pl-7 text-gray-600 hover:text-indigo-600 transition-colors group">
                <span>New to learning? Create an account</span>
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

          {/* Right Side - Learning Platform Content */}
          <div className="w-[70%] relative overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop')",
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-900/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12 text-white">
              <div className="mb-8">
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                  <span className="text-sm font-semibold">🎓 Learn Anywhere, Anytime</span>
                </div>
                <h2 className="text-5xl font-bold mb-6">Start Your <br /> Learning Journey</h2>
                <p className="text-bold justify-center text-center leading-relaxed w-full max-w-lg mb-8">
                  Join thousands of students who are mastering new skills and advancing their careers. Access premium courses taught by industry experts.
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
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-semibold text-gray-800">Featured Course</div>
                    <div className="text-xs text-gray-500 mt-1">Web Development Masterclass</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-xs">★★★★★</span>
                      </div>
                      <span className="text-xs text-gray-400">4.9 (2.5K)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-indigo-600">$49</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modals - Preserved all modal functionality */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={handleClosePasswordResetFlow}
        onOTPRequired={handlePasswordResetOTPRequired}
      />
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={handleClosePasswordResetFlow}
        onVerify={handleOTPVerify}
        email={pendingEmail}
        type={passwordResetFlow ? "password-reset" : "login"}
      />
      <NewPasswordModal
        isOpen={showNewPasswordModal}
        onClose={handlePasswordResetComplete}
        email={pendingEmail}
        otp={pendingOTP}
      />
    </div>
  );
}

export default Login;
