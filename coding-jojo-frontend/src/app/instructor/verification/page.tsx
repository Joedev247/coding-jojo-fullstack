'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  User,
  FileText,
  Camera,
  Upload,
  AlertCircle,
  Send,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Shield,
  Award,
  Sparkles,
  GraduationCap,
  X,
  Menu
} from 'lucide-react';
import AnimatedBackground from '../../../components/ui/AnimatedBackground';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import InstructorNavbar from '../../../components/InstructorNavbar';
import { useToast } from '../../../hooks/useToast';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
  current: boolean;
}

interface VerificationData {
  isInitialized: boolean;
  verificationStatus: string;
  progressPercentage: number;
  completedSteps: {
    email: boolean;
    phone: boolean;
    personalInfo: boolean;
    idDocument: boolean;
    selfie: boolean;
    educationCertificate: boolean;
  };
  emailVerified: boolean;
  phoneVerified: boolean;
  personalInfoCompleted: boolean;
  idDocumentsUploaded: boolean;
  selfieUploaded: boolean;
  adminReview?: {
    status?: string;
    feedback?: string;
    reviewedAt?: string;
  };
  submittedAt?: string;
  lastUpdated?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function InstructorVerificationPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states for each step
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+237');
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: 'Cameroon',
      postalCode: ''
    }
  });

  const [idDocuments, setIdDocuments] = useState({
    documentType: 'national_id',
    frontImage: null as File | null,
    backImage: null as File | null
  });

  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [educationCertificate, setEducationCertificate] = useState<File | null>(null);
  const [educationDetails, setEducationDetails] = useState({
    certificateType: 'bachelors_degree',
    institutionName: '',
    fieldOfStudy: '',
    graduationYear: new Date().getFullYear(),
    gpa: ''
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    expertise: [] as string[],
    experience: 0,
    education: [] as any[],
    certifications: [] as any[],
    portfolio: {
      website: '',
      github: '',
      linkedin: '',
      projects: [] as any[]
    }
  });

  const steps: VerificationStep[] = [
    {
      id: 'email',
      title: 'Email Verification',
      description: 'Verify your email address',
      icon: Mail,
      completed: verificationData?.completedSteps?.email || false,
      current: currentStep === 0
    },
    {
      id: 'phone',
      title: 'Phone Verification',
      description: 'Verify your phone number',
      icon: Phone,
      completed: verificationData?.completedSteps?.phone || false,
      current: currentStep === 1
    },
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Provide your personal details',
      icon: User,
      completed: verificationData?.completedSteps?.personalInfo || false,
      current: currentStep === 2
    },
    {
      id: 'documents',
      title: 'ID Documents',
      description: 'Upload your ID documents',
      icon: FileText,
      completed: verificationData?.completedSteps?.idDocument || false,
      current: currentStep === 3
    },
    {
      id: 'selfie',
      title: 'Selfie Verification',
      description: 'Take a selfie for face verification',
      icon: Camera,
      completed: verificationData?.completedSteps?.selfie || false,
      current: currentStep === 4
    },
    {
      id: 'education',
      title: 'Education Certificate',
      description: 'Upload your highest level of education certificate',
      icon: GraduationCap,
      completed: verificationData?.completedSteps?.educationCertificate || false,
      current: currentStep === 5
    }
  ];

  useEffect(() => {
    setMounted(true);
    // Get user info from localStorage
    const teacherInfo = localStorage.getItem('teacher_info');
    if (teacherInfo) {
      const info = JSON.parse(teacherInfo);
      setUserName(info.fullName || info.firstName || 'Instructor');
    }
    fetchVerificationStatus();
  }, []);

  useEffect(() => {
    if (verificationData?.isInitialized) {
      // Find the first incomplete step
      const firstIncompleteStep = steps.findIndex(step => !step.completed);
      console.log('🔍 Step calculation:', {
        firstIncompleteStep,
        verificationStatus: verificationData.verificationStatus,
        completedSteps: verificationData.completedSteps,
        stepsCompleted: steps.map(s => ({ id: s.id, completed: s.completed }))
      });
      
      // If there are incomplete steps, allow navigation to them
      if (firstIncompleteStep !== -1 && verificationData.verificationStatus !== 'approved') {
        setCurrentStep(firstIncompleteStep);
      } else if (verificationData.verificationStatus === 'approved' || firstIncompleteStep === -1) {
        // All steps completed or approved - show completion/review step
        setCurrentStep(steps.length);
      }
    }
  }, [verificationData]);

  const fetchVerificationStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/verification/status`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        console.log('🔍 Verification status data:', data.data);
        setVerificationData(data.data);
      }
    } catch (error) {
      console.error('Error fetching verification status:', error);
    }
  };

  const initializeVerification = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Phone number is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/verification/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(),
          countryCode
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Verification process initialized successfully!');
        fetchVerificationStatus();
        setCurrentStep(0);
      } else {
        toast.error(data.error || 'Failed to initialize verification');
      }
    } catch (error) {
      toast.error('Error initializing verification');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('teacher_token');
    localStorage.removeItem('teacher_info');
    router.push('/instructor/login');
    toast.success('Logged out successfully');
  };

  const sendEmailCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/verification/email/send-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Verification code sent to your email!');
      } else if (data.error === 'Email is already verified') {
        // Email is already verified, refresh status and move forward
        toast.success('Your email is already verified!');
        await fetchVerificationStatus();
        // The useEffect will handle moving to the next step based on updated verification data
      } else {
        toast.error(data.error || 'Failed to send verification code');
      }
    } catch (error) {
      toast.error('Error sending verification code');
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailCode = async () => {
    if (!emailCode.trim()) {
      toast.error('Please enter the verification code');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/verification/email/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        },
        body: JSON.stringify({
          code: emailCode.trim()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Email verified successfully!');
        fetchVerificationStatus();
        setCurrentStep(1);
        setEmailCode('');
      } else {
        toast.error(data.error || 'Invalid verification code');
      }
    } catch (error) {
      toast.error('Error verifying email code');
    } finally {
      setSubmitting(false);
    }
  };

  const sendPhoneCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/verification/phone/send-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Verification code sent to your phone!');
      } else {
        toast.error(data.error || 'Failed to send verification code');
      }
    } catch (error) {
      toast.error('Error sending verification code');
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneCode = async () => {
    if (!phoneCode.trim()) {
      toast.error('Please enter the verification code');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/verification/phone/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        },
        body: JSON.stringify({
          code: phoneCode.trim()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Phone number verified successfully!');
        fetchVerificationStatus();
        setCurrentStep(2);
        setPhoneCode('');
      } else {
        toast.error(data.error || 'Invalid verification code');
      }
    } catch (error) {
      toast.error('Error verifying phone code');
    } finally {
      setSubmitting(false);
    }
  };

  const submitPersonalInfo = async () => {
    if (!personalInfo.firstName.trim() || !personalInfo.lastName.trim() || !personalInfo.dateOfBirth) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/verification/personal-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        },
        body: JSON.stringify(personalInfo)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Personal information submitted successfully!');
        fetchVerificationStatus();
        setCurrentStep(3);
      } else {
        toast.error(data.error || 'Failed to submit personal information');
      }
    } catch (error) {
      toast.error('Error submitting personal information');
    } finally {
      setSubmitting(false);
    }
  };

  const uploadIdDocuments = async () => {
    if (!idDocuments.frontImage && !idDocuments.backImage) {
      toast.error('Please upload at least one document image');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('documentType', idDocuments.documentType);
      
      if (idDocuments.frontImage) {
        formData.append('frontImage', idDocuments.frontImage);
      }
      
      if (idDocuments.backImage) {
        formData.append('backImage', idDocuments.backImage);
      }

      const response = await fetch(`${API_BASE_URL}/teacher/verification/id-documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('ID documents uploaded successfully!');
        await fetchVerificationStatus(); // Wait for status update
        setCurrentStep(4);
      } else {
        toast.error(data.error || 'Failed to upload ID documents');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading ID documents');
    } finally {
      setSubmitting(false);
    }
  };

  const uploadSelfie = async () => {
    if (!selfieImage) {
      toast.error('Please select a selfie image');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('selfie', selfieImage);

      const response = await fetch(`${API_BASE_URL}/teacher/verification/selfie`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Selfie uploaded successfully!');
        await fetchVerificationStatus(); // Wait for status update
        setCurrentStep(5); // Move to education certificate step
      } else {
        toast.error(data.error || 'Failed to upload selfie');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading selfie');
    } finally {
      setSubmitting(false);
    }
  };

  const uploadEducationCertificate = async () => {
    if (!educationCertificate) {
      toast.error('Please select an education certificate');
      return;
    }

    if (!educationDetails.institutionName.trim() || !educationDetails.fieldOfStudy.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('certificateDocument', educationCertificate);
      formData.append('certificateType', educationDetails.certificateType);
      formData.append('institutionName', educationDetails.institutionName);
      formData.append('fieldOfStudy', educationDetails.fieldOfStudy);
      formData.append('graduationYear', educationDetails.graduationYear.toString());
      if (educationDetails.gpa) {
        formData.append('gpa', educationDetails.gpa);
      }

      const response = await fetch(`${API_BASE_URL}/teacher/verification/education-certificate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Education certificate uploaded successfully!');
        await fetchVerificationStatus(); // Wait for status update
        
        // Reset form state after successful upload
        setEducationCertificate(null);
        setEducationDetails({
          certificateType: 'bachelors_degree',
          institutionName: '',
          fieldOfStudy: '',
          graduationYear: new Date().getFullYear(),
          gpa: ''
        });
        
        // Don't automatically jump to step 6 - let the natural flow handle it
        // The useEffect will set the correct step based on verification status
      } else {
        toast.error(data.error || 'Failed to upload education certificate');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading education certificate');
    } finally {
      setSubmitting(false);
    }
  };

  const submitForReview = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/verification/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('teacher_token')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Verification submitted for review!');
        fetchVerificationStatus();
      } else {
        toast.error(data.error || 'Failed to submit for review');
      }
    } catch (error) {
      toast.error('Error submitting for review');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'under_review':
        return 'text-yellow-500';
      case 'in_progress':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'under_review':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen text-white relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="z-10 flex flex-col items-center">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  if (!verificationData?.isInitialized) {
    return (
      <div className="min-h-screen text-white">
        <AnimatedBackground />
        <InstructorNavbar />
        
        <div className="relative z-10 max-w-2xl mx-auto p-6 pt-20">
          <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50  p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Instructor Verification
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
              Complete our verification process to start teaching on Coding Jojo. This ensures trust and safety for all our students.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Country Code:</span>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                >
                  <option value="+237">🇨🇲 Cameroon (+237)</option>
                  <option value="+33">🇫🇷 France (+33)</option>
                  <option value="+1">🇺🇸 USA (+1)</option>
                  <option value="+44">🇬🇧 UK (+44)</option>
                </select>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <button
              onClick={initializeVerification}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white  font-medium transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Initializing...' : 'Start Verification Process'}
            </button>
            
            <div className="mt-6">
              <Link
                href="/instructor/instructor-courses"
                className="text-gray-400 hover:text-gray-300 text-sm underline"
              >
                Skip for now (verification required for payments)
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      <InstructorNavbar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Header with status */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50  p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Instructor Verification
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className={`flex items-center space-x-2 ${getStatusColor(verificationData.verificationStatus)}`}>
                  {React.createElement(getStatusIcon(verificationData.verificationStatus), { className: "h-5 w-5" })}
                  <span className="capitalize font-medium">{verificationData.verificationStatus.replace('_', ' ')}</span>
                </span>
                <div className="text-gray-300 text-sm">
                  Progress: <span className="font-medium">{verificationData.progressPercentage}%</span>
                </div>
              </div>
            </div>
            
            <div className="text-left sm:text-right">
              {verificationData.submittedAt && (
                <div className="text-gray-400 text-sm">
                  Submitted: {new Date(verificationData.submittedAt).toLocaleDateString()}
                </div>
              )}
              {verificationData.adminReview?.reviewedAt && (
                <div className="text-gray-400 text-sm">
                  Reviewed: {new Date(verificationData.adminReview.reviewedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${verificationData.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps navigation */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50  p-4 sm:p-6 mb-8">
          <div className="flex items-center justify-between w-full">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.completed;
              const isCurrent = currentStep === index;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center w-full">
                    <div className={`
                      flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-200
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isCurrent 
                          ? 'bg-pink-500 border-pink-500 text-white' 
                          : 'bg-gray-700 border-gray-600 text-gray-400'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                      ) : (
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                      )}
                    </div>
                    <div className="mt-1 sm:mt-2 text-center px-1">
                      <div className={`text-xs sm:text-sm lg:text-base font-medium leading-tight ${isCompleted || isCurrent ? 'text-white' : 'text-gray-400'}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block mt-1 leading-tight">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-4 sm:w-6 lg:w-8 h-0.5 transition-all duration-200 mx-1 sm:mx-2
                      ${step.completed ? 'bg-green-500' : 'bg-gray-600'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Admin feedback */}
        {verificationData.adminReview?.feedback && (
          <div className={`
            mb-8 p-6  border
            ${verificationData.adminReview.status === 'approved' 
              ? 'bg-green-500/10 border-green-500/30' 
              : verificationData.adminReview.status === 'rejected'
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-yellow-500/10 border-yellow-500/30'
            }
          `}>
            <h3 className="text-lg font-semibold text-white mb-2">
              Admin Feedback
            </h3>
            <p className="text-gray-300">
              {verificationData.adminReview.feedback}
            </p>
          </div>
        )}

        {/* Current step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50  p-8"
          >
            {currentStep === 0 && !verificationData.completedSteps.email && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Email Verification</h2>
                <p className="text-gray-300 mb-6">
                  We'll send a verification code to your email address. Please enter the code to verify your email.
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={sendEmailCode}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white  font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Verification Code'}
                  </button>
                  
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      maxLength={6}
                    />
                    <button
                      onClick={verifyEmailCode}
                      disabled={submitting || !emailCode.trim()}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white  font-medium transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && !verificationData.completedSteps.phone && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Phone Verification</h2>
                <p className="text-gray-300 mb-6">
                  We'll send an SMS verification code to your phone number: {countryCode} {phoneNumber}
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={sendPhoneCode}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white  font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send SMS Code'}
                  </button>
                  
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      maxLength={6}
                    />
                    <button
                      onClick={verifyPhoneCode}
                      disabled={submitting || !phoneCode.trim()}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white  font-medium transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && !verificationData.completedSteps.personalInfo && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                <p className="text-gray-300 mb-6">
                  Please provide your personal details. This information will be used to verify your identity.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gender
                    </label>
                    <select
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nationality
                    </label>
                    <input
                      type="text"
                      value={personalInfo.nationality}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, nationality: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="e.g., Cameroonian"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-4">Address (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={personalInfo.address.city}
                          onChange={(e) => setPersonalInfo(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, city: e.target.value }
                          }))}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          value={personalInfo.address.country}
                          onChange={(e) => setPersonalInfo(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, country: e.target.value }
                          }))}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={submitPersonalInfo}
                    disabled={submitting}
                    className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white  font-medium transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Continue'}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && !verificationData.completedSteps.idDocument && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">ID Document Upload</h2>
                <p className="text-gray-300 mb-6">
                  Please upload clear photos of your government-issued ID document. Both front and back are required for most documents.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Document Type
                    </label>
                    <select
                      value={idDocuments.documentType}
                      onChange={(e) => setIdDocuments(prev => ({ ...prev, documentType: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="national_id">National ID Card</option>
                      <option value="passport">Passport</option>
                      <option value="drivers_license">Driver's License</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Front of ID *
                      </label>
                      <div className="border-2 border-dashed border-gray-600  p-6 text-center hover:border-pink-500 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setIdDocuments(prev => ({ ...prev, frontImage: e.target.files?.[0] || null }))}
                          className="hidden"
                          id="frontImage"
                        />
                        <label htmlFor="frontImage" className="cursor-pointer">
                          <span className="text-gray-300">
                            {idDocuments.frontImage ? idDocuments.frontImage.name : 'Click to upload front image'}
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Back of ID {idDocuments.documentType === 'passport' ? '(Optional)' : '*'}
                      </label>
                      <div className="border-2 border-dashed border-gray-600  p-6 text-center hover:border-pink-500 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setIdDocuments(prev => ({ ...prev, backImage: e.target.files?.[0] || null }))}
                          className="hidden"
                          id="backImage"
                        />
                        <label htmlFor="backImage" className="cursor-pointer">
                          <span className="text-gray-300">
                            {idDocuments.backImage ? idDocuments.backImage.name : 'Click to upload back image'}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30  p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-blue-300">
                        <p className="font-medium mb-1">Tips for better verification:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Ensure the document is well-lit and all text is readable</li>
                          <li>• Take photos directly above the document (avoid angles)</li>
                          <li>• Make sure all four corners of the document are visible</li>
                          <li>• Avoid glare or shadows on the document</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={uploadIdDocuments}
                    disabled={submitting || (!idDocuments.frontImage && !idDocuments.backImage)}
                    className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white  font-medium transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Uploading...' : 'Upload Documents'}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && !verificationData.completedSteps.selfie && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Selfie Verification</h2>
                <p className="text-gray-300 mb-6">
                  Take a clear selfie to verify your identity. This helps us match you with your ID document.
                </p>
                
                <div className="max-w-md mx-auto">
                  <div className="border-2 border-dashed border-gray-600  p-8 text-center hover:border-pink-500 transition-colors">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={(e) => setSelfieImage(e.target.files?.[0] || null)}
                      className="hidden"
                      id="selfieImage"
                    />
                    <label htmlFor="selfieImage" className="cursor-pointer">
                      <span className="text-gray-300 block mb-2">
                        {selfieImage ? selfieImage.name : 'Click to take or upload selfie'}
                      </span>
                      <span className="text-sm text-gray-400">
                        Use your device's camera or upload an existing photo
                      </span>
                    </label>
                  </div>
                  
                  <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30  p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="text-yellow-300">
                        <p className="font-medium mb-1">Selfie Guidelines:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Look directly at the camera</li>
                          <li>• Ensure your face is well-lit</li>
                          <li>• Remove glasses or hats if possible</li>
                          <li>• Use a neutral expression</li>
                          <li>• Make sure your face fills most of the frame</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={uploadSelfie}
                    disabled={submitting || !selfieImage}
                    className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white  font-medium transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Uploading...' : 'Upload Selfie'}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 5 && !verificationData.completedSteps.educationCertificate && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Education Certificate</h2>
                <p className="text-gray-300 mb-6">
                  Upload your highest level of education certificate as proof of your qualifications to teach.
                </p>
                
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Education Details Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Certificate Type *
                      </label>
                      <select
                        value={educationDetails.certificateType}
                        onChange={(e) => setEducationDetails(prev => ({ ...prev, certificateType: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        <option value="high_school_diploma">High School Diploma</option>
                        <option value="associate_degree">Associate Degree</option>
                        <option value="bachelors_degree">Bachelor's Degree</option>
                        <option value="masters_degree">Master's Degree</option>
                        <option value="phd_doctorate">PhD/Doctorate</option>
                        <option value="professional_certification">Professional Certification</option>
                        <option value="coding_bootcamp">Coding Bootcamp</option>
                        <option value="industry_certification">Industry Certification</option>
                        <option value="teaching_qualification">Teaching Qualification</option>
                        <option value="technical_diploma">Technical Diploma</option>
                        <option value="online_course_certificate">Online Course Certificate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Institution Name *
                      </label>
                      <input
                        type="text"
                        value={educationDetails.institutionName}
                        onChange={(e) => setEducationDetails(prev => ({ ...prev, institutionName: e.target.value }))}
                        placeholder="e.g., University of Cameroon"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Field of Study *
                      </label>
                      <input
                        type="text"
                        value={educationDetails.fieldOfStudy}
                        onChange={(e) => setEducationDetails(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                        placeholder="e.g., Computer Science"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Graduation Year *
                      </label>
                      <input
                        type="number"
                        value={educationDetails.graduationYear}
                        onChange={(e) => setEducationDetails(prev => ({ ...prev, graduationYear: parseInt(e.target.value) || new Date().getFullYear() }))}
                        min="1950"
                        max={new Date().getFullYear() + 10}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        GPA/Grade (Optional)
                      </label>
                      <input
                        type="text"
                        value={educationDetails.gpa}
                        onChange={(e) => setEducationDetails(prev => ({ ...prev, gpa: e.target.value }))}
                        placeholder="e.g., 3.8/4.0 or First Class"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>
                  
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-600 p-8 text-center hover:border-pink-500 transition-colors">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={(e) => setEducationCertificate(e.target.files?.[0] || null)}
                      className="hidden"
                      id="educationCertificate"
                    />
                    <label htmlFor="educationCertificate" className="cursor-pointer">
                      <span className="text-gray-300 block mb-2">
                        {educationCertificate ? educationCertificate.name : 'Click to upload certificate'}
                      </span>
                      <span className="text-sm text-gray-400">
                        Upload your degree, diploma, or certificate
                      </span>
                    </label>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-blue-300">
                        <p className="font-medium mb-1">Certificate Guidelines:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Upload your highest level of education</li>
                          <li>• Ensure the document is clear and readable</li>
                          <li>• Accepted formats: PDF, JPG, PNG, DOC, DOCX</li>
                          <li>• Official documents only (transcripts, diplomas, certificates)</li>
                          <li>• Maximum file size: 10MB</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={uploadEducationCertificate}
                    disabled={submitting || !educationCertificate || !educationDetails.institutionName.trim() || !educationDetails.fieldOfStudy.trim()}
                    className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Uploading...' : 'Upload Certificate'}
                  </button>
                </div>
              </div>
            )}

            {currentStep >= 6 && Object.values(verificationData.completedSteps).every(step => step) && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Verification Complete!
                </h2>
                
                {verificationData.verificationStatus === 'approved' ? (
                  <div>
                    <p className="text-gray-300 mb-6 text-lg">
                      🎉 Congratulations! Your instructor verification has been approved. You can now start creating and publishing courses on Coding Jojo.
                    </p>
                    
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => router.push('/instructor/instructor-courses')}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white  font-medium transition-all duration-200"
                      >
                        Go to Dashboard
                      </button>
                      
                      <button
                        onClick={() => router.push('/instructor/courses/create')}
                        className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white  font-medium transition-colors"
                      >
                        Create Your First Course
                      </button>
                    </div>
                  </div>
                ) : verificationData.verificationStatus === 'under_review' ? (
                  <div>
                    <p className="text-gray-300 mb-6 text-lg">
                      Your verification is now under admin review. This typically takes 1-3 business days. You'll receive an email notification once the review is complete.
                    </p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30  p-6 mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">What happens next?</h3>
                      <ul className="text-gray-300 space-y-2 text-left">
                        <li>• Our team will review your submitted documents</li>
                        <li>• We'll verify your identity and information</li>
                        <li>• You'll receive an email with the decision</li>
                        <li>• If approved, you can immediately start teaching</li>
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => router.push('/instructor/instructor-courses')}
                      className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white  font-medium transition-colors"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-300 mb-6 text-lg">
                      All verification steps are complete! Please submit your application for admin review.
                    </p>
                    
                    <button
                      onClick={submitForReview}
                      disabled={submitting}
                      className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white  font-medium transition-all duration-200 disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit for Review'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {currentStep < 6 && verificationData.verificationStatus !== 'approved' && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white  font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === (steps.length - 1) || !steps[currentStep]?.completed}
              className="flex items-center space-x-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white  font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
