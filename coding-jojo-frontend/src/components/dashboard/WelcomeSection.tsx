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
      <div className="relative mb-8 p-8   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 "></div>
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
    <div className="relative mb-8 p-8   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-orange-500/5"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Welcome Message */}{" "}
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="relative">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name || "User"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl border-2 border-gray-700">
                  {getUserInitials(user?.name || user?.email || "User")}
                </div>
              )}
              {user?.isPremium && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                {greeting},{" "}
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  {(user?.name || user?.email || "User").split(" ")[0]}
                </span>
                ! {greetingEmoji}
              </h2>
              <p className="text-gray-400 text-lg">
                Ready to continue your coding journey?
              </p>

              {/* Learning Streak */}
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-pink-300 px-4 py-2 rounded-full border border-pink-500/30">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  <span className="font-semibold">
                    {learningStreak} day streak
                  </span>
                </div>
                {user?.isPremium && (
                  <div className="flex items-center bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-pink-300 px-4 py-2 rounded-full border border-pink-500/30">
                    <Star className="h-4 w-4 mr-2 text-yellow-400" />
                    <span className="font-medium text-sm">Premium Member</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
            {/* Active Courses */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-4 text-center hover:border-pink-500/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Active</h3>
              <p className="text-2xl font-bold text-white mt-1">
                {activeCourses}
              </p>
              <p className="text-xs text-gray-500">courses</p>
            </div>

            {/* Completed Courses */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-4 text-center hover:border-pink-500/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Completed</h3>
              <p className="text-2xl font-bold text-white mt-1">
                {completedCourses}
              </p>
              <p className="text-xs text-gray-500">courses</p>
            </div>

            {/* Learning Hours */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-4 text-center hover:border-pink-500/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Hours</h3>
              <p className="text-2xl font-bold text-white mt-1">
                {totalHoursLearned}
              </p>
              <p className="text-xs text-gray-500">learned</p>
            </div>

            {/* Certificates */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-4 text-center hover:border-pink-500/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">
                Certificates
              </h3>
              <p className="text-2xl font-bold text-white mt-1">
                {certificatesEarned}
              </p>
              <p className="text-xs text-gray-500">earned</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Overall Progress</span>
            <span>
              {Math.round((completedCourses / totalCourses) * 100) || 0}%
              Complete
            </span>
          </div>
          <div className="w-full h-2  bg-gray-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-500"
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
