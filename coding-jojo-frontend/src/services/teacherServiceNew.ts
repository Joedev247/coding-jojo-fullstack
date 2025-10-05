// Enhanced Teacher API Service with Advanced Features
class TeacherService {
  private baseURL = 'http://localhost:5000/api/teacher';
  private aiURL = 'http://localhost:5000/api/ai';
  private analyticsURL = 'http://localhost:5000/api/analytics';
  private communicationURL = 'http://localhost:5000/api/communication';

  private getAuthHeaders() {
    const token = localStorage.getItem('teacher_token') || sessionStorage.getItem('teacher_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication
  async register(teacherData: any) {
    return this.request(`${this.baseURL}/register`, {
      method: 'POST',
      body: JSON.stringify(teacherData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request(`${this.baseURL}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data?.token) {
      localStorage.setItem('teacher_token', response.data.token);
      localStorage.setItem('teacher_info', JSON.stringify(response.data.user || response.data));
    }

    return response;
  }

  async logout() {
    localStorage.removeItem('teacher_token');
    localStorage.removeItem('teacher_info');
    sessionStorage.removeItem('teacher_token');
    sessionStorage.removeItem('teacher_info');
  }

  // Profile Management
  async getProfile() {
    return this.request(`${this.baseURL}/profile`);
  }

  async updateProfile(profileData: any) {
    return this.request(`${this.baseURL}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Dashboard
  async getDashboard() {
    return this.request(`${this.baseURL}/dashboard`);
  }

  // Course Management
  async getCourses(params?: { page?: number; limit?: number; search?: string; status?: string }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`${this.baseURL}/courses${queryString}`);
  }

  async getCourse(courseId: string) {
    return this.request(`${this.baseURL}/courses/${courseId}`);
  }

  async createCourse(courseData: any) {
    return this.request(`${this.baseURL}/courses`, {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(courseId: string, courseData: any) {
    return this.request(`${this.baseURL}/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(courseId: string) {
    return this.request(`${this.baseURL}/courses/${courseId}`, {
      method: 'DELETE',
    });
  }

  async publishCourse(courseId: string) {
    return this.request(`${this.baseURL}/courses/${courseId}/publish`, { method: 'PUT' });
  }

  async unpublishCourse(courseId: string) {
    return this.request(`${this.baseURL}/courses/${courseId}/unpublish`, { method: 'PUT' });
  }

  // AI-Powered Features
  async generateCourseOutline(data: {
    courseTitle: string;
    courseDescription: string;
    targetAudience?: string;
    duration?: string;
    level?: string;
  }) {
    return this.request(`${this.aiURL}/course-outline`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateLessonContent(data: {
    lessonTitle: string;
    learningObjectives: string;
    courseContext?: string;
    duration?: string;
    contentType?: string;
  }) {
    return this.request(`${this.aiURL}/lesson-content`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateQuizQuestions(data: {
    topic: string;
    difficultyLevel?: string;
    questionCount: number;
    questionTypes?: string[];
    courseContext?: string;
  }) {
    return this.request(`${this.aiURL}/quiz-questions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async analyzeCoursePerformance(courseId: string) {
    return this.request(`${this.aiURL}/course-analysis`, {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  async generateStudentFeedback(data: {
    studentId: string;
    courseId: string;
    performanceData?: any;
    personalizedNotes?: string;
  }) {
    return this.request(`${this.aiURL}/student-feedback`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateMarketingContent(data: {
    courseId: string;
    contentType: string;
    platform?: string;
    tone?: string;
  }) {
    return this.request(`${this.aiURL}/marketing-content`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Advanced Analytics
  async getTeacherAnalytics(timeRange = '30d') {
    return this.request(`${this.analyticsURL}/teacher-overview?timeRange=${timeRange}`);
  }

  async getCourseAnalytics(courseId: string, timeRange = '30d') {
    return this.request(`${this.analyticsURL}/course/${courseId}?timeRange=${timeRange}`);
  }

  async getGamificationData() {
    return this.request(`${this.analyticsURL}/gamification`);
  }

  // Communication Features
  async getMessages(filters?: {
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const queryString = filters ? `?${new URLSearchParams(filters as any).toString()}` : '';
    return this.request(`${this.communicationURL}/messages${queryString}`);
  }

  async sendMessage(data: {
    recipientId: string;
    subject?: string;
    content: string;
    type?: string;
    courseId?: string;
    priority?: string;
  }) {
    return this.request(`${this.communicationURL}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async sendBulkMessage(data: {
    courseId: string;
    subject?: string;
    content: string;
    recipientFilter?: string;
    priority?: string;
  }) {
    return this.request(`${this.communicationURL}/messages/bulk`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createDiscussion(courseId: string, data: {
    title: string;
    content: string;
    category?: string;
    pinned?: boolean;
  }) {
    return this.request(`${this.communicationURL}/courses/${courseId}/discussions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async scheduleLiveSession(courseId: string, data: {
    title: string;
    description?: string;
    scheduledFor: string;
    duration?: number;
    maxParticipants?: number;
    sessionType?: string;
    requiresRegistration?: boolean;
  }) {
    return this.request(`${this.communicationURL}/courses/${courseId}/live-sessions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createAssignment(courseId: string, data: {
    title: string;
    description: string;
    instructions?: string;
    dueDate: string;
    maxScore?: number;
    submissionTypes?: string[];
    allowLateSubmission?: boolean;
    rubric?: any[];
  }) {
    return this.request(`${this.communicationURL}/courses/${courseId}/assignments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async sendStudentFeedback(studentId: string, data: {
    courseId: string;
    feedbackType?: string;
    content: string;
    suggestions?: string[];
    encouragement?: string;
    grade?: number;
    isPublic?: boolean;
  }) {
    return this.request(`${this.communicationURL}/students/${studentId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Student Management
  async getStudents(courseId?: string) {
    const endpoint = courseId ? `/courses/${courseId}/students` : '/students';
    return this.request(`${this.baseURL}${endpoint}`);
  }

  // Notifications
  async getNotifications(params?: { limit?: number; unread?: boolean }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`${this.baseURL}/notifications${queryString}`);
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`${this.baseURL}/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  // File Upload
  async uploadVideo(file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData();
    formData.append('video', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Upload failed'));

      xhr.open('POST', `${this.baseURL}/upload/video`);
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('teacher_token')}`);
      xhr.send(formData);
    });
  }

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    return fetch(`${this.baseURL}/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('teacher_token')}`,
      },
      body: formData,
    }).then(res => res.json());
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return !!(localStorage.getItem('teacher_token') || sessionStorage.getItem('teacher_token'));
  }

  getTeacherInfo() {
    try {
      const teacherInfo = localStorage.getItem('teacher_info') || sessionStorage.getItem('teacher_info');
      return teacherInfo ? JSON.parse(teacherInfo) : null;
    } catch {
      return null;
    }
  }
}

export const teacherService = new TeacherService();
export default teacherService;
