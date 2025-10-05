"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Video,
  Building,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { communityService } from "../../services/communityService";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";

interface Event {
  _id: string;
  title: string;
  description: string;
  type: "workshop" | "meetup" | "competition" | "announcement" | "webinar";
  startDate: string;
  endDate?: string;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  maxAttendees?: number;
  currentAttendees: number;
  organizer: {
    _id: string;
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  isAttending?: boolean;
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (event: Event) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onEventCreated,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "workshop",
    startDate: "",
    endDate: "",
    location: "",
    isVirtual: false,
    meetingLink: "",
    maxAttendees: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventData = {
        ...formData,
        maxAttendees: formData.maxAttendees
          ? parseInt(formData.maxAttendees)
          : undefined,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      const response = (await communityService.createEvent(eventData)) as any;

      if (response.success) {
        onEventCreated(response.data);
        toast.success("Success", {
          description: "Event created successfully!",
        });
        onClose();
        setFormData({
          title: "",
          description: "",
          type: "workshop",
          startDate: "",
          endDate: "",
          location: "",
          isVirtual: false,
          meetingLink: "",
          maxAttendees: "",
          tags: "",
        });
      }
    } catch (error) {
      toast.error("Error", { description: "Failed to create event" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="  bg-gray-900 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Create New Event</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="workshop">Workshop</option>
                  <option value="meetup">Meetup</option>
                  <option value="webinar">Webinar</option>
                  <option value="competition">Competition</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Attendees
                </label>
                <input
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) =>
                    setFormData({ ...formData, maxAttendees: e.target.value })
                  }
                  className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={formData.isVirtual}
                onChange={(e) =>
                  setFormData({ ...formData, isVirtual: e.target.checked })
                }
                className="mr-2"
              />
              <label className="text-sm text-gray-300">Virtual Event</label>
            </div>

            {formData.isVirtual ? (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meeting Link
                </label>
                <input
                  type="url"
                  value={formData.meetingLink}
                  onChange={(e) =>
                    setFormData({ ...formData, meetingLink: e.target.value })
                  }
                  className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://meet.example.com/..."
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter venue address"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full  bg-gray-900 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="javascript, workshop, beginner"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition duration-200 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const EventCard: React.FC<{
  event: Event;
  onAttendanceChange: (eventId: string, isAttending: boolean) => void;
}> = ({ event, onAttendanceChange }) => {
  const [isAttending, setIsAttending] = useState(event.isAttending || false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleAttendance = async () => {
    setLoading(true);
    try {
      const response = (await communityService.attendEvent(event._id)) as any;
      if (response.success) {
        const newAttending = response.data.isAttending;
        setIsAttending(newAttending);
        onAttendanceChange(event._id, newAttending);
        toast.success("Success", {
          description: newAttending
            ? "Successfully registered for event!"
            : "Successfully unregistered from event!",
        });
      }
    } catch (error) {
      toast.error("Error", { description: "Failed to update attendance" });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      workshop: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      meetup: "bg-green-500/20 text-green-400 border-green-500/30",
      webinar: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      competition: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      announcement: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[type as keyof typeof colors] || colors.workshop;
  };

  return (
    <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-6 hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                event.type
              )}`}
            >
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
            {event.status === "upcoming" && (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                Upcoming
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-300 text-sm">
          <Calendar className="w-4 h-4 mr-2 text-purple-400" />
          <span>{formatDate(event.startDate)}</span>
          {event.endDate && (
            <span className="text-gray-500 ml-2">
              - {formatDate(event.endDate)}
            </span>
          )}
        </div>

        <div className="flex items-center text-gray-300 text-sm">
          {event.isVirtual ? (
            <Video className="w-4 h-4 mr-2 text-green-400" />
          ) : (
            <Building className="w-4 h-4 mr-2 text-blue-400" />
          )}
          <span>
            {event.isVirtual ? "Virtual Event" : event.location || "TBA"}
          </span>
          {event.isVirtual && event.meetingLink && (
            <a
              href={event.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-purple-400 hover:text-purple-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex items-center text-gray-300 text-sm">
          <Users className="w-4 h-4 mr-2 text-orange-400" />
          <span>
            {event.currentAttendees} attending
            {event.maxAttendees && ` • ${event.maxAttendees} max`}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={event.organizer.avatar}
            alt={event.organizer.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-white">
              {event.organizer.name}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {event.organizer.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleAttendance}
          disabled={loading}
          className={`px-4 py-2 font-medium transition duration-200 disabled:opacity-50 ${
            isAttending
              ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          }`}
        >
          {loading ? "..." : isAttending ? "Unregister" : "Register"}
        </button>
      </div>

      {event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1  bg-gray-900 text-gray-300  text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

interface EventsSectionProps {
  isAdmin?: boolean;
}

const EventsSection: React.FC<EventsSectionProps> = ({ isAdmin = false }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const filters = filter === "all" ? {} : { type: filter };
      const response = (await communityService.getEvents(filters)) as any;

      if (response.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      toast.error("Error", { description: "Failed to fetch events" });
    } finally {
      setLoading(false);
    }
  };

  const handleEventCreated = (newEvent: Event) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleAttendanceChange = (eventId: string, isAttending: boolean) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === eventId
          ? {
              ...event,
              isAttending,
              currentAttendees: isAttending
                ? event.currentAttendees + 1
                : Math.max(0, event.currentAttendees - 1),
            }
          : event
      )
    );
  };

  const eventTypes = [
    "all",
    "workshop",
    "meetup",
    "webinar",
    "competition",
    "announcement",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Community Events</h2>
          <p className="text-gray-400">Discover and join upcoming events</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 hover:from-purple-600 hover:to-pink-600 transition duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </button>
        )}
      </div>

      {/* Event Type Filter */}
      <div className="flex flex-wrap gap-2">
        {eventTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 font-medium transition duration-200 ${
              filter === type
                ? "bg-purple-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="  bg-gray-900/50 border border-gray-700 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onAttendanceChange={handleAttendanceChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No events found
          </h3>
          <p className="text-gray-500">
            {filter === "all"
              ? "No events available at the moment."
              : `No ${filter} events found. Try a different filter.`}
          </p>
        </div>
      )}

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};

export default EventsSection;
