// components/dashboard/OverviewContent.tsx
import React from "react";
import Image from "next/image";
import { Users, DollarSign, TrendingUp, Star, User } from "lucide-react";
import StatCard from "../ui/StatCard";
import { Stats } from "../../types/admin";

interface OverviewContentProps {
  stats?: Stats | null;
}

const OverviewContent: React.FC<OverviewContentProps> = ({ stats }) => {
  // Provide default values for all stats properties to prevent undefined errors
  const safeStats = {
    totalStudents: stats?.totalStudents || 0,
    totalCourses: stats?.totalCourses || 0,
    totalRevenue: stats?.totalRevenue || 0,
    activeUsers: stats?.activeUsers || 0,
    newUsers: {
      count: stats?.newUsers?.count || "0",
      percentChange: stats?.newUsers?.percentChange || 0,
    },
    revenue: {
      count: stats?.revenue?.count || 0,
      percentChange: stats?.revenue?.percentChange || 0,
    },
    completionRate: {
      count: stats?.completionRate?.count || 0,
    },
    engagementRate: {
      count: stats?.engagementRate?.count || 0,
    },
    monthlySales: stats?.monthlySales || [],
    categoryDistribution: stats?.categoryDistribution || [],
    recentActivity: stats?.recentActivity || [],
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Students"
          value={safeStats.totalStudents.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Total Revenue"
          value={`$${safeStats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatCard
          title="New Users"
          value={safeStats.newUsers.count}
          icon={<User className="h-6 w-6" />}
          change={safeStats.newUsers.percentChange}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${safeStats.revenue.count.toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6" />}
          change={safeStats.revenue.percentChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2   bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:shadow-lg transition duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Monthly Revenue
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className="flex items-center text-gray-400">
                <span className="inline-block w-3 h-3 bg-pink-500 rounded-full mr-1"></span>
                2025
              </span>
            </div>
          </div>
          <div className="h-64 relative">
            {/* This would be where your chart goes */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Chart placeholder - Revenue chart would render here
            </div>
          </div>
        </div>

        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:shadow-lg transition duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Course Categories
            </h3>
          </div>
          <div className="h-64 relative">
            {/* This would be where your chart goes */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Chart placeholder - Category distribution would render here
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2   bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300 overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Recent Activity
            </h3>
          </div>{" "}
          <div className="divide-y divide-gray-800">
            {safeStats.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 relative mr-3">
                    <Image
                      src={activity.avatar}
                      alt={activity.user}
                      fill
                      className="rounded-full object-cover border border-gray-700"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-white">
                        {activity.user}
                      </span>{" "}
                      {activity.action}{" "}
                      <span className="text-pink-400">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="  bg-gray-900/70 p-3 border-t border-gray-800">
            <button className="text-pink-400 hover:text-pink-300 text-sm font-medium w-full text-center">
              View All Activity
            </button>
          </div>
        </div>

        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Platform Stats
            </h3>
          </div>{" "}
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Courses</span>
              <span className="text-white font-medium">
                {safeStats.totalCourses}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Users</span>
              <span className="text-white font-medium">
                {safeStats.activeUsers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Completion Rate</span>
              <span className="text-white font-medium">
                {safeStats.completionRate.count}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Engagement Rate</span>
              <span className="text-white font-medium">
                {safeStats.engagementRate.count}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Avg. Course Rating</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-white font-medium">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewContent;
