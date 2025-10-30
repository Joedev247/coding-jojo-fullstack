import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://codingjojo-backend.onrender.com/api';

interface VerificationInitRequest {
  phoneNumber: string;
  countryCode?: string;
}

interface PersonalInfoRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  nationality?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
}

interface ProfessionalInfoRequest {
  expertise?: string[];
  experience?: number;
  education?: Array<{
    degree: string;
    institution: string;
    graduationYear: number;
    certificate?: {
      url: string;
      publicId: string;
    };
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    issueDate: Date;
    expiryDate?: Date;
    credentialUrl?: string;
    certificate?: {
      url: string;
      publicId: string;
    };
  }>;
  portfolio?: {
    website?: string;
    github?: string;
    linkedin?: string;
    projects?: Array<{
      title: string;
      description: string;
      url: string;
      technologies: string[];
    }>;
  };
}

class VerificationService {
  private getAuthHeaders() {
    const token = localStorage.getItem('teacher_token') || localStorage.getItem('admin_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  private getFileUploadHeaders() {
    const token = localStorage.getItem('teacher_token') || localStorage.getItem('admin_token');
    return {
      'Authorization': `Bearer ${token}`
      // Don't set Content-Type for multipart/form-data - let browser set it
    };
  }

  // Initialize verification process
  async initializeVerification(data: VerificationInitRequest) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/initialize`,
        data,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to initialize verification');
    }
  }

  // Get verification status
  async getVerificationStatus() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacher/verification/status`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to get verification status');
    }
  }

  // Email verification
  async sendEmailVerificationCode() {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/email/send-code`,
        {},
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to send email verification code');
    }
  }

  async verifyEmailCode(code: string) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/email/verify`,
        { code },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to verify email code');
    }
  }

  // Phone verification
  async sendPhoneVerificationCode() {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/phone/send-code`,
        {},
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to send phone verification code');
    }
  }

  async verifyPhoneCode(code: string) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/phone/verify`,
        { code },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to verify phone code');
    }
  }

  // Personal information
  async submitPersonalInfo(data: PersonalInfoRequest) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/personal-info`,
        data,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to submit personal information');
    }
  }

  // ID document upload
  async uploadIdDocuments(documentType: string, frontImage?: File, backImage?: File) {
    try {
      const formData = new FormData();
      formData.append('documentType', documentType);
      
      if (frontImage) {
        formData.append('frontImage', frontImage);
      }
      
      if (backImage) {
        formData.append('backImage', backImage);
      }

      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/id-documents`,
        formData,
        { headers: this.getFileUploadHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to upload ID documents');
    }
  }

  // Selfie upload
  async uploadSelfie(selfieImage: File) {
    try {
      const formData = new FormData();
      formData.append('selfie', selfieImage);

      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/selfie`,
        formData,
        { headers: this.getFileUploadHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to upload selfie');
    }
  }

  // Professional information
  async submitProfessionalInfo(data: ProfessionalInfoRequest) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/professional-info`,
        data,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to submit professional information');
    }
  }

  // Submit for review
  async submitForReview() {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teacher/verification/submit`,
        {},
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to submit for review');
    }
  }

  // Admin methods
  async getAllVerifications(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  } = {}) {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await axios.get(
        `${API_BASE_URL}/admin/verifications?${queryParams}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to get verifications');
    }
  }

  async getVerificationById(id: string) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/verifications/${id}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to get verification details');
    }
  }

  async approveVerification(id: string, feedback?: string) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/verifications/${id}/approve`,
        { feedback },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to approve verification');
    }
  }

  async rejectVerification(id: string, reason: string, allowResubmission = true) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/verifications/${id}/reject`,
        { reason, allowResubmission },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to reject verification');
    }
  }

  async requestMoreInfo(id: string, message: string) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/verifications/${id}/request-info`,
        { message },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to request more information');
    }
  }

  async getVerificationStats(period = '30') {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/verifications/stats?period=${period}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to get verification stats');
    }
  }

  // Utility methods
  validatePhoneNumber(phoneNumber: string, countryCode = '+237'): string {
    // Remove all non-digit characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Check if it already includes country code
    if (cleaned.startsWith('+')) {
      return cleaned;
    }
    
    // For Cameroon numbers specifically
    if (countryCode === '+237') {
      if (cleaned.startsWith('237')) {
        return '+' + cleaned;
      } else if (cleaned.startsWith('6') && cleaned.length === 9) {
        return '+237' + cleaned;
      } else {
        throw new Error('Invalid Cameroon phone number format. Should be 9 digits starting with 6.');
      }
    }
    
    // For other countries, just prepend the country code
    return countryCode + cleaned;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateFileSize(file: File, maxSizeMB = 10): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  }

  validateImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
  }

  // Progress calculation helper
  calculateProgress(completedSteps: Record<string, boolean>): number {
    const totalSteps = Object.keys(completedSteps).length;
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    return Math.round((completedCount / totalSteps) * 100);
  }

  // Status formatting helpers
  formatStatus(status: string): string {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'approved':
        return 'blue';
      case 'rejected':
        return 'red';
      case 'under_review':
        return 'yellow';
      case 'in_progress':
        return 'blue';
      case 'pending':
        return 'gray';
      case 'suspended':
        return 'orange';
      default:
        return 'gray';
    }
  }

  // Date formatting helpers
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  }
}

// Create and export singleton instance
export const verificationService = new VerificationService();
export default verificationService;
