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
import AnimatedBackground from "../../components/ui/AnimatedBackground";
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
      <div className="min-h-screen text-white relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="z-10 flex flex-col items-center">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  return <SignupContent />;
}

// Main signup form component
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
      router.push("/authenticated");
    }
  }, [isAuthenticated, isLoading, router]);

  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
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
  });

  // Motivational slide content for the carousel section
  const [currentSlide, setCurrentSlide] = useState(0);
  const motivationalContent = [
    {
      title: "Start Your Coding Journey",
      description:
        "Join Coding Jojo and build amazing projects with fellow developers",
      stats: [
        { number: "10K+", label: "Developers" },
        { number: "500+", label: "Projects" },
      ],
    },
    {
      title: "Learn By Building",
      description:
        "Get hands-on experience with real-world projects and expert mentorship",
      stats: [
        { number: "200+", label: "Tutorials" },
        { number: "50+", label: "Courses" },
      ],
    },
    {
      title: "Join Our Community",
      description: "Connect with like-minded developers and grow your network",
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
  ];

  // Animation effect on component mount
  useEffect(() => {
    // Auto-carousel for motivational content
    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % motivationalContent.length);
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, [motivationalContent.length]);

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
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Simple validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    // Check password strength
    const passwordStrengthScore =
      Object.values(passwordStrength).filter(Boolean).length;
    if (passwordStrengthScore < 3) {
      setError("Please create a stronger password.");
      return;
    }
    if (!formData.acceptTerms) {
      setError("You must accept the Terms and Privacy Policy.");
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
        toast.success(
          "Account created successfully! Redirecting to authenticated homepage..."
        );
        router.push("/authenticated");
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
      await googleSignIn();
      toast.success("Google sign up successful! Redirecting...");
    } catch (error) {
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
    return { text: "Strong", color: "bg-green-500" };
  };

  const strengthInfo = getPasswordStrengthLabel();

  const breadcrumbItems = [{ label: "Sign Up", active: true }];

  if (isLoading) {
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
                        className="text-center  bg-gray-900/50 p-4 rounded hover:bg-pink-500/30 transition-all duration-300 group"
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
                      Join Our Community
                    </h3>
                  </div>
                  <div className="p-4  bg-gray-900 rounded">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex -space-x-2">
                        {featuredMembers.slice(0, 3).map((member) => (
                          <div
                            key={member.id}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 border-2 border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                          >
                            {member.name.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        +1000+ developers
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["react", "javascript", "design", "webdev"].map(
                        (topic, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-gray-400 text-xs rounded-full px-2 py-1"
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

            {/* Right Column: Form */}
            <div className="  bg-gray-900/40 backdrop-blur-sm shadow-xl p-6 hover:shadow-pink-900/20 transition duration-300 order-1 md:order-2">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400 mb-2">
                    Create Your Account
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    Fill in your details to get started
                  </p>
                </div>
                {/* Display error message if there is one */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                  {/* Full Name Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-medium text-gray-300"
                    >
                      Full Name
                    </label>
                    <div
                      className={`relative transition-all duration-300 ${formFocus.fullName ? "transform scale-[1.02]" : ""
                        }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User
                          className={`h-4 w-4 transition-colors duration-300 ${formFocus.fullName
                            ? "text-pink-400"
                            : "text-gray-500"
                            }`}
                        />
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => handleFocus("fullName")}
                        onBlur={() => handleBlur("fullName")}
                        className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

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
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-gray-300"
                    >
                      Password
                    </label>
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

                  {/* Password Strength and Requirements */}
                  {formData.password && (
                    <div className="py-2 px-4  bg-gray-900 rounded animate-fadeIn">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">
                          Password Strength:
                        </span>
                        <span
                          className={`text-xs font-medium ${passwordStrengthScore === 4
                            ? "text-green-400"
                            : passwordStrengthScore === 3
                              ? "text-blue-400"
                              : passwordStrengthScore === 2
                                ? "text-yellow-400"
                                : passwordStrengthScore === 1
                                  ? "text-red-400"
                                  : "text-gray-400"
                            }`}
                        >
                          {strengthInfo.text}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-700/70 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strengthInfo.color} transition-all duration-300 ease-out`}
                          style={{
                            width: `${(passwordStrengthScore / 4) * 100}%`,
                          }}
                        ></div>
                      </div>

                      {/* Password Requirements */}
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex items-center group">
                          {passwordStrength.length ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                          )}
                          <span
                            className={`text-xs ${passwordStrength.length
                              ? "text-green-500"
                              : "text-gray-500"
                              }`}
                          >
                            8+ characters
                          </span>
                        </div>
                        <div className="flex items-center group">
                          {passwordStrength.hasNumber ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                          )}
                          <span
                            className={`text-xs ${passwordStrength.hasNumber
                              ? "text-green-500"
                              : "text-gray-500"
                              }`}
                          >
                            One number
                          </span>
                        </div>
                        <div className="flex items-center group">
                          {passwordStrength.hasSpecial ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                          )}
                          <span
                            className={`text-xs ${passwordStrength.hasSpecial
                              ? "text-green-500"
                              : "text-gray-500"
                              }`}
                          >
                            Special char
                          </span>
                        </div>
                        <div className="flex items-center group">
                          {passwordStrength.hasUppercase ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                          )}
                          <span
                            className={`text-xs ${passwordStrength.hasUppercase
                              ? "text-green-500"
                              : "text-gray-500"
                              }`}
                          >
                            Uppercase
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terms Checkbox */}
                  <div className="flex items-start py-2">
                    <div className="flex items-center h-5">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        required
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-pink-500  bg-gray-900 border-gray-700 rounded focus:ring-pink-500 focus:ring-offset-gray-800 transition-all duration-200"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label htmlFor="acceptTerms" className="text-gray-300">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-pink-400 hover:text-pink-300 font-medium"
                        >
                          Terms
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-pink-400 hover:text-pink-300 font-medium"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  {/* Sign Up Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-white ${isSubmitting
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        } transition-all duration-300 font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 group`}
                    >
                      {" "}
                      {isSubmitting ? (
                        <span className="text-sm flex items-center gap-2">
                          <LoadingSpinner size="xs" />
                          Creating account...
                        </span>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
                {/* Social Signup Options */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2   bg-gray-900 text-gray-400">
                        Or sign up with
                      </span>
                    </div>
                  </div>{" "}
                  <div className="mt-4 grid grid-cols-2 gap-3">                 <button
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
                  </button>             <button
                    type="button"
                    onClick={handleGithubSignIn}
                    className="w-full inline-flex justify-center py-2.5 px-4 rounded bg-gray-800/50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 group"
                  >
                      <div className="flex items-center">
                        <Github className="h-5 w-5 text-gray-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
                        <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors duration-200">GitHub</span>
                      </div>
                    </button>
                  </div>
                </div>{" "}
                {/* Login Link */}
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-pink-400 hover:text-pink-300 font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
