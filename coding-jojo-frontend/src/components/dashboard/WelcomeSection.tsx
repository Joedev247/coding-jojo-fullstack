import React from "react";
import { Zap, Award, Clock, Target, TrendingUp, Star } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../hooks/useDashboard";

const WelcomeSection: React.FC = () => {
  const { user } = useAuth();
  const { dashboardData, isLoading } = useDashboard();

  // Get current time to personalize greeting
  const currentHour = new Date().getHours();
  let greeting = "Good evening";
  let greetingEmoji = "🌙";

  if (currentHour < 12) {
    greeting = "Good morning";
    greetingEmoji = "☀️";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
    greetingEmoji = "🌤️";
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading || !dashboardData) {
    return (
      <div className="relative mb-6 p-6 bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm overflow-hidden">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-300 "></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const stats = dashboardData?.stats || {
    coursesInProgress: 0,
    coursesCompleted: 0,
    totalHoursLearned: 0,
    certificatesEarned: 0,
  };

  const {
    coursesInProgress: activeCourses,
    coursesCompleted: completedCourses,
    totalHoursLearned,
    certificatesEarned,
  } = stats;

  const totalCourses = dashboardData?.enrolledCourses?.length || 0;
  const learningStreak =
    dashboardData?.quickStats?.weeklyProgress?.streakDays || 1;

  return (
    <div className="relative mb-6 p-6 bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-blue-100/30"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Welcome Message */}
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="relative">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name || "User"}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg border-2 border-blue-200">
                  {getUserInitials(user?.name || user?.email || "User")}
                </div>
              )}
              {user?.isPremium && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {greeting},{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  {(user?.name || user?.email || "User").split(" ")[0]}
                </span>
                ! {greetingEmoji}
              </h2>
              <p className="text-gray-600">
                Ready to continue your coding journey?
              </p>

              {/* Learning Streak */}
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                  <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                  <span className="font-semibold text-sm">
                    {learningStreak} day streak
                  </span>
                </div>
                {user?.isPremium && (
                  <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="font-medium text-sm">Premium Member</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto">
            {/* Active Courses */}
            <div className="bg-blue-50 border border-blue-200  p-3 text-center hover:border-blue-300 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Active</h3>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {activeCourses}
              </p>
              <p className="text-xs text-gray-500">courses</p>
            </div>

            {/* Completed Courses */}
            <div className="bg-blue-50 border border-blue-200  p-3 text-center hover:border-blue-300 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Completed</h3>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {completedCourses}
              </p>
              <p className="text-xs text-gray-500">courses</p>
            </div>

            {/* Learning Hours */}
            <div className="bg-blue-50 border border-blue-200  p-3 text-center hover:border-blue-300 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Hours</h3>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {totalHoursLearned}
              </p>
              <p className="text-xs text-gray-500">learned</p>
            </div>

            {/* Certificates */}
            <div className="bg-blue-50 border border-blue-200  p-3 text-center hover:border-blue-300 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">
                Certificates
              </h3>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {certificatesEarned}
              </p>
              <p className="text-xs text-gray-500">earned</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>
              {Math.round((completedCourses / totalCourses) * 100) || 0}%
              Complete
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-600 transition-all duration-500 rounded-full"
              style={{
                width: `${
                  Math.round((completedCourses / totalCourses) * 100) || 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
