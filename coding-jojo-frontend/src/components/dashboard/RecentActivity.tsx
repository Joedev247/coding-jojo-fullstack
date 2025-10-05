import React from "react";
import {
  BookOpen,
  CheckCircle,
  Award,
  Trophy,
  Clock,
  Play,
  FileText,
  Zap,
} from "lucide-react";

interface RecentActivity {
  id: string;
  type:
    | "course_started"
    | "lesson_completed"
    | "quiz_passed"
    | "certificate_earned"
    | "achievement_unlocked";
  title: string;
  description: string;
  timestamp: string;
  courseId?: string;
  points?: number;
}

interface RecentActivityProps {
  activities: RecentActivity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_started":
        return <Play className="h-5 w-5 text-blue-400" />;
      case "lesson_completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "quiz_passed":
        return <FileText className="h-5 w-5 text-purple-400" />;
      case "certificate_earned":
        return <Award className="h-5 w-5 text-yellow-400" />;
      case "achievement_unlocked":
        return <Trophy className="h-5 w-5 text-orange-400" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-400" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "course_started":
        return "bg-blue-500/10 border-blue-500/20";
      case "lesson_completed":
        return "bg-green-500/10 border-green-500/20";
      case "quiz_passed":
        return "bg-purple-500/10 border-purple-500/20";
      case "certificate_earned":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "achievement_unlocked":
        return "bg-orange-500/10 border-orange-500/20";
      default:
        return "bg-gray-500/10 border-gray-500/20";
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMs = now.getTime() - activityTime.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return activityTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (activities.length === 0) {
    return (
      <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-pink-400" />
          Recent Activity
        </h3>
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No recent activity</p>
          <p className="text-sm text-gray-500 mt-1">
            Start learning to see your progress here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-pink-500/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Clock className="h-5 w-5 text-pink-400" />
        Recent Activity
      </h3>

      <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start gap-4 p-4  border ${getActivityColor(
              activity.type
            )} hover:bg-gray-800/30 transition-all duration-200`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 p-2 rounded-full  bg-gray-900/50">
              {getActivityIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium text-white text-sm truncate">
                  {activity.title}
                </h4>
                {activity.points && (
                  <div className="flex items-center gap-1 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full flex-shrink-0">
                    <Zap className="h-3 w-3" />+{activity.points}
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-400 mt-1">
                {activity.description}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <button className="text-sm text-pink-400 hover:text-pink-300 transition-colors w-full text-center">
            View All Activity
          </button>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #1f2937;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #f97316);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #ea580c);
        }
      `}</style>
    </div>
  );
};

export default RecentActivity;
