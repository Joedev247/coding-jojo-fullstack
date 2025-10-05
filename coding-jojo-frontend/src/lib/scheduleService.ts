import { apiClient, ApiResponse } from './api';

export interface ScheduleEvent {
  id: string;
  title: string;
  type: "live-session" | "assignment" | "quiz" | "deadline" | "meeting";
  date: string;
  time: string;
  duration?: string;
  course: string;
  courseId?: string;
  instructor?: string;
  isImportant: boolean;
  status: "upcoming" | "ongoing" | "completed";
  description?: string;
}

export interface ScheduleStats {
  thisWeek: number;
  liveSessions: number;
  deadlines: number;
  attendance: number;
}

export interface ScheduleData {
  events: ScheduleEvent[];
  stats: ScheduleStats;
}

class ScheduleService {
  async getScheduleData(): Promise<{ success: boolean; data?: ScheduleData }> {
    try {
      // Get dashboard data for user's enrolled courses
      const dashboardResponse = await apiClient.get('/dashboard');
      
      if (!dashboardResponse.success) {
        return { success: false };
      }

      const dashboard = dashboardResponse.data as any;
      const enrolledCourses = dashboard.enrolledCourses || [];

      // Generate events based on enrolled courses
      const events = this.generateEventsFromCourses(enrolledCourses);
      const stats = this.calculateScheduleStats(events);

      return {
        success: true,
        data: {
          events,
          stats
        }
      };
    } catch (error) {
      console.error('Schedule service error:', error);
      return { success: false };
    }
  }

  private generateEventsFromCourses(courses: any[]): ScheduleEvent[] {
    const events: ScheduleEvent[] = [];
    const today = new Date();
    
    courses.forEach((course, index) => {
      const instructor = course.instructor?.name || 'Instructor';
      
      // Generate different types of events for each course
      const eventTypes = [
        {
          type: 'live-session' as const,
          title: `Live Session: ${this.getSessionTitle(course.title)}`,
          duration: '90 minutes',
          isImportant: true,
          days: [1, 8, 15] // Every week on different days
        },
        {
          type: 'quiz' as const,
          title: `Quiz: ${course.title} Assessment`,
          duration: '45 minutes',
          isImportant: false,
          days: [5, 12, 19] // Weekly quizzes
        },
        {
          type: 'assignment' as const,
          title: `Assignment: ${this.getAssignmentTitle(course.title)}`,
          duration: undefined,
          isImportant: true,
          days: [7, 14, 21] // Weekly assignments
        }
      ];

      eventTypes.forEach(eventType => {
        eventType.days.forEach(dayOffset => {
          const eventDate = new Date(today);
          eventDate.setDate(today.getDate() + dayOffset + (index * 2)); // Spread events across courses
          
          const eventTime = this.getRandomTime();
          
          events.push({
            id: `${course.id}-${eventType.type}-${dayOffset}`,
            title: eventType.title,
            type: eventType.type,
            date: eventDate.toISOString().split('T')[0],
            time: eventTime,
            duration: eventType.duration,
            course: course.title,
            courseId: course.id,
            instructor: eventType.type === 'live-session' || eventType.type === 'quiz' ? instructor : undefined,
            isImportant: eventType.isImportant,
            status: 'upcoming',
            description: this.getEventDescription(eventType.type, course.title)
          });
        });
      });

      // Add some mentoring sessions for premium users or advanced courses
      if (course.progress > 50 || Math.random() > 0.7) {
        const mentoringDate = new Date(today);
        mentoringDate.setDate(today.getDate() + 10 + (index * 3));
        
        events.push({
          id: `${course.id}-mentoring`,
          title: '1-on-1 Mentoring Session',
          type: 'meeting',
          date: mentoringDate.toISOString().split('T')[0],
          time: this.getRandomTime(),
          duration: '60 minutes',
          course: course.title,
          courseId: course.id,
          instructor: instructor,
          isImportant: false,
          status: 'upcoming',
          description: `Personal mentoring session for ${course.title}`
        });
      }
    });

    // Sort events by date and time
    return events.sort((a, b) => {
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare === 0) {
        return a.time.localeCompare(b.time);
      }
      return dateCompare;
    }).slice(0, 15); // Limit to next 15 events
  }

  private calculateScheduleStats(events: ScheduleEvent[]): ScheduleStats {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const thisWeekEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    });

    const liveSessionsThisMonth = events.filter(event => {
      const eventDate = new Date(event.date);
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      return event.type === 'live-session' && eventDate >= today && eventDate <= nextMonth;
    });

    const deadlines = events.filter(event => 
      event.type === 'assignment' || event.type === 'quiz'
    );

    return {
      thisWeek: thisWeekEvents.length,
      liveSessions: liveSessionsThisMonth.length,
      deadlines: deadlines.length,
      attendance: Math.floor(Math.random() * 15) + 80 // Random attendance 80-95%
    };
  }

  private getSessionTitle(courseTitle: string): string {
    const sessionTopics = [
      'Deep Dive',
      'Practical Workshop',
      'Advanced Concepts',
      'Hands-on Practice',
      'Q&A Session',
      'Code Review',
      'Project Building',
      'Best Practices'
    ];
    
    const randomTopic = sessionTopics[Math.floor(Math.random() * sessionTopics.length)];
    const shortTitle = courseTitle.split(':')[0] || courseTitle.substring(0, 30);
    return `${shortTitle} ${randomTopic}`;
  }

  private getAssignmentTitle(courseTitle: string): string {
    const assignmentTypes = [
      'Build a Project',
      'Code Challenge',
      'Practice Exercise',
      'Real-world Application',
      'Portfolio Piece',
      'Implementation Task'
    ];
    
    const randomType = assignmentTypes[Math.floor(Math.random() * assignmentTypes.length)];
    return randomType;
  }

  private getEventDescription(type: string, courseTitle: string): string {
    switch (type) {
      case 'live-session':
        return `Join the interactive live session for ${courseTitle}. Ask questions, get real-time feedback, and learn alongside peers.`;
      case 'quiz':
        return `Test your knowledge with this assessment covering key concepts from ${courseTitle}.`;
      case 'assignment':
        return `Apply what you've learned in ${courseTitle} with this hands-on assignment.`;
      case 'meeting':
        return `Personal mentoring session to discuss your progress and get guidance on ${courseTitle}.`;
      default:
        return `Event related to ${courseTitle}`;
    }
  }

  private getRandomTime(): string {
    const hours = [9, 10, 11, 13, 14, 15, 16, 17, 18, 19]; // Avoid lunch hour
    const minutes = ['00', '30'];
    
    const randomHour = hours[Math.floor(Math.random() * hours.length)];
    const randomMinute = minutes[Math.floor(Math.random() * minutes.length)];
    
    return `${randomHour.toString().padStart(2, '0')}:${randomMinute}`;
  }

  // Helper method to get events for a specific date range
  async getEventsForDateRange(startDate: string, endDate: string): Promise<{ success: boolean; data?: ScheduleEvent[] }> {
    const scheduleData = await this.getScheduleData();
    
    if (!scheduleData.success || !scheduleData.data) {
      return { success: false };
    }

    const filteredEvents = scheduleData.data.events.filter(event => {
      const eventDate = event.date;
      return eventDate >= startDate && eventDate <= endDate;
    });

    return {
      success: true,
      data: filteredEvents
    };
  }
}

export const scheduleService = new ScheduleService();
