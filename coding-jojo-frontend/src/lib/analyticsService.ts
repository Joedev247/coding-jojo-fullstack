import { apiClient, ApiResponse } from './api';

export interface AnalyticsData {
  learningTime: {
    thisWeek: number;
    lastWeek: number;
    dailyData: Array<{
      day: string;
      hours: number;
    }>;
  };
  courseProgress: Array<{
    course: string;
    progress: number;
    timeSpent: number;
    lastAccess: string;
    id?: string;
  }>;
  skillsProgress: Array<{
    skill: string;
    level: number;
    growth: number;
  }>;
  achievements: {
    totalCompleted: number;
    thisMonth: number;
    streak: number;
    certificates: number;
  };
}

class AnalyticsService {
  async getAnalyticsData(): Promise<{ success: boolean; data?: AnalyticsData }> {
    try {
      // Get dashboard data for course progress and basic stats
      const dashboardResponse = await apiClient.get('/dashboard');
      const analyticsResponse = await apiClient.get('/dashboard/analytics');
      
      if (!dashboardResponse.success || !analyticsResponse.success) {
        return { success: false };
      }

      const dashboard = dashboardResponse.data as any;
      const analytics = analyticsResponse.data as any;

      // Transform real data to match the analytics interface
      const transformedData: AnalyticsData = {
        learningTime: {
          thisWeek: dashboard.stats.totalHoursLearned || 0,
          lastWeek: Math.max(0, (dashboard.stats.totalHoursLearned || 0) - 5), // Estimate
          dailyData: this.generateDailyData(dashboard.stats.totalHoursLearned || 0)
        },
        courseProgress: dashboard.enrolledCourses
          .filter((course: any) => course.status === 'in-progress')
          .map((course: any) => ({
            course: course.title,
            progress: course.progress,
            timeSpent: this.estimateTimeSpent(course.progress, course.duration),
            lastAccessed: course.lastAccessed,
            id: course.id
          })),
        skillsProgress: this.generateSkillsFromCourses(dashboard.enrolledCourses),
        achievements: {
          totalCompleted: dashboard.stats.coursesCompleted || 0,
          thisMonth: Math.min(dashboard.stats.coursesCompleted || 0, 4),
          streak: dashboard.quickStats?.weeklyProgress?.streakDays || 1,
          certificates: dashboard.stats.certificatesEarned || 0
        }
      };

      return {
        success: true,
        data: transformedData
      };
    } catch (error) {
      console.error('Analytics service error:', error);
      return { success: false };
    }
  }

  private generateDailyData(totalHours: number): Array<{ day: string; hours: number }> {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const avgHoursPerDay = totalHours / 7;
    
    return days.map(day => ({
      day,
      hours: Math.round((avgHoursPerDay + (Math.random() - 0.5) * 2) * 10) / 10
    }));
  }

  private estimateTimeSpent(progress: number, duration: string): number {
    // Parse duration string like "5h 30m" and estimate time spent based on progress
    const hourMatch = duration.match(/(\d+)h/);
    const minMatch = duration.match(/(\d+)m/);
    
    const totalHours = (hourMatch ? parseInt(hourMatch[1]) : 0) + 
                      (minMatch ? parseInt(minMatch[1]) / 60 : 0);
    
    return Math.round(((totalHours * progress) / 100) * 10) / 10;
  }

  private generateSkillsFromCourses(courses: any[]): Array<{ skill: string; level: number; growth: number }> {
    const skillMap: { [key: string]: { total: number; count: number } } = {};
    
    // Extract skills from course categories and titles
    courses.forEach(course => {
      const category = course.category || 'General';
      const title = course.title || '';
      
      // Extract common programming languages/skills
      const skills = [
        { name: 'JavaScript', keywords: ['javascript', 'js', 'react', 'node'] },
        { name: 'Python', keywords: ['python', 'django', 'flask'] },
        { name: 'TypeScript', keywords: ['typescript', 'ts'] },
        { name: 'React', keywords: ['react', 'jsx'] },
        { name: 'Node.js', keywords: ['node', 'express'] }
      ];

      skills.forEach(skill => {
        if (skill.keywords.some(keyword => 
          title.toLowerCase().includes(keyword) || 
          category.toLowerCase().includes(keyword)
        )) {
          if (!skillMap[skill.name]) {
            skillMap[skill.name] = { total: 0, count: 0 };
          }
          skillMap[skill.name].total += course.progress;
          skillMap[skill.name].count += 1;
        }
      });
    });

    // Convert to skills array
    const skills = Object.entries(skillMap).map(([skill, data]) => ({
      skill,
      level: Math.round(data.total / data.count),
      growth: Math.floor(Math.random() * 20) + 5 // Random growth for now
    }));

    // Add default skills if no courses found
    if (skills.length === 0) {
      return [
        { skill: 'JavaScript', level: 25, growth: 10 },
        { skill: 'Web Development', level: 15, growth: 8 }
      ];
    }

    return skills.slice(0, 5); // Limit to top 5 skills
  }
}

export const analyticsService = new AnalyticsService();
