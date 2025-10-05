import api, { ApiResponse } from '../lib/api';

// Interface definitions
export interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'lesson' | 'assignment' | 'exam' | 'meeting' | 'webinar' | 'reminder';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  location?: string;
  isOnline: boolean;
  meetingUrl?: string;
  instructorId?: string;
  courseId?: string;
  attendees?: string[];
  reminders: ScheduleReminder[];
  recurrence?: ScheduleRecurrence;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  attachments?: ScheduleAttachment[];
}

export interface ScheduleReminder {
  id: string;
  type: 'email' | 'push' | 'sms';
  triggerMinutes: number; // minutes before event
  isEnabled: boolean;
}

export interface ScheduleRecurrence {
  type: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // repeat every N periods
  daysOfWeek?: number[]; // for weekly recurrence, 0=Sunday, 1=Monday, etc.
  endDate?: string;
  maxOccurrences?: number;
}

export interface ScheduleAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface CalendarView {
  view: 'month' | 'week' | 'day' | 'agenda';
  startDate: string;
  endDate: string;
}

class ScheduleService {
  // Get user's schedule events
  async getScheduleEvents(startDate?: string, endDate?: string, type?: string): Promise<ScheduleEvent[]> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (type) params.append('type', type);

      const response: ApiResponse<ScheduleEvent[]> = await api.get(`/schedule/events?${params.toString()}`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to get schedule events:', error);
      throw error;
    }
  }

  // Create a new event
  async createEvent(eventData: Omit<ScheduleEvent, 'id'>): Promise<ScheduleEvent> {
    try {
      const response: ApiResponse<ScheduleEvent> = await api.post('/schedule/events', eventData);
      return response.data!;
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  }

  // Update an existing event
  async updateEvent(eventId: string, eventData: Partial<ScheduleEvent>): Promise<ScheduleEvent> {
    try {
      const response: ApiResponse<ScheduleEvent> = await api.put(`/schedule/events/${eventId}`, eventData);
      return response.data!;
    } catch (error) {
      console.error('Failed to update event:', error);
      throw error;
    }
  }

  // Delete an event
  async deleteEvent(eventId: string): Promise<void> {
    try {
      await api.delete(`/schedule/events/${eventId}`);
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw error;
    }
  }

  // Get a specific event
  async getEvent(eventId: string): Promise<ScheduleEvent> {
    try {
      const response: ApiResponse<ScheduleEvent> = await api.get(`/schedule/events/${eventId}`);
      return response.data!;
    } catch (error) {
      console.error('Failed to get event:', error);
      throw error;
    }
  }

  // Mark event as completed
  async markEventCompleted(eventId: string): Promise<ScheduleEvent> {
    try {
      const response: ApiResponse<ScheduleEvent> = await api.post(`/schedule/events/${eventId}/complete`);
      return response.data!;
    } catch (error) {
      console.error('Failed to mark event as completed:', error);
      throw error;
    }
  }

  // Cancel an event
  async cancelEvent(eventId: string, reason?: string): Promise<ScheduleEvent> {
    try {
      const response: ApiResponse<ScheduleEvent> = await api.post(`/schedule/events/${eventId}/cancel`, { reason });
      return response.data!;
    } catch (error) {
      console.error('Failed to cancel event:', error);
      throw error;
    }
  }

  // Get upcoming events
  async getUpcomingEvents(limit: number = 10): Promise<ScheduleEvent[]> {
    try {
      const response: ApiResponse<ScheduleEvent[]> = await api.get(`/schedule/upcoming?limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to get upcoming events:', error);
      throw error;
    }
  }

  // Get events for today
  async getTodayEvents(): Promise<ScheduleEvent[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      return this.getScheduleEvents(today, today);
    } catch (error) {
      console.error('Failed to get today events:', error);
      throw error;
    }
  }

  // Get events for this week
  async getWeekEvents(): Promise<ScheduleEvent[]> {
    try {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
      
      return this.getScheduleEvents(
        startOfWeek.toISOString().split('T')[0],
        endOfWeek.toISOString().split('T')[0]
      );
    } catch (error) {
      console.error('Failed to get week events:', error);
      throw error;
    }
  }

  // Add reminder to event
  async addReminder(eventId: string, reminder: Omit<ScheduleReminder, 'id'>): Promise<ScheduleReminder> {
    try {
      const response: ApiResponse<ScheduleReminder> = await api.post(`/schedule/events/${eventId}/reminders`, reminder);
      return response.data!;
    } catch (error) {
      console.error('Failed to add reminder:', error);
      throw error;
    }
  }

  // Update reminder
  async updateReminder(eventId: string, reminderId: string, reminder: Partial<ScheduleReminder>): Promise<ScheduleReminder> {
    try {
      const response: ApiResponse<ScheduleReminder> = await api.put(`/schedule/events/${eventId}/reminders/${reminderId}`, reminder);
      return response.data!;
    } catch (error) {
      console.error('Failed to update reminder:', error);
      throw error;
    }
  }

  // Delete reminder
  async deleteReminder(eventId: string, reminderId: string): Promise<void> {
    try {
      await api.delete(`/schedule/events/${eventId}/reminders/${reminderId}`);
    } catch (error) {
      console.error('Failed to delete reminder:', error);
      throw error;
    }
  }

  // Join event (for meetings/webinars)
  async joinEvent(eventId: string): Promise<{ meetingUrl: string }> {
    try {
      const response: ApiResponse<{ meetingUrl: string }> = await api.post(`/schedule/events/${eventId}/join`);
      return response.data!;
    } catch (error) {
      console.error('Failed to join event:', error);
      throw error;
    }
  }

  // Get calendar availability
  async getAvailability(startDate: string, endDate: string): Promise<{ available: boolean; busySlots: Array<{ start: string; end: string }> }> {
    try {
      const response: ApiResponse<{ available: boolean; busySlots: Array<{ start: string; end: string }> }> = await api.get(`/schedule/availability?startDate=${startDate}&endDate=${endDate}`);
      return response.data || { available: true, busySlots: [] };
    } catch (error) {
      console.error('Failed to get availability:', error);
      throw error;
    }
  }

  // Export calendar
  async exportCalendar(format: 'ics' | 'json' = 'ics'): Promise<string> {
    try {
      const response: ApiResponse<{ exportUrl: string }> = await api.get(`/schedule/export?format=${format}`);
      return response.data?.exportUrl || '';
    } catch (error) {
      console.error('Failed to export calendar:', error);
      throw error;
    }
  }
}

export const scheduleService = new ScheduleService();
