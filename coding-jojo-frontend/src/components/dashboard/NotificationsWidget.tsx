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
        return <Info className="h-4 w-4 text-blue-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationBorderColor = (type: string) => {
    switch (type) {
      case "info":
        return "border-blue-200";
      case "warning":
        return "border-yellow-200";
      case "success":
        return "border-blue-200";
      case "error":
        return "border-red-200";
      default:
        return "border-gray-200";
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
    <div className="bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-600" />
          Notifications
          {unreadNotifications.length > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadNotifications.length}
            </span>
          )}
        </h3>
        {unreadNotifications.length > 0 && (
          <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
            Mark all read
          </button>
        )}
      </div>

      {recentNotifications.length === 0 ? (
        <div className="text-center py-6">
          <Bell className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No notifications</p>
          <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`relative flex items-start gap-3 p-3 bg-blue-50 border ${getNotificationBorderColor(
                notification.type
              )}  hover:border-blue-300 transition-all duration-300 group ${
                !notification.isRead ? "ring-1 ring-blue-200" : ""
              }`}
            >
              {/* Unread indicator */}
              {!notification.isRead && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
              )}

              {/* Icon */}
              <div className="flex-shrink-0 p-2 bg-white ">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-900 font-medium mb-1 truncate text-sm">
                  {notification.title}
                </h4>
                <p className="text-gray-600 text-xs line-clamp-2 mb-2">
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
                        className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                    {onDismiss && (
                      <button
                        onClick={() => onDismiss(notification.id)}
                        className="text-gray-500 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
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
        <div className="mt-3 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsWidget;
