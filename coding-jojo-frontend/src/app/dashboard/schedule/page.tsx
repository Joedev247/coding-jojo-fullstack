"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookOpen,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Bell,
  MoreVertical,
  User,
  Award,
  Plus,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Sidebar from "../../../components/dashboard/Sidebar";
import { scheduleService, ScheduleEvent, ScheduleReminder } from "../../../services/scheduleService";

// Data will be loaded from backend via scheduleService

export default function SchedulePage() {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2020, 6, 17)); // July 17, 2020
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMonth, setViewMonth] = useState(new Date()); // used by mini calendar
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const d = new Date();
    const start = new Date(d);
    start.setDate(d.getDate() - d.getDay()); // Sunday
    start.setHours(0, 0, 0, 0);
    return start;
  });
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [reminders, setReminders] = useState<ScheduleReminder[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch schedule events from backend when authenticated
  useEffect(() => {
    let mounted = true;
    const fetchSchedule = async () => {
      if (!isAuthenticated) return;
      setLoadingEvents(true);
      setScheduleError(null);

      try {
        // Try getting this week's events first
        const weekEvents = await scheduleService.getWeekEvents();
        if (!mounted) return;
        setEvents(Array.isArray(weekEvents) ? weekEvents : []);

        // Derive reminders: collect reminders attached to events or events of type 'reminder'
        const derivedReminders: ScheduleReminder[] = [];
        (Array.isArray(weekEvents) ? weekEvents : []).forEach((e: any) => {
          if (Array.isArray(e.reminders)) {
            e.reminders.forEach((r: ScheduleReminder) => derivedReminders.push(r));
          }
          if (e.type === 'reminder') {
            derivedReminders.push({
              id: `${e.id}-rem`,
              type: 'email',
              triggerMinutes: 10,
              isEnabled: true,
            });
          }
        });

        setReminders(derivedReminders.slice(0, 10));
      } catch (err) {
        console.error('Failed to load schedule events:', err);
        setScheduleError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoadingEvents(false);
      }
    };

    fetchSchedule();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const hours = [
    "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00"
  ];

  // Get week days starting from the selected date
  const getWeekDays = (start: Date) => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(weekStart);

  // Mini calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(viewMonth);

  // Helpers to parse event times (support multiple backend shapes)
  const parseEventStart = (ev: any): Date | null => {
    try {
      if (ev.startDate) return new Date(ev.startDate);
      if (ev.date && ev.time) return new Date(`${ev.date}T${ev.time}`);
      if (ev.date) return new Date(ev.date);
      return null;
    } catch (e) {
      return null;
    }
  };

  const eventsForDayHour = (day: Date, hourLabel: string) => {
    // hourLabel like "10:00"
    return events.filter((ev) => {
      const start = parseEventStart(ev);
      if (!start) return false;
      const evDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const dayDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      if (evDate.getTime() !== dayDate.getTime()) return false;
      const hh = start.getHours().toString().padStart(2, '0');
      const mm = start.getMinutes().toString().padStart(2, '0');
      return `${hh}:${mm}` === hourLabel;
    });
  };

  const goPrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };

  const goNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  const refreshEvents = async () => {
    setLoadingEvents(true);
    setScheduleError(null);
    try {
      const weekEvents = await scheduleService.getWeekEvents();
      setEvents(Array.isArray(weekEvents) ? weekEvents : []);
    } catch (err) {
      console.error('Failed to refresh events:', err);
      setScheduleError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingEvents(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated) refreshEvents();
  }, [isAuthenticated, weekStart]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">
            You need to be logged in to access your schedule.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Schedule</h2>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 ">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <Image
                  src={user?.profilePicture || "/testimonial-avatar.jpg"}
                  alt={user?.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "Martin nel"}
                  </p>
                  <ChevronDown className="w-4 h-4 text-gray-500 inline" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Calendar */}
            <div className="col-span-8">
              <div className="bg-white  border border-gray-200 p-6">
                {/* Month / Week Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {months[weekStart.getMonth()]} <span className="text-gray-400">{weekStart.getFullYear()}</span>
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button onClick={goPrevWeek} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                      </button>
                      <button onClick={goNextWeek} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                      <button onClick={refreshEvents} title="Refresh" className="p-1 hover:bg-gray-100 rounded text-sm text-gray-600">Refresh</button>
                    </div>
                  </div>
                </div>

                {/* Month Tabs (visual only - unchanged) */}
                <div className="flex items-center space-x-4 mb-6 border-b border-gray-200 pb-4">
                  {months.map((month) => (
                    <button key={month} className={`text-sm font-medium px-3 py-1 rounded transition-colors ${month === months[weekStart.getMonth()] ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}>
                      {month}
                    </button>
                  ))}
                </div>

                {/* Week View */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="flex items-center space-x-4">
                      {weekDays.map((day, index) => {
                        const dayNum = day.getDate();
                        const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day.getDay()];
                        const isSelected = dayNum === 17;

                        return (
                          <div
                            key={index}
                            className={`flex flex-col items-center justify-center w-16 h-20  transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-2xl font-bold">{dayNum}</span>
                            <span className="text-xs">{dayName}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Time Schedule */}
                  <div className="space-y-2">
                    {hours.map((hour, index) => (
                      <div key={hour} className="flex items-start space-x-4">
                        <div className="w-16 text-sm text-gray-500">{hour}</div>
                        <div className="flex-1 border-b border-gray-100 pb-4 min-h-[60px] relative">
                          {/* Render any events that match this day/hour for the selected week. We'll show the first event for each of the seven days in this hour slot (stacked by day). */}
                          {weekDays.map((day, dIndex) => {
                            const matched = eventsForDayHour(day, hour);
                            if (!matched || matched.length === 0) return null;
                            // Render the first matching event for that day in this hour slot
                            const ev = matched[0];
                            const bgClasses = ev.type === 'live-session'
                              ? 'bg-emerald-100 border-l-4 border-emerald-400'
                              : ev.type === 'meeting'
                              ? 'bg-orange-100 border-l-4 border-orange-400'
                              : 'bg-indigo-100 border-l-4 border-indigo-400';

                            const topOffset = dIndex * 6; // small vertical offset to avoid exact overlap visually
                            return (
                              <div key={`${hour}-${dIndex}`} className="absolute left-0 right-0" style={{ top: `${topOffset}px` }}>
                                <div className={`${bgClasses} p-3`}>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{ev.title}</h4>
                                  <div className="flex items-center text-xs text-gray-600">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>{(() => {
                                      const s = parseEventStart(ev);
                                      return s ? s.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (ev.time || '')
                                    })()}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* If no backend events present, keep original static visuals for the three demo slots */}
                          {events.length === 0 && index === 2 && (
                            <div className="absolute left-0 right-0">
                              <div className="bg-emerald-100 border-l-4 border-emerald-400  p-3">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1">Figma Prototype Class</h4>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>07:00 - 08:00 AM</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {events.length === 0 && index === 5 && (
                            <div className="absolute left-0 right-0">
                              <div className="bg-orange-100 border-l-4 border-orange-400  p-3">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1">Figma Prototype Class</h4>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>07:00 - 08:00 AM</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {events.length === 0 && index === 7 && (
                            <div className="absolute left-0 right-0">
                              <div className="bg-indigo-100 border-l-4 border-indigo-400  p-3">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1">Sketch learning</h4>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>07:00 - 08:00 AM</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Mini Calendar */}
              <div className="bg-white  border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    June 28 <span className="text-base font-normal text-gray-500">Monday</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const newMonth = new Date(viewMonth);
                        newMonth.setMonth(viewMonth.getMonth() - 1);
                        setViewMonth(newMonth);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => {
                        const newMonth = new Date(viewMonth);
                        newMonth.setMonth(viewMonth.getMonth() + 1);
                        setViewMonth(newMonth);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ))}

                  {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const isToday = day === 28;
                    const isSelected = day === 21;

                    return (
                      <button
                        key={day}
                        className={`aspect-square flex items-center justify-center text-sm  transition-colors ${
                          isSelected
                            ? "bg-indigo-600 text-white font-bold"
                            : isToday
                            ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Add New Task Button */}
                  <button onClick={async () => {
                    // Lightweight Add Task flow: prompt for title/time/date and create via service
                    const title = window.prompt('Task title');
                    if (!title) return;
                    const dateInput = window.prompt('Date (YYYY-MM-DD)', weekStart.toISOString().split('T')[0]);
                    if (!dateInput) return;
                    const timeInput = window.prompt('Time (HH:MM, 24h)', '10:00');
                    if (!timeInput) return;
                    try {
                      setLoadingEvents(true);
                      const newEvent = await scheduleService.createEvent({
                        title,
                        description: '',
                        startDate: `${dateInput}T${timeInput}:00.000Z`,
                        endDate: `${dateInput}T${timeInput}:00.000Z`,
                        type: 'lesson',
                        status: 'scheduled',
                        location: '',
                        isOnline: false,
                        meetingUrl: undefined,
                        instructorId: undefined,
                        courseId: undefined,
                        attendees: [],
                        reminders: [],
                        priority: 'medium',
                        tags: []
                      } as any);
                      // Refresh events after creating
                      await refreshEvents();
                      window.alert('Event created');
                    } catch (e) {
                      console.error('Create event failed', e);
                      window.alert('Failed to create event');
                    } finally {
                      setLoadingEvents(false);
                    }
                  }} className="w-full mt-6 py-3 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white  font-semibold hover:from-emerald-500 hover:to-cyan-600 transition-all flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add New Task</span>
                  </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white  border border-gray-200 p-4 text-center">
                  <p className="text-3xl font-bold text-indigo-600 mb-1">{Array.from(new Set(events.filter(e => e.status !== 'completed').map(e => e.courseId))).length}</p>
                  <p className="text-xs text-gray-500">Course in progress</p>
                </div>
                <div className="bg-white  border border-gray-200 p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-600 mb-1">{Array.from(new Set(events.filter(e => e.status === 'completed').map(e => e.courseId))).length}</p>
                  <p className="text-xs text-gray-500">Course Complete</p>
                </div>
              </div>

              {/* Reminders */}
                <div className="bg-white  border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Reminders</h3>
                <div className="space-y-3">
                  {reminders.length === 0 ? (
                    <div className="text-sm text-gray-500">No reminders</div>
                  ) : (
                    reminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className="flex items-center justify-between p-3 bg-gray-50  hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-gray-100 flex items-center justify-center text-xl`}>
                            {reminder.type === 'email' ? '📧' : reminder.type === 'sms' ? '📱' : '🔔'}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Reminder</h4>
                            <p className="text-xs text-gray-500">Triggers {reminder.triggerMinutes} minutes before</p>
                          </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
