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
import AnimatedBackground from "../../components/ui/AnimatedBackground";
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

        <div className="min-h-screen flex items-center justify-center">
          <AnimatedBackground />

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
      router.push("/authenticated");
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
        // Login successful, redirect to authenticated homepage
        router.push("/authenticated");
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
              "Login successful! Redirecting to authenticated homepage..."
            );
            router.push("/authenticated");
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
        <AnimatedBackground />
        <div className="z-10 flex flex-col items-center">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* <AnimatedBackground /> */}
      <Breadcrumb items={breadcrumbItems} />
      <div className="relative z-10 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column: Brand imagery and message */}
            <div className="  bg-gray-900/40 backdrop-blur-sm shadow-xl p-6 hover:shadow-purple-900/20 transition duration-300 order-2 md:order-1">
              <div className="flex flex-col items-center h-full justify-between">
                <div className="relative w-20 h-20 mb-6">
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

                {/* Carousel for motivational content */}
                <div className="h-40 relative w-full">
                  {motivationalContent.map((content, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${currentSlide === index ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
                        {content.title}
                      </h2>
                      <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-4"></div>
                      <p className="text-center text-gray-300 mb-6">
                        {content.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Slide indicators */}
                <div className="flex justify-center space-x-2 my-6">
                  {motivationalContent.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 ${index === currentSlide
                        ? "w-6 bg-gradient-to-r from-pink-500 to-orange-500"
                        : "w-2 bg-gray-700"
                        } rounded-full transition-all duration-300 cursor-pointer`}
                      onClick={() => setCurrentSlide(index)}
                    ></div>
                  ))}
                </div>

                {/* Stats section */}
                <div className="w-full grid grid-cols-2 gap-4">
                  {motivationalContent[currentSlide].stats.map(
                    (stat, index) => (
                      <div
                        key={index}
                        className="text-center  bg-gray-900/50 p-4 hover:border-pink-500/30 transition-all duration-300 group"
                      >
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400 group-hover:from-pink-300 group-hover:to-orange-300 transition-all duration-300">
                          {stat.number}
                        </p>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                          {stat.label}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Community Preview */}
                <div className="mt-8 w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center">
                      <Users className="w-4 h-4 mr-2 text-pink-400" />
                      Community Activity
                    </h3>
                  </div>
                  <div className="p-4  bg-gray-900/3 ">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex -space-x-2">
                        {featuredMembers.slice(0, 3).map((member) => (
                          <div
                            key={member.id}
                            className="w-6 h-6 rounded-full relative"
                          >
                            <Image
                              src={member.avatarUrl}
                              alt={member.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        {
                          featuredMembers.filter(
                            (m) => m.lastActive === "Online now"
                          ).length
                        }{" "}
                        online now
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["react", "javascript", "design", "webdev"].map(
                        (topic, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-gray-400 text-xs rounded-full px-2 py-"
                          >
                            #{topic}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="  bg-gray-900/40 backdrop-blur-sm shadow-xl p-6 hover:shadow-pink-900/20 transition duration-300 order-1 md:order-2">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400 mb-2">
                    Welcome Back
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    Access your account to continue
                  </p>
                </div>

                {/* Display error message if there is one */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 ">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-300"
                    >
                      Email Address
                    </label>
                    <div
                      className={`relative transition-all duration-300 ${formFocus.email ? "transform scale-[1.02]" : ""
                        }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail
                          className={`h-4 w-4 transition-colors duration-300 ${formFocus.email ? "text-pink-400" : "text-gray-500"
                            }`}
                        />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1">
                    {" "}
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-xs font-medium text-gray-300"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPasswordModal(true)}
                        className="text-xs font-medium text-pink-400 hover:text-pink-300 transition-colors duration-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div
                      className={`relative transition-all duration-300 ${formFocus.password ? "transform scale-[1.02]" : ""
                        }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock
                          className={`h-4 w-4 transition-colors duration-300 ${formFocus.password
                            ? "text-pink-400"
                            : "text-gray-500"
                            }`}
                        />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => handleFocus("password")}
                        onBlur={() => handleBlur("password")}
                        className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                        placeholder="••••••••"
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

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center py-2">
                    <div className="flex items-center h-5">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-pink-500  bg-gray-900 border-gray-700 rounded focus:ring-pink-500 focus:ring-offset-gray-800 transition-all duration-200"
                      />
                    </div>
                    <div className="ml-2">
                      <label
                        htmlFor="rememberMe"
                        className="text-sm text-gray-300"
                      >
                        Remember me on this device
                      </label>
                    </div>
                  </div>

                  {/* Login Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent  text-white ${isSubmitting
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        } transition-all duration-300 font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 group`}
                    >
                      {" "}
                      {isSubmitting ? (
                        <span className="text-sm flex items-center gap-2">
                          <LoadingSpinner size="xs" />
                          Signing in...
                        </span>
                      ) : (
                        <>
                          <span className="text-sm">Sign In</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
                {/* Social Login Options */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2   bg-gray-900 text-gray-400">
                        Or sign in with
                      </span>
                    </div>
                  </div>{" "}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full inline-flex justify-center py-2.5 px-  bg-gray-800/50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors duration-200">Google</span>
                      </div>
                    </button>
                    <button
                      onClick={handleGithubSignIn}
                      className="w-full inline-flex justify-center py-2.5 px-  bg-gray-800/50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <Github className="h-5 w-5 text-gray-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
                        <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors duration-200">GitHub</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-pink-400 hover:text-pink-300 font-medium"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>{" "}
      {/* Modals */}
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
