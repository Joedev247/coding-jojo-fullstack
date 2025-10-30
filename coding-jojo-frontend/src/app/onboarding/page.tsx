"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  X,
  Code,
  Rocket,
  Brain,
  Trophy,
  Briefcase,
  Users,
  Zap,
  Target,
  BookOpen,
  GraduationCap,
  Laptop,
  Coffee,
  Sunrise,
  Sunset,
  Moon,
  Clock,
  TrendingUp,
  Award,
  Lightbulb,
  Search,
  Share2,
  Megaphone,
  FileText,
  MoreHorizontal,
} from "lucide-react";

interface OnboardingData {
  codingLevel: string;
  learningGoal: string[];
  preferredLanguages: string[];
  otherLanguage: string;
  studySchedule: string;
  hearAbout: string;
}

const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    codingLevel: "",
    learningGoal: [],
    preferredLanguages: [],
    otherLanguage: "",
    studySchedule: "",
    hearAbout: "",
  });

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signup");
    }
  }, [isAuthenticated, router]);

  const handleNext = () => {
    if (currentStep < 5) {
      setDirection("forward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 400);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection("backward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 400);
    }
  };

  const handleComplete = async () => {
    try {
      // Save onboarding data
      localStorage.setItem("onboarding_completed", "true");
      localStorage.setItem("onboarding_data", JSON.stringify(onboardingData));
      
      toast.success("Welcome to Coding Jojo! Let's start your coding journey.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Failed to complete onboarding. Please try again.");
    }
  };

  const selectCodingLevel = (level: string) => {
    setOnboardingData({ ...onboardingData, codingLevel: level });
  };

  const toggleLearningGoal = (goal: string) => {
    const goals = onboardingData.learningGoal.includes(goal)
      ? onboardingData.learningGoal.filter((g) => g !== goal)
      : [...onboardingData.learningGoal, goal];
    setOnboardingData({ ...onboardingData, learningGoal: goals });
  };

  const toggleLanguage = (language: string) => {
    if (language === "other") {
      setShowOtherInput(!showOtherInput);
      if (showOtherInput) {
        // Remove other from selection if unchecking
        const languages = onboardingData.preferredLanguages.filter((l) => l !== "other");
        setOnboardingData({ ...onboardingData, preferredLanguages: languages, otherLanguage: "" });
      } else {
        // Add other to selection
        setOnboardingData({ ...onboardingData, preferredLanguages: [...onboardingData.preferredLanguages, "other"] });
      }
    } else {
      const languages = onboardingData.preferredLanguages.includes(language)
        ? onboardingData.preferredLanguages.filter((l) => l !== language)
        : [...onboardingData.preferredLanguages, language];
      setOnboardingData({ ...onboardingData, preferredLanguages: languages });
    }
  };

  const selectHearAbout = (source: string) => {
    setOnboardingData({ ...onboardingData, hearAbout: source });
  };

  const selectSchedule = (schedule: string) => {
    setOnboardingData({ ...onboardingData, studySchedule: schedule });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.codingLevel !== "";
      case 2:
        return onboardingData.learningGoal.length > 0;
      case 3:
        if (onboardingData.preferredLanguages.includes("other")) {
          return onboardingData.preferredLanguages.length > 0 && onboardingData.otherLanguage.trim() !== "";
        }
        return onboardingData.preferredLanguages.length > 0;
      case 4:
        return onboardingData.studySchedule !== "";
      case 5:
        return onboardingData.hearAbout !== "";
      default:
        return false;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-all z-20"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="h-full flex items-center justify-center p-6 relative z-10">
        <div className="max-w-7xl w-full h-full flex items-center">
          <div className="grid grid-cols-12 gap-6 w-full">
            {/* Left Sidebar */}
            <div className="col-span-3">
              <div className="sticky top-8">
                {/* Profile Section */}
                <div className="bg-white  p-6 shadow-sm mb-6">
                  <div className="flex items-center space-x-3 mt-4">
                    <Image
                      src={user?.profilePicture || "/testimonial-avatar.jpg"}
                      alt={user?.name || "User"}
                      width={50}
                      height={50}
                      className="rounded-full w-15 h-15"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{user?.name || "Developer"}</h3>
                      <p className="text-xs text-gray-500">New Learner</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Steps */}
                <div className="bg-white  p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-indigo-600 mb-6">STEP {currentStep} OF 5</h3>
                  
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {/* Progress Line */}
                    <div 
                      className="absolute left-[15px] top-0 w-0.5 bg-gradient-to-b from-indigo-600 to-purple-600 transition-all duration-500"
                      style={{ height: `${((currentStep - 1) / 4) * 100}%` }}
                    ></div>

                    {/* Step 1 */}
                    <div className="relative flex items-start mb-8">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${
                        currentStep >= 1 ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"
                      }`}>
                        1
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className={`text-sm font-semibold transition-colors ${
                          currentStep === 1 ? "text-gray-900" : "text-gray-400"
                        }`}>
                          Your Coding Level
                        </h4>
                        {currentStep === 1 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Tell us about your programming experience
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex items-start mb-8">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${
                        currentStep >= 2 ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"
                      }`}>
                        2
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className={`text-sm font-semibold transition-colors ${
                          currentStep === 2 ? "text-gray-900" : "text-gray-400"
                        }`}>
                          Learning Goals
                        </h4>
                        {currentStep === 2 && (
                          <p className="text-xs text-gray-500 mt-1">
                            What do you want to achieve?
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex items-start mb-8">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${
                        currentStep >= 3 ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"
                      }`}>
                        3
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className={`text-sm font-semibold transition-colors ${
                          currentStep === 3 ? "text-gray-900" : "text-gray-400"
                        }`}>
                          Tech Stack Interest
                        </h4>
                        {currentStep === 3 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Choose your preferred technologies
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative flex items-start mb-8">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${
                        currentStep >= 4 ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"
                      }`}>
                        4
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className={`text-sm font-semibold transition-colors ${
                          currentStep === 4 ? "text-gray-900" : "text-gray-400"
                        }`}>
                          Study Schedule
                        </h4>
                        {currentStep === 4 && (
                          <p className="text-xs text-gray-500 mt-1">
                            When do you prefer to code and learn?
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="relative flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${
                        currentStep >= 5 ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"
                      }`}>
                        5
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className={`text-sm font-semibold transition-colors ${
                          currentStep === 5 ? "text-gray-900" : "text-gray-400"
                        }`}>
                          How You Found Us
                        </h4>
                        {currentStep === 5 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Tell us how you discovered Coding Jojo
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Did You Know Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-xs font-bold text-indigo-600 mb-3 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      DID YOU KNOW:
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Coding Jojo has helped over 50,000 developers master programming. Our interactive platform offers real-time code feedback and personalized learning paths to accelerate your journey from beginner to pro.
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs text-gray-500">
                      Questions? <a href="#" className="text-indigo-600 hover:underline font-semibold">Contact support</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9 flex items-center">
              <div className={`bg-white  shadow-lg p-6 transition-all duration-400 w-full ${
                isAnimating 
                  ? direction === "forward" 
                    ? "opacity-0 translate-x-8" 
                    : "opacity-0 -translate-x-8"
                  : "opacity-100 translate-x-0"
              }`}>
                {/* Step 1: Coding Level */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Code className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        What's your current coding level?
                      </h2>
                      <p className="text-sm text-gray-500">This helps us personalize your learning experience</p>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {/* Absolute Beginner */}
                      <button
                        onClick={() => selectCodingLevel("beginner")}
                        className={`group p-6  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.codingLevel === "beginner"
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                            onboardingData.codingLevel === "beginner"
                              ? "bg-gradient-to-br from-green-400 to-emerald-500"
                              : "bg-green-100 group-hover:bg-green-200"
                          }`}>
                            <Rocket className={`w-8 h-8 ${
                              onboardingData.codingLevel === "beginner" ? "text-white" : "text-green-600"
                            }`} />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-gray-900">Beginner</p>
                            <p className="text-xs text-gray-500 mt-1">New to coding</p>
                          </div>
                        </div>
                      </button>

                      {/* Some Experience */}
                      <button
                        onClick={() => selectCodingLevel("intermediate")}
                        className={`group p-6  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.codingLevel === "intermediate"
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                            onboardingData.codingLevel === "intermediate"
                              ? "bg-gradient-to-br from-blue-400 to-indigo-500"
                              : "bg-blue-100 group-hover:bg-blue-200"
                          }`}>
                            <Brain className={`w-8 h-8 ${
                              onboardingData.codingLevel === "intermediate" ? "text-white" : "text-blue-600"
                            }`} />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-gray-900">Intermediate</p>
                            <p className="text-xs text-gray-500 mt-1">Some experience</p>
                          </div>
                        </div>
                      </button>

                      {/* Advanced */}
                      <button
                        onClick={() => selectCodingLevel("advanced")}
                        className={`group p-6  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.codingLevel === "advanced"
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                            onboardingData.codingLevel === "advanced"
                              ? "bg-gradient-to-br from-orange-400 to-red-500"
                              : "bg-orange-100 group-hover:bg-orange-200"
                          }`}>
                            <TrendingUp className={`w-8 h-8 ${
                              onboardingData.codingLevel === "advanced" ? "text-white" : "text-orange-600"
                            }`} />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-gray-900">Advanced</p>
                            <p className="text-xs text-gray-500 mt-1">Skilled developer</p>
                          </div>
                        </div>
                      </button>

                      {/* Expert */}
                      <button
                        onClick={() => selectCodingLevel("expert")}
                        className={`group p-6  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.codingLevel === "expert"
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                            onboardingData.codingLevel === "expert"
                              ? "bg-gradient-to-br from-purple-400 to-pink-500"
                              : "bg-purple-100 group-hover:bg-purple-200"
                          }`}>
                            <Trophy className={`w-8 h-8 ${
                              onboardingData.codingLevel === "expert" ? "text-white" : "text-purple-600"
                            }`} />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-gray-900">Expert</p>
                            <p className="text-xs text-gray-500 mt-1">Professional dev</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Learning Goals */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        What are your learning goals?
                      </h2>
                      <p className="text-sm text-gray-500">Select all that apply to you</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "career", label: "Career Change", desc: "Switch to tech", icon: Briefcase, gradient: "from-blue-500 to-cyan-500" },
                        { id: "advance", label: "Career Advancement", desc: "Level up skills", icon: TrendingUp, gradient: "from-emerald-500 to-teal-500" },
                        { id: "freelance", label: "Freelancing", desc: "Build projects", icon: Laptop, gradient: "from-purple-500 to-pink-500" },
                        { id: "startup", label: "Launch Startup", desc: "Build your idea", icon: Rocket, gradient: "from-orange-500 to-red-500" },
                        { id: "certification", label: "Get Certified", desc: "Earn credentials", icon: Award, gradient: "from-yellow-500 to-orange-500" },
                        { id: "knowledge", label: "Learn for Fun", desc: "Personal growth", icon: BookOpen, gradient: "from-indigo-500 to-purple-500" },
                      ].map((goal) => (
                        <button
                          key={goal.id}
                          onClick={() => toggleLearningGoal(goal.id)}
                          className={`group p-6  border-2 transition-all duration-300 hover:shadow-lg ${
                            onboardingData.learningGoal.includes(goal.id)
                              ? "border-indigo-600 bg-indigo-50 shadow-md"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-3">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                              onboardingData.learningGoal.includes(goal.id)
                                ? `bg-gradient-to-br ${goal.gradient}`
                                : "bg-gray-100 group-hover:bg-gray-200"
                            }`}>
                              <goal.icon className={`w-7 h-7 ${
                                onboardingData.learningGoal.includes(goal.id) ? "text-white" : "text-gray-600"
                              }`} />
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-gray-900">{goal.label}</p>
                              <p className="text-xs text-gray-500 mt-1">{goal.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Tech Stack */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Which technologies interest you?
                      </h2>
                      <p className="text-gray-500">Choose your preferred tech stack (select multiple)</p>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {/* JavaScript */}
                      <button
                        onClick={() => toggleLanguage("javascript")}
                        className={`group p-4  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.preferredLanguages.includes("javascript")
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                            alt="JavaScript"
                            width={48}
                            height={48}
                          />
                          <p className="font-bold text-gray-900 text-sm">JavaScript</p>
                        </div>
                      </button>

                      {/* Python */}
                      <button
                        onClick={() => toggleLanguage("python")}
                        className={`group p-4  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.preferredLanguages.includes("python")
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                            alt="Python"
                            width={48}
                            height={48}
                          />
                          <p className="font-bold text-gray-900 text-sm">Python</p>
                        </div>
                      </button>

                      {/* React */}
                      <button
                        onClick={() => toggleLanguage("react")}
                        className={`group p-4  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.preferredLanguages.includes("react")
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                            alt="React"
                            width={48}
                            height={48}
                          />
                          <p className="font-bold text-gray-900 text-sm">React</p>
                        </div>
                      </button>

                      {/* Node.js */}
                      <button
                        onClick={() => toggleLanguage("nodejs")}
                        className={`group p-4  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.preferredLanguages.includes("nodejs")
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                            alt="Node.js"
                            width={48}
                            height={48}
                          />
                          <p className="font-bold text-gray-900 text-sm">Node.js</p>
                        </div>
                      </button>

                      {/* TypeScript */}
                      <button
                        onClick={() => toggleLanguage("typescript")}
                        className={`group p-4  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.preferredLanguages.includes("typescript")
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                            alt="TypeScript"
                            width={48}
                            height={48}
                          />
                          <p className="font-bold text-gray-900 text-sm">TypeScript</p>
                        </div>
                      </button>

                      {/* Next.js */}
                      <button
                        onClick={() => toggleLanguage("nextjs")}
                        className={`group p-4  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.preferredLanguages.includes("nextjs")
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                            alt="Next.js"
                            width={48}
                            height={48}
                          />
                          <p className="font-bold text-gray-900 text-sm">Next.js</p>
                        </div>
                      </button>

                      {/* Java */}
                      <button
                        onClick={() => toggleLanguage("java")}
                        className={`group p-4  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.preferredLanguages.includes("java")
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                            alt="Java"
                            width={48}
                            height={48}
                          />
                          <p className="font-bold text-gray-900 text-sm">Java</p>
                        </div>
                      </button>

                      {/* Other */}
                      <button
                        onClick={() => toggleLanguage("other")}
                        className={`group p-4  border-2 transition-all duration-300 hover:shadow-lg ${
                          onboardingData.preferredLanguages.includes("other")
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                            <Code className="w-6 h-6 text-white" />
                          </div>
                          <p className="font-bold text-gray-900 text-sm">Other</p>
                        </div>
                      </button>
                    </div>

                    {/* Other Language Input */}
                    {showOtherInput && (
                      <div className="mt-6 animate-in slide-in-from-top duration-300">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Specify your language/technology:
                        </label>
                        <input
                          type="text"
                          value={onboardingData.otherLanguage}
                          onChange={(e) => setOnboardingData({ ...onboardingData, otherLanguage: e.target.value })}
                          placeholder="e.g., Go, Rust, PHP, etc."
                          className="w-full px-4 py-3 border-2 border-gray-200  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Study Schedule */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        When do you prefer to learn?
                      </h2>
                      <p className="text-sm text-gray-500">Choose your ideal study time</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: "morning", label: "Morning Coder", desc: "6 AM - 12 PM", icon: Sunrise, gradient: "from-yellow-400 to-orange-500" },
                        { id: "afternoon", label: "Afternoon Learner", desc: "12 PM - 6 PM", icon: Coffee, gradient: "from-orange-400 to-red-500" },
                        { id: "evening", label: "Evening Developer", desc: "6 PM - 10 PM", icon: Sunset, gradient: "from-purple-400 to-pink-500" },
                        { id: "night", label: "Night Owl", desc: "10 PM - 2 AM", icon: Moon, gradient: "from-indigo-500 to-purple-600" },
                      ].map((schedule) => (
                        <button
                          key={schedule.id}
                          onClick={() => selectSchedule(schedule.id)}
                          className={`group p-8  border-2 transition-all duration-300 hover:shadow-lg ${
                            onboardingData.studySchedule === schedule.id
                              ? "border-indigo-600 bg-indigo-50 shadow-md"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              onboardingData.studySchedule === schedule.id
                                ? `bg-gradient-to-br ${schedule.gradient}`
                                : "bg-gray-100 group-hover:bg-gray-200"
                            }`}>
                              <schedule.icon className={`w-8 h-8 ${
                                onboardingData.studySchedule === schedule.id ? "text-white" : "text-gray-600"
                              }`} />
                            </div>
                            <div className="text-left flex-1">
                              <p className="font-bold text-gray-900 text-lg">{schedule.label}</p>
                              <p className="text-sm text-gray-500 mt-1">{schedule.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: How You Found Us */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        How did you hear about Coding Jojo?
                      </h2>
                      <p className="text-sm text-gray-500">Help us understand where our learners come from</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "search", label: "Search Engine", desc: "Google, Bing, etc.", icon: Search, gradient: "from-red-500 to-orange-500" },
                        { id: "social", label: "Social Media", desc: "Facebook, Twitter, etc.", icon: Share2, gradient: "from-blue-500 to-cyan-500" },
                        { id: "friend", label: "Friend/Colleague", desc: "Word of mouth", icon: Users, gradient: "from-purple-500 to-pink-500" },
                        { id: "ad", label: "Advertisement", desc: "Online ads", icon: Megaphone, gradient: "from-yellow-500 to-orange-500" },
                        { id: "blog", label: "Blog/Article", desc: "Tech blogs", icon: FileText, gradient: "from-green-500 to-teal-500" },
                        { id: "other", label: "Other", desc: "Something else", icon: MoreHorizontal, gradient: "from-gray-500 to-gray-700" },
                      ].map((source) => (
                        <button
                          key={source.id}
                          onClick={() => selectHearAbout(source.id)}
                          className={`group p-6  border-2 transition-all duration-300 hover:shadow-lg ${
                            onboardingData.hearAbout === source.id
                              ? "border-indigo-600 bg-indigo-50 shadow-md"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-3">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                              onboardingData.hearAbout === source.id
                                ? `bg-gradient-to-br ${source.gradient}`
                                : "bg-gray-100 group-hover:bg-gray-200"
                            }`}>
                              <source.icon className={`w-7 h-7 ${
                                onboardingData.hearAbout === source.id ? "text-white" : "text-gray-600"
                              }`} />
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-gray-900">{source.label}</p>
                              <p className="text-xs text-gray-500 mt-1">{source.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className={`px-6 py-3  border-2 font-semibold transition-all flex items-center space-x-2 ${
                      currentStep === 1
                        ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <span>&lt; Last Question</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`px-8 py-3  font-semibold transition-all flex items-center space-x-2 ${
                      canProceed()
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span>{currentStep === 5 ? "Complete Setup" : "Next Question >"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
