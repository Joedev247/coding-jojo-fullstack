import { apiClient, ApiResponse } from './api';

export interface Certificate {
  id: string;
  title: string;
  course: string;
  courseId: string;
  instructor: string;
  issueDate: string;
  certificateNumber: string;
  grade: string;
  status: "earned" | "in-progress" | "available";
  thumbnail: string;
  skills: string[];
  description?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: string;
}

export interface CertificationStats {
  earned: number;
  inProgress: number;
  available: number;
  totalSkills: number;
}

export interface CertificationData {
  certificates: Certificate[];
  badges: Badge[];
  stats: CertificationStats;
}

class CertificationsService {
  async getCertifications(): Promise<{ success: boolean; data?: CertificationData }> {
    try {
      // Get dashboard data for user's enrolled courses
      const dashboardResponse = await apiClient.get('/dashboard');
      
      if (!dashboardResponse.success) {
        return { success: false };
      }

      const dashboard = dashboardResponse.data as any;
      const enrolledCourses = dashboard.enrolledCourses || [];

      // Generate certificates based on enrolled courses
      const certificates = this.generateCertificatesFromCourses(enrolledCourses);
      const badges = this.generateBadgesFromProgress(enrolledCourses);
      const stats = this.calculateStats(certificates, badges);

      return {
        success: true,
        data: {
          certificates,
          badges,
          stats
        }
      };
    } catch (error) {
      console.error('Certifications service error:', error);
      return { success: false };
    }
  }

