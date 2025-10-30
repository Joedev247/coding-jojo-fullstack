import React from "react";
import { Trophy, Award, Star, Target, Zap, BookOpen } from "lucide-react";
import { Achievement } from "../../types/dashboard";

interface AchievementsWidgetProps {
  achievements: Achievement[];
  showAll?: boolean;
}

const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({
  achievements,
  showAll = false,
}) => {
  const recentAchievements = showAll ? achievements : achievements.slice(0, 4);

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case "award":
        return <Award className="h-6 w-6 text-blue-400" />;
      case "star":
        return <Star className="h-6 w-6 text-pink-400" />;
      case "target":
        return <Target className="h-6 w-6 text-blue-400" />;
      case "zap":
        return <Zap className="h-6 w-6 text-orange-400" />;
      case "book":
        return <BookOpen className="h-6 w-6 text-purple-400" />;
      default:
        return <Award className="h-6 w-6 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Recent Achievements
        </h3>
        {!showAll && achievements.length > 4 && (
          <button className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
            View All
          </button>
        )}
      </div>

      {recentAchievements.length === 0 ? (
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No achievements yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Complete courses to earn your first achievement!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center gap-4 p-4  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50  hover:border-pink-500/30 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 p-2 bg-gray-700/50  group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-orange-500/20 transition-all duration-300">
                {getAchievementIcon(achievement.icon)}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-1 truncate">
                  {achievement.title}
                </h4>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {achievement.description}
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-gray-500">
                  {formatDate(achievement.unlockedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementsWidget;
