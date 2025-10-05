"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "./useToast";
import {
  dashboardService,
  DashboardData,
  UserStats,
  CourseProgress,
  Achievement,
} from "../lib/dashboardService";

// Re-export types for backward compatibility
export type {
  UserStats,
  CourseProgress,
  Achievement,
  DashboardData,
};

export function useDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setIsLoading(false);
      return;
    }

    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await dashboardService.getDashboardData();

        if (response.success) {
          setDashboardData(response.data ?? null);
        } else {
          setError("Failed to load dashboard data");
          toast.error(
            "Failed to load dashboard data. Please refresh the page."
          );
        }
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load dashboard data";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Dashboard data loading error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user, isAuthenticated]); // Removed toast from dependencies

  const refetch = async () => {
    if (isAuthenticated && user) {
      setIsLoading(true);
      try {
        const response = await dashboardService.getDashboardData();
        if (response.success) {
          setDashboardData(response.data ?? null);
          setError(null);
        } else {
          setError("Failed to reload dashboard data");
        }
      } catch (err: any) {
        setError(err.message || "Failed to reload dashboard data");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Specific data fetchers
  const updateProgress = async (courseId: string, progress: number) => {
    try {
      const response = await dashboardService.getDashboardData();
      if (response.success) {
        setDashboardData(response.data ?? null);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to update progress:", err);
      return false;
    }
  };

  const markNotificationRead = async (notificationId: string) => {
    try {
      // TODO: Implement markNotificationRead in dashboardService
      // await dashboardService.markNotificationRead(notificationId);

      // Update local state
      setDashboardData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          notifications: prev.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          ),
        };
      });
      return true;
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      return false;
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      // If the API does not support marking all as read, update local state only
      setDashboardData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          notifications: prev.notifications.map((notification) => ({
            ...notification,
            isRead: true,
          })),
        };
      });
      return true;
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      return false;
    }
  };

  return {
    dashboardData,
    isLoading,
    error,
    refetch,
    updateProgress,
    markNotificationRead,
    markAllNotificationsRead,
  };
}
