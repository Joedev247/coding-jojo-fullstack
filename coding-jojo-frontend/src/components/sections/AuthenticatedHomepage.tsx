import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  Play,
  Users,
  Calendar,
  Award,
  MessageCircle,
  Code,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Brain,
  Zap,
  Star,
  CheckCircle,
  User,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import FeaturedCoursesSection from "./featured-courses";
import AnimatedBackground from "../ui/AnimatedBackground";
import Navbar from "../Navbar";
import Footer from "../Footer";
import PopularTopics from "./popular-topics";
import PricingPlans from "./pricing-plans";
import FAQSection from "./FAQs";
import TestimonialSection from "./testimonial-cards";
import LoadingSpinner from "../ui/LoadingSpinner";

// Types
interface UserStats {
  coursesCompleted: number;
  coursesInProgress: number;
  totalHours: number;
  avgScore: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

interface Update {
  id: string;
  type: "announcement" | "achievement" | "course" | "community";
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const tips = [
  "Set a daily learning goal for consistency.",
  "Join the community forums for help and networking.",
  "Track your progress and celebrate small wins!",
  "Experiment with code in the playground below.",
  "Check out the latest featured courses.",
];

export default function AuthenticatedHomepage({ searchParams, router }: { searchParams: ReturnType<typeof import('next/navigation').useSearchParams>, router: ReturnType<typeof import('next/navigation').useRouter> }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { success } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCodeLanguage, setActiveCodeLanguage] = useState<
    "javascript" | "python" | "html"
  >("javascript");
  const [codeContent, setCodeContent] = useState("");
  const [showTip, setShowTip] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug logging for authentication state
  useEffect(() => {
    if (mounted) {
      console.log("AuthenticatedHomepage - Current auth state:", {
        isAuthenticated,
        isLoading,
        hasUser: !!user,
        userEmail: user?.email,
        userName: user?.name,
      });
    }
  }, [mounted, isAuthenticated, isLoading, user]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isLoading, isAuthenticated, router]);

  // Update time for dynamic greeting
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  // Tip rotator
  useEffect(() => {
    const tipTimer = setInterval(
      () => setShowTip((prev) => (prev + 1) % tips.length),
      7000
    );
    return () => clearInterval(tipTimer);
  }, []);

