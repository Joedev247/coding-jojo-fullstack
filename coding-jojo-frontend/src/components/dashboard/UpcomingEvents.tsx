import React from "react";
import { Calendar, Clock, Video, FileText } from "lucide-react";
import Badge from "../ui/Badge";

interface Event {
  id: string;
  title: string;
  type: "live-session" | "assignment" | "quiz" | "deadline";
  date: string;
  time: string;
  course: string;
  isImportant: boolean;
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "live-session":
        return <Video className="h-5 w-5 text-blue-400" />;
      case "assignment":
        return <FileText className="h-5 w-5 text-yellow-400" />;
      case "quiz":
        return <FileText className="h-5 w-5 text-pink-400" />;
      case "deadline":
        return <Clock className="h-5 w-5 text-red-400" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-400" />;
    }
  };

  const getEventBadge = (type: string) => {
    switch (type) {
      case "live-session":
        return <Badge>Live Session</Badge>;
      case "assignment":
        return <Badge variant="warning">Assignment</Badge>;
      case "quiz":
        return <Badge>Quiz</Badge>;
      case "deadline":
        return <Badge variant="warning">Deadline</Badge>;
      default:
        return <Badge>Event</Badge>;
    }
  };

  return (
    <div className="mb-8 p-6  bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
        <div className="text-sm text-gray-400 hover:text-white cursor-pointer">
          View Calendar
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`p-3 flex items-start space-x-4 transition-all duration-300
              ${
                event.isImportant
                  ? "bg-purple-900/20"
                  : "bg-gray-800/30 hover:bg-gray-800/50"
              }
            `}
          >
            <div className="p-2  bg-gray-900">{getEventIcon(event.type)}</div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h3 className="text-sm font-medium text-white line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{event.course}</p>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center">
                  {getEventBadge(event.type)}
                </div>
              </div>

              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
