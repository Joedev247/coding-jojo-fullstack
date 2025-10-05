import { apiClient, ApiResponse } from '../lib/api';

// Quiz Service
export interface QuizQuestion {
  _id?: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: number | string;
  points: number;
  explanation?: string;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  lesson?: string;
  timeLimit: number; // in seconds
  passingScore: number;
  maxAttempts: number;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt?: string;
}

export interface QuizAttempt {
  _id: string;
  quizId: string;
  studentId: string;
  answers: Array<{
    questionId: string;
    answer: number | string;
  }>;
  score: number;
  maxScore: number;
  startedAt: string;
  submittedAt: string;
  timeSpent: number;
  passed: boolean;
}

export interface CreateQuizData {
  title: string;
  description: string;
  course: string;
  lesson?: string;
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
  questions: Omit<QuizQuestion, '_id'>[];
}

export interface SubmitQuizData {
  answers: Array<{
    questionId: string;
    answer: number | string;
  }>;
}

export interface QuizAnalytics {
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  questionAnalytics: Array<{
    questionId: string;
    question: string;
    correctAnswers: number;
    totalAnswers: number;
    accuracy: number;
  }>;
}

class QuizService {
  // Get course quizzes
  async getCourseQuizzes(courseId: string, params?: { page?: number; limit?: number }): Promise<ApiResponse<Quiz[]>> {
    return apiClient.get<Quiz[]>(`/quizzes/course/${courseId}`, params);
  }

  // Get quiz details
  async getQuizDetails(quizId: string): Promise<ApiResponse<Quiz>> {
    return apiClient.get<Quiz>(`/quizzes/${quizId}`);
  }

  // Create quiz (Instructor)
  async createQuiz(quizData: CreateQuizData): Promise<ApiResponse<Quiz>> {
    return apiClient.post<Quiz>('/quizzes', quizData);
  }

  // Update quiz (Instructor)
  async updateQuiz(quizId: string, quizData: Partial<CreateQuizData>): Promise<ApiResponse<Quiz>> {
    return apiClient.patch<Quiz>(`/quizzes/${quizId}`, quizData);
  }

  // Delete quiz (Instructor)
  async deleteQuiz(quizId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/quizzes/${quizId}`);
  }

  // Start quiz attempt
  async startQuizAttempt(quizId: string): Promise<ApiResponse<{ attemptId: string; startTime: string }>> {
    return apiClient.post<{ attemptId: string; startTime: string }>(`/quizzes/${quizId}/start`);
  }

  // Submit quiz attempt
  async submitQuizAttempt(quizId: string, submissionData: SubmitQuizData): Promise<ApiResponse<QuizAttempt>> {
    return apiClient.post<QuizAttempt>(`/quizzes/${quizId}/submit`, submissionData);
  }

  // Get quiz attempts
  async getQuizAttempts(quizId: string): Promise<ApiResponse<QuizAttempt[]>> {
    return apiClient.get<QuizAttempt[]>(`/quizzes/${quizId}/attempts`);
  }

  // Get quiz results
  async getQuizResults(quizId: string, attemptId: string): Promise<ApiResponse<QuizAttempt>> {
    return apiClient.get<QuizAttempt>(`/quizzes/${quizId}/results/${attemptId}`);
  }

  // Get quiz analytics (Instructor)
  async getQuizAnalytics(quizId: string): Promise<ApiResponse<QuizAnalytics>> {
    return apiClient.get<QuizAnalytics>(`/quizzes/${quizId}/analytics`);
  }
}

export const quizService = new QuizService();
