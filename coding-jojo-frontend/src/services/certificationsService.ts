import api, { ApiResponse } from '../lib/api';

// Interface definitions
export interface Certificate {
  id: string;
  title: string;
  description: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  certificateUrl?: string;
  badgeUrl?: string;
  skills: string[];
  status: 'active' | 'expired' | 'revoked';
  verificationUrl?: string;
}

export interface CertificationProgram {
  id: string;
  title: string;
  description: string;
  provider: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  requirements: string[];
  benefits: string[];
  cost: number;
  currency: string;
  isAvailable: boolean;
  imageUrl?: string;
}

export interface CertificationProgress {
  programId: string;
  progress: number;
  completedModules: string[];
  totalModules: number;
  startDate: string;
  estimatedCompletion?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
}

class CertificationsService {
  // Get user's certificates
  async getCertificates(): Promise<Certificate[]> {
    try {
      const response: ApiResponse<Certificate[]> = await api.get('/certifications/certificates');
      return response.data || [];
    } catch (error) {
      console.error('Failed to get certificates:', error);
      throw error;
    }
  }

  // Get available certification programs
  async getCertificationPrograms(): Promise<CertificationProgram[]> {
    try {
      const response: ApiResponse<CertificationProgram[]> = await api.get('/certifications/programs');
      return response.data || [];
    } catch (error) {
      console.error('Failed to get certification programs:', error);
      throw error;
    }
  }

  // Get certification program details
  async getCertificationProgram(programId: string): Promise<CertificationProgram> {
    try {
      const response: ApiResponse<CertificationProgram> = await api.get(`/certifications/programs/${programId}`);
      return response.data!;
    } catch (error) {
      console.error('Failed to get certification program:', error);
      throw error;
    }
  }

  // Enroll in a certification program
  async enrollInProgram(programId: string): Promise<CertificationProgress> {
    try {
      const response: ApiResponse<CertificationProgress> = await api.post(`/certifications/programs/${programId}/enroll`);
      return response.data!;
    } catch (error) {
      console.error('Failed to enroll in program:', error);
      throw error;
    }
  }

  // Get user's certification progress
  async getCertificationProgress(): Promise<CertificationProgress[]> {
    try {
      const response: ApiResponse<CertificationProgress[]> = await api.get('/certifications/progress');
      return response.data || [];
    } catch (error) {
      console.error('Failed to get certification progress:', error);
      throw error;
    }
  }

  // Get progress for a specific program
  async getProgramProgress(programId: string): Promise<CertificationProgress> {
    try {
      const response: ApiResponse<CertificationProgress> = await api.get(`/certifications/progress/${programId}`);
      return response.data!;
    } catch (error) {
      console.error('Failed to get program progress:', error);
      throw error;
    }
  }

  // Update module completion
  async completeModule(programId: string, moduleId: string): Promise<CertificationProgress> {
    try {
      const response: ApiResponse<CertificationProgress> = await api.post(`/certifications/progress/${programId}/modules/${moduleId}/complete`);
      return response.data!;
    } catch (error) {
      console.error('Failed to complete module:', error);
      throw error;
    }
  }

  // Submit for certification
  async submitForCertification(programId: string, submissionData: any): Promise<Certificate> {
    try {
      const response: ApiResponse<Certificate> = await api.post(`/certifications/programs/${programId}/submit`, submissionData);
      return response.data!;
    } catch (error) {
      console.error('Failed to submit for certification:', error);
      throw error;
    }
  }

  // Verify a certificate
  async verifyCertificate(certificateId: string): Promise<{ isValid: boolean; details: Certificate | null }> {
    try {
      const response: ApiResponse<{ isValid: boolean; details: Certificate | null }> = await api.get(`/certifications/verify/${certificateId}`);
      return response.data || { isValid: false, details: null };
    } catch (error) {
      console.error('Failed to verify certificate:', error);
      throw error;
    }
  }

  // Download certificate
  async downloadCertificate(certificateId: string): Promise<string> {
    try {
      const response: ApiResponse<{ downloadUrl: string }> = await api.get(`/certifications/certificates/${certificateId}/download`);
      return response.data?.downloadUrl || '';
    } catch (error) {
      console.error('Failed to download certificate:', error);
      throw error;
    }
  }

  // Share certificate
  async shareCertificate(certificateId: string, platform: string): Promise<{ shareUrl: string }> {
    try {
      const response: ApiResponse<{ shareUrl: string }> = await api.post(`/certifications/certificates/${certificateId}/share`, { platform });
      return response.data!;
    } catch (error) {
      console.error('Failed to share certificate:', error);
      throw error;
    }
  }
}

export const certificationsService = new CertificationsService();
