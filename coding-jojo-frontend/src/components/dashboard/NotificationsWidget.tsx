import React from "react";
import { Bell, Info, AlertCircle, CheckCircle, X } from "lucide-react";
import { Notification } from "@/types/dashboard";

interface NotificationsWidgetProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const NotificationsWidget: React.FC<NotificationsWidgetProps> = ({
  notifications,
  onMarkAsRead,
  onDismiss,
}) => {
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const recentNotifications = notifications.slice(0, 5);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const getNotificationBorderColor = (type: string) => {
    switch (type) {
      case "info":
        return "border-blue-500/30";
      case "warning":
        return "border-yellow-500/30";
      case "success":
        return "border-green-500/30";
      case "error":
        return "border-red-500/30";
      default:
        return "border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Bell className="h-5 w-5 text-pink-400" />
          Notifications
          {unreadNotifications.length > 0 && (
            <span className="ml-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadNotifications.length}
            </span>
          )}
        </h3>
        {unreadNotifications.length > 0 && (
          <button className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
            Mark all read
          </button>
        )}
      </div>

      {recentNotifications.length === 0 ? (
        <div className="text-center py-8">
          <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No notifications</p>
          <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`relative flex items-start gap-3 p-4  bg-gray-900/60 backdrop-blur-sm border ${getNotificationBorderColor(
                notification.type
              )}  hover:border-pink-500/30 transition-all duration-300 group ${
                !notification.isRead ? "ring-1 ring-pink-500/20" : ""
              }`}
            >
              {/* Unread indicator */}
              {!notification.isRead && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></div>
              )}

              {/* Icon */}
              <div className="flex-shrink-0 p-2 bg-gray-700/50 ">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-1 truncate">
                  {notification.title}
                </h4>
                <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {formatDate(notification.createdAt)}
                  </p>
                  <div className="flex items-center gap-2">
                    {!notification.isRead && onMarkAsRead && (
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-xs text-pink-400 hover:text-pink-300 transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                    {onDismiss && (
                      <button
                        onClick={() => onDismiss(notification.id)}
                        className="text-gray-500 hover:text-gray-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {notifications.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsWidget;