  private generateCertificatesFromCourses(courses: any[]): Certificate[] {
    const certificates: Certificate[] = [];
    
    courses.forEach((course) => {
      const certificateId = `cert-${course.id}`;
      const skills = this.extractSkillsFromCourse(course);
      
      // Determine certificate status based on progress
      let status: "earned" | "in-progress" | "available" = "available";
      let grade = "";
      let issueDate = "";
      let certificateNumber = "";
      
      if (course.progress >= 100) {
        status = "earned";
        grade = this.calculateGrade(course.progress);
        issueDate = course.completedAt || new Date().toISOString().split('T')[0];
        certificateNumber = `CJ-${course.category?.slice(0, 2).toUpperCase() || 'GN'}-${new Date().getFullYear()}-${course.id.slice(-6).toUpperCase()}`;
      } else if (course.progress > 0) {
        status = "in-progress";
      }

      certificates.push({
        id: certificateId,
        title: `${course.title} Certificate`,
        course: course.title,
        courseId: course.id,
        instructor: course.instructor?.name || 'Unknown Instructor',
        issueDate,
        certificateNumber,
        grade,
        status,
        thumbnail: course.thumbnail || '/api/placeholder/300/200',
        skills,
        description: `Certificate of completion for ${course.title}`
      });
    });

    return certificates.sort((a, b) => {
      // Sort by status: earned first, then in-progress, then available
      const statusOrder = { earned: 0, 'in-progress': 1, available: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }

  private generateBadgesFromProgress(courses: any[]): Badge[] {
    const badges: Badge[] = [];
    const today = new Date().toISOString().split('T')[0];
    
    // Calculate achievements based on course progress
    const completedCourses = courses.filter(c => c.progress >= 100);
    const totalProgress = courses.reduce((sum, c) => sum + c.progress, 0);
    const avgProgress = courses.length > 0 ? totalProgress / courses.length : 0;

    // First Course Completed Badge
    if (completedCourses.length >= 1) {
      badges.push({
        id: 'first-course',
        name: 'First Course Completed',
        description: 'Completed your first course',
        icon: '🎓',
        earnedDate: completedCourses[0].completedAt || today,
        category: 'Achievement'
      });
    }

    // Dedicated Learner Badge
    if (completedCourses.length >= 3) {
      badges.push({
        id: 'dedicated-learner',
        name: 'Dedicated Learner',
        description: 'Completed 3 or more courses',
        icon: '📚',
        earnedDate: today,
        category: 'Achievement'
      });
    }

    // High Achiever Badge
    if (avgProgress >= 80) {
      badges.push({
        id: 'high-achiever',
        name: 'High Achiever',
        description: 'Maintaining high progress across all courses',
        icon: '⭐',
        earnedDate: today,
        category: 'Performance'
      });
    }

    // Category-specific badges
    const categories = new Set(courses.map(c => c.category).filter(Boolean));
    categories.forEach(category => {
      const categoryCompletedCount = courses.filter(c => 
        c.category === category && c.progress >= 100
      ).length;
      
      if (categoryCompletedCount >= 2) {
        badges.push({
          id: `${category?.toLowerCase()}-specialist`,
          name: `${category} Specialist`,
          description: `Completed multiple courses in ${category}`,
          icon: '🏆',
          earnedDate: today,
          category: 'Specialization'
        });
      }
    });

    return badges;
  }

  private extractSkillsFromCourse(course: any): string[] {
    const skills: string[] = [];
    
    // Extract skills from course title and category
    const title = course.title?.toLowerCase() || '';
    const category = course.category?.toLowerCase() || '';
    
    // Common programming languages and technologies
    const skillKeywords = [
      { skill: 'JavaScript', keywords: ['javascript', 'js', 'node', 'react', 'vue'] },
      { skill: 'Python', keywords: ['python', 'django', 'flask'] },
      { skill: 'TypeScript', keywords: ['typescript', 'ts'] },
      { skill: 'React', keywords: ['react', 'jsx'] },
      { skill: 'Node.js', keywords: ['node', 'nodejs', 'express'] },
      { skill: 'CSS', keywords: ['css', 'styling', 'sass', 'scss'] },
      { skill: 'HTML', keywords: ['html', 'markup'] },
      { skill: 'Database', keywords: ['database', 'sql', 'mongodb', 'mysql'] },
      { skill: 'API Development', keywords: ['api', 'rest', 'graphql'] },
      { skill: 'Web Development', keywords: ['web', 'frontend', 'backend', 'fullstack'] }
    ];

    skillKeywords.forEach(({ skill, keywords }) => {
      if (keywords.some(keyword => title.includes(keyword) || category.includes(keyword))) {
        skills.push(skill);
      }
    });

    // Add category as a skill if no specific skills found
    if (skills.length === 0 && course.category) {
      skills.push(course.category);
    }

    return skills.slice(0, 4); // Limit to 4 skills per certificate
  }

  private calculateGrade(progress: number): string {
    if (progress >= 95) return 'A+';
    if (progress >= 90) return 'A';
    if (progress >= 85) return 'A-';
    if (progress >= 80) return 'B+';
    if (progress >= 75) return 'B';
    if (progress >= 70) return 'B-';
    if (progress >= 65) return 'C+';
    if (progress >= 60) return 'C';
    return 'C-';
  }

  private calculateStats(certificates: Certificate[], badges: Badge[]): CertificationStats {
    const earned = certificates.filter(c => c.status === 'earned').length;
    const inProgress = certificates.filter(c => c.status === 'in-progress').length;
    const available = certificates.filter(c => c.status === 'available').length;
    
    // Calculate unique skills across all certificates
    const allSkills = new Set(certificates.flatMap(c => c.skills));
    const totalSkills = allSkills.size;

    return {
      earned,
      inProgress,
      available,
      totalSkills
    };
  }

  // Helper method to download certificate (placeholder)
  async downloadCertificate(certificateId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Implement actual certificate generation and download
      console.log(`Downloading certificate: ${certificateId}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to download certificate' };
    }
  }

  // Helper method to share certificate (placeholder)
  async shareCertificate(certificateId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Implement certificate sharing functionality
      console.log(`Sharing certificate: ${certificateId}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to share certificate' };
    }
  }
}

export const certificationsService = new CertificationsService();