  // Handle welcome message for new OAuth users
  useEffect(() => {
    if (
      mounted &&
      isAuthenticated &&
      user &&
      searchParams.get("welcome") === "true"
    ) {
      const welcomeMessage =
        (user as any).authProvider === "google"
          ? `Welcome to CodingJojo! Your Google account has been successfully connected.`
          : `Welcome to CodingJojo! You're now logged in and ready to start learning.`;

      success(welcomeMessage, {
        duration: 6000,
        description: `Hi ${user.name}! Explore our courses and start your coding journey.`,
      });

      // Remove the welcome parameter from URL without triggering a page reload
      const url = new URL(window.location.href);
      url.searchParams.delete("welcome");
      window.history.replaceState({}, "", url.toString());
    }
  }, [mounted, isAuthenticated, user, searchParams, success]);

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }; // Calculate real user stats from user data
  const userStats: UserStats = {
    coursesCompleted: 0, // Will be calculated from course completion data when available
    coursesInProgress: user?.enrolledCourses?.length || 0,
    totalHours: 0, // Will be calculated from learning analytics when available
    avgScore: 0, // Will be calculated from course scores when available
  };
  // Quick actions
  const quickActions: QuickAction[] = [
    {
      id: "dashboard",
      title: "My Dashboard",
      description: "Access your learning dashboard",
      icon: <Target className="h-6 w-6" />,
      href: "/dashboard",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "continue-learning",
      title: "Continue Learning",
      description: "Resume where you left off",
      icon: <Play className="h-6 w-6" />,
      href: "/dashboard/courses",
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "track-progress",
      title: "Track Progress",
      description: "View your achievements",
      icon: <TrendingUp className="h-6 w-6" />,
      href: "/dashboard/analytics",
      color: "from-green-500 to-blue-500",
    },
    {
      id: "schedule",
      title: "Schedule",
      description: "Manage your learning time",
      icon: <Calendar className="h-6 w-6" />,
      href: "/dashboard/schedule",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "certificates",
      title: "Certificates",
      description: "View your achievements",
      icon: <Award className="h-6 w-6" />,
      href: "/dashboard/certifications",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "community",
      title: "Community",
      description: "Connect with learners",
      icon: <Users className="h-6 w-6" />,
      href: "/community",
      color: "from-pink-500 to-purple-500",
    },
  ];

  // Sample code for different languages
  const codeSnippets = {
    javascript: `// Welcome to JavaScript!
function greetUser(name) {
  return \`Hello, \${name}! Ready to code?\`;
}

const message = greetUser('${user?.name || "Developer"}');
console.log(message);

// Try modifying this code!`,
    python: `# Welcome to Python!
def greet_user(name):
    return f"Hello, {name}! Ready to code?"

message = greet_user('${user?.name || "Developer"}')
print(message)

# Try modifying this code!`,
    html: `<!-- Welcome to HTML! -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome ${user?.name || "Developer"}</title>
</head>
<body>
    <h1>Hello, ${user?.name || "Developer"}!</h1>
    <p>Ready to build amazing websites?</p>
</body>
</html>`,
  };

  // Latest updates
  const latestUpdates: Update[] = [
    {
      id: "1",
      type: "course",
      title: "New React 18 Course Available",
      description: "Master the latest React features with hands-on projects",
      time: "2 hours ago",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "2",
      type: "achievement",
      title: "Congratulations! JavaScript Badge Earned",
      description: "You've completed all JavaScript fundamentals",
      time: "1 day ago",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      id: "3",
      type: "community",
      title: "New Discussion: Best Practices",
      description: "Join the conversation about clean code practices",
      time: "2 days ago",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    {
      id: "4",
      type: "announcement",
      title: "Live Coding Session Tomorrow",
      description: "Join our instructor for a live React workshop",
      time: "3 days ago",
      icon: <Calendar className="h-4 w-4" />,
    },
  ];
  useEffect(() => {
    setCodeContent(codeSnippets[activeCodeLanguage]);
  }, [activeCodeLanguage, user?.name]);

  // Show loading spinner while authentication is being checked
  if (!mounted || isLoading) {
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

  // Don't render anything if not authenticated (will be redirected)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/50 shadow-2xl shadow-purple-900/10 backdrop-blur-lg p-8 pb-12 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-purple-500/30 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/40 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="block w-12 h-12 rounded-full border-2 border-purple-400 bg-gradient-to-br from-purple-600 via-pink-600 to-pink-400 flex items-center justify-center shadow-lg">
                      <User className="h-7 w-7 text-white" />
                    </span>
                    <span className="font-semibold text-lg text-purple-200">
                      Welcome back!
                    </span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow">
                    {getGreeting()},{" "}
                    <span className="bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text">
                      {user?.name || "Developer"}
                    </span>
                    !
                    <Sparkles className="inline-block ml-2 h-8 w-8 text-yellow-400 animate-bounce" />
                  </h1>
                  <p className="text-xl text-gray-300 mb-2">
                    Ready to continue your coding journey?
                  </p>
                  <div className="text-sm text-pink-200/90 italic flex items-center gap-2 animate-fade-in-down">
                    <Star className="h-4 w-4 text-yellow-300" />
                    <span>{tips[showTip]}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 hidden lg:block relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-400 via-pink-500 to-yellow-400 flex items-center justify-center shadow-2xl shadow-pink-900/20 border-4 border-white/10 animate-spin-slow">
                    <Brain className="h-16 w-16 text-white drop-shadow" />
                  </div>
                  <div className="absolute bottom-0 -right-4 flex flex-col items-center space-y-2">
                    <span className="inline-flex px-4 py-1 bg-white/20 text-xs  text-white font-semibold uppercase tracking-wider">
                      Elite Learner
                    </span>
                  </div>
                </div>
              </div>
              {/* User Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                <div className="bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center hover:scale-[1.04] transition-all shadow-md shadow-purple-500/10">
                  <CheckCircle className="h-8 w-8 text-green-400 mb-1" />
                  <p className="text-gray-300 text-xs">Completed</p>
                  <p className="text-2xl font-bold text-white">
                    {userStats.coursesCompleted}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center hover:scale-[1.04] transition-all shadow-md shadow-blue-500/10">
                  <Clock className="h-8 w-8 text-blue-400 mb-1" />
                  <p className="text-gray-300 text-xs">In Progress</p>
                  <p className="text-2xl font-bold text-white">
                    {userStats.coursesInProgress}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center hover:scale-[1.04] transition-all shadow-md shadow-purple-500/10">
                  <Target className="h-8 w-8 text-purple-400 mb-1" />
                  <p className="text-gray-300 text-xs">Hours Learned</p>
                  <p className="text-2xl font-bold text-white">
                    {userStats.totalHours}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center hover:scale-[1.04] transition-all shadow-md shadow-yellow-500/10">
                  <Star className="h-8 w-8 text-yellow-400 mb-1" />
                  <p className="text-gray-300 text-xs">Avg Score</p>
                  <p className="text-2xl font-bold text-white">
                    {userStats.avgScore}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Zap className="h-8 w-8 text-yellow-400 mr-3" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {quickActions.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  className="group bg-white/5 backdrop-blur-sm p-7 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-purple-500/5"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{action.description}</p>
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-medium">Get Started</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Code Editor Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm overflow-hidden shadow-lg shadow-purple-900/10">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-semibold text-white flex items-center mb-2 sm:mb-0">
                    <Code className="h-6 w-6 text-purple-400 mr-2" />
                    Try It Yourself - Code Playground
                  </h3>
                  <div className="flex space-x-2">
                    {Object.keys(codeSnippets).map((lang) => (
                      <button
                        key={lang}
                        onClick={() =>
                          setActiveCodeLanguage(
                            lang as "javascript" | "python" | "html"
                          )
                        }
                        className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${activeCodeLanguage === lang
                            ? "bg-purple-600 text-white shadow"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="  bg-gray-900 p-4 font-mono text-sm border border-purple-800/20 shadow-lg">
                    <textarea
                      value={codeContent}
                      onChange={(e) => setCodeContent(e.target.value)}
                      className="w-full h-64 bg-transparent text-green-400 resize-none focus:outline-none"
                      placeholder="Start coding..."
                      spellCheck={false}
                    />
                  </div>
                  <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center shadow-lg hover:scale-105">
                    <Play className="h-4 w-4 mr-2" />
                    Run Code
                  </button>
                </div>
                <div className="bg-gradient-to-r from-yellow-500/10 via-pink-500/10 to-purple-600/10 py-2 px-4 border-t border-purple-500/10 text-xs text-purple-200 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  Code Playground: Experiment, learn, and have fun!
                </div>
              </div>
            </div>

            {/* Latest Updates */}
            <div className="bg-white/5 backdrop-blur-sm p-2 shadow-lg shadow-purple-900/15">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
                Latest Updates
              </h3>
              <div className="space-y-4">
                {latestUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="bg-white/5 p-4 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-start gap-3 shadow-md hover:shadow-lg"
                  >
                    <div
                      className={`p-2 ${update.type === "course"
                          ? "bg-blue-500/20 text-blue-400"
                          : update.type === "achievement"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : update.type === "community"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-purple-500/20 text-purple-400"
                        }`}
                    >
                      {update.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm mb-1">
                        {update.title}
                      </h4>
                      <p className="text-gray-400 text-xs mb-2">
                        {update.description}
                      </p>
                      <p className="text-gray-500 text-xs">{update.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Courses Section */}
          <div>
            <FeaturedCoursesSection />
          </div>
          <div>
            <PopularTopics />
          </div>
          <div>
            <PricingPlans />
          </div>
          <div>
            <FAQSection />
          </div>
          <div>
            <TestimonialSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
