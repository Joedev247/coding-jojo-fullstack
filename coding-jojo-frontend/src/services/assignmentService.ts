import { apiClient, ApiResponse } from '../lib/api';

// Assignment Service
export interface Assignment {
  _id: string;
  title: string;
  description: string;
  instructions: string;
  course: string;
  lesson?: string;
  dueDate: string;
  maxPoints: number;
  allowedAttempts: number;
  submissionType: 'text' | 'file' | 'both';
  materials?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface AssignmentSubmission {
  _id: string;
  assignmentId: string;
  studentId: string;
  content?: string;
  files?: string[];
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

export interface CreateAssignmentData {
  title: string;
  description: string;
  instructions: string;
  course: string;
  lesson?: string;
  dueDate: string;
  maxPoints: number;
  allowedAttempts: number;
  submissionType: 'text' | 'file' | 'both';
  materials?: File[];
}

export interface SubmitAssignmentData {
  content?: string;
  files?: File[];
}

export interface GradeSubmissionData {
  grade: number;
  feedback?: string;
}

class AssignmentService {
  // Get course assignments
  async getCourseAssignments(courseId: string, params?: { page?: number; limit?: number }): Promise<ApiResponse<Assignment[]>> {
    return apiClient.get<Assignment[]>(`/assignments/course/${courseId}`, params);
  }

  // Get assignment details
  async getAssignmentDetails(assignmentId: string): Promise<ApiResponse<Assignment>> {
    return apiClient.get<Assignment>(`/assignments/${assignmentId}`);
  }

  // Create assignment (Instructor)
  async createAssignment(assignmentData: CreateAssignmentData): Promise<ApiResponse<Assignment>> {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(assignmentData).forEach(key => {
      if (key !== 'materials') {
        formData.append(key, (assignmentData as any)[key]);
      }
    });
    
    // Append files
    if (assignmentData.materials) {
      assignmentData.materials.forEach(file => {
        formData.append('materials', file);
      });
    }
    
    return apiClient.post<Assignment>('/assignments', formData);
  }

  // Update assignment (Instructor)
  async updateAssignment(assignmentId: string, assignmentData: Partial<CreateAssignmentData>): Promise<ApiResponse<Assignment>> {
    return apiClient.patch<Assignment>(`/assignments/${assignmentId}`, assignmentData);
  }

  // Delete assignment (Instructor)
  async deleteAssignment(assignmentId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/assignments/${assignmentId}`);
  }

  // Submit assignment
  async submitAssignment(assignmentId: string, submissionData: SubmitAssignmentData): Promise<ApiResponse<AssignmentSubmission>> {
    const formData = new FormData();
    
    if (submissionData.content) {
      formData.append('content', submissionData.content);
    }
    
    if (submissionData.files) {
      submissionData.files.forEach(file => {
        formData.append('files', file);
      });
    }
    
    return apiClient.post<AssignmentSubmission>(`/assignments/${assignmentId}/submit`, formData);
  }

  // Get assignment submissions (Instructor)
  async getAssignmentSubmissions(assignmentId: string, params?: { page?: number; limit?: number }): Promise<ApiResponse<AssignmentSubmission[]>> {
    return apiClient.get<AssignmentSubmission[]>(`/assignments/${assignmentId}/submissions`, params);
  }

  // Get submission details
  async getSubmissionDetails(submissionId: string): Promise<ApiResponse<AssignmentSubmission>> {
    return apiClient.get<AssignmentSubmission>(`/assignments/submissions/${submissionId}`);
  }

  // Grade submission (Instructor)
  async gradeSubmission(submissionId: string, gradeData: GradeSubmissionData): Promise<ApiResponse<AssignmentSubmission>> {
    return apiClient.patch<AssignmentSubmission>(`/assignments/submissions/${submissionId}/grade`, gradeData);
  }
}

export const assignmentService = new AssignmentService();
