'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Download, 
  Share2, 
  Calendar, 
  Clock, 
  User,
  CheckCircle,
  Star,
  Trophy,
  Medal,
  Crown,
  Zap,
  Target,
  BookOpen,
  GraduationCap,
  Users,
  TrendingUp,
  Eye,
  Printer,
  Mail,
  Link,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  QrCode,
  Palette,
  Type,
  Layout,
  Image as ImageIcon,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Save,
  RotateCcw,
  Grid,
  List as ListIcon
} from 'lucide-react';
import { courseService, Certificate, CertificateTemplate } from '../../services/courseService';
import { useToast } from '../../contexts/ToastContext';
import QRCode from 'qrcode';

interface CertificateGeneratorProps {
  courseId: string;
  courseName: string;
  instructorName: string;
  studentId?: string;
  studentName?: string;
  completionDate?: string;
  onCertificateGenerated?: (certificate: Certificate) => void;
}

interface CertificatePreview {
  id: string;
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: string;
  certificateId: string;
  verificationUrl: string;
  qrCode?: string;
}

const defaultTemplates: CertificateTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional certificate design with elegant borders',
    background: {
      type: 'color',
      value: '#ffffff',
      gradient: null,
      image: null
    },
    layout: {
      orientation: 'landscape',
      width: 800,
      height: 600,
      padding: 40,
      elements: [
        {
          type: 'title',
          content: 'Certificate of Completion',
          position: { x: 400, y: 80 },
          style: {
            fontSize: 32,
            fontFamily: 'serif',
            fontWeight: 'bold',
            color: '#1a365d',
            textAlign: 'center'
          }
        },
        {
          type: 'student_name',
          content: '{{studentName}}',
          position: { x: 400, y: 180 },
          style: {
            fontSize: 28,
            fontFamily: 'serif',
            fontWeight: 'normal',
            color: '#2d3748',
            textAlign: 'center'
          }
        },
        {
          type: 'course_name',
          content: '{{courseName}}',
          position: { x: 400, y: 280 },
          style: {
            fontSize: 24,
            fontFamily: 'serif',
            fontWeight: 'bold',
            color: '#e53e3e',
            textAlign: 'center'
          }
        }
      ]
    },
    customFields: [],
    createdAt: '',
    updatedAt: ''
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with gradients and modern typography',
    background: {
      type: 'gradient',
      value: null,
      gradient: {
        type: 'linear',
        colors: ['#667eea', '#764ba2'],
        direction: 45
      },
      image: null
    },
    layout: {
      orientation: 'landscape',
      width: 800,
      height: 600,
      padding: 40,
      elements: []
    },
    customFields: [],
    createdAt: '',
    updatedAt: ''
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with premium styling',
    background: {
      type: 'color',
      value: '#1a202c',
      gradient: null,
      image: null
    },
    layout: {
      orientation: 'landscape',
      width: 800,
      height: 600,
      padding: 40,
      elements: []
    },
    customFields: [],
    createdAt: '',
    updatedAt: ''
  }
];

export default function CertificateGenerator({
  courseId,
  courseName,
  instructorName,
  studentId,
  studentName,
  completionDate,
  onCertificateGenerated
}: CertificateGeneratorProps) {
  const { success: showSuccess, error: showError } = useToast();

  // Safety check: Return loading state if required props are missing
  if (!courseId || !courseName || !instructorName) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading certificate generator...</div>
      </div>
    );
  }
  
  // Certificate Management
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate | null>(
    (defaultTemplates && defaultTemplates.length > 0) ? defaultTemplates[0] : null
  );
  const [customTemplates, setCustomTemplates] = useState<CertificateTemplate[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Preview & Customization
  const [previewCertificate, setPreviewCertificate] = useState<CertificatePreview | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [showBulkGeneration, setShowBulkGeneration] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Bulk Generation
  const [bulkStudents, setBulkStudents] = useState<{
    name: string;
    email: string;
    completionDate: string;
  }[]>([]);
  
  // Template Editor
  const [editingTemplate, setEditingTemplate] = useState<CertificateTemplate | null>(null);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  
  // Sharing & Export
  const [shareModal, setShareModal] = useState<Certificate | null>(null);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'png' | 'jpg'>('pdf');

  useEffect(() => {
    loadCertificates();
    loadCustomTemplates();
    generatePreview();
  }, [courseId]);

  useEffect(() => {
    // Set default template if not already set
    if (!selectedTemplate && defaultTemplates && defaultTemplates.length > 0) {
      setSelectedTemplate(defaultTemplates[0]);
    }
  }, [defaultTemplates, selectedTemplate]);

  useEffect(() => {
    generatePreview();
  }, [selectedTemplate, studentName, courseName, instructorName, completionDate]);

  const loadCertificates = async () => {
    try {
      const response = await courseService.getCertificates(courseId);
      setCertificates(response.data);
    } catch (error: any) {
      showError(error.message || 'Failed to load certificates');
    }
  };

  const loadCustomTemplates = async () => {
    try {
      const response = await courseService.getCertificateTemplates();
      setCustomTemplates(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      // Custom templates are optional
      console.error('Failed to load custom templates:', error);
      setCustomTemplates([]);
    }
  };

  const generatePreview = async () => {
    if (!studentName) return;

    const certificateId = `CERT-${Date.now()}`;
    const verificationUrl = `${window.location.origin}/verify-certificate/${certificateId}`;
    
    try {
      const qrCode = await QRCode.toDataURL(verificationUrl);
      
      setPreviewCertificate({
        id: certificateId,
        studentName: studentName || 'Student Name',
        courseName: courseName || 'Course Name',
        instructorName: instructorName || 'Instructor Name',
        completionDate: completionDate || new Date().toISOString().split('T')[0],
        certificateId,
        verificationUrl,
        qrCode
      });
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const generateCertificate = async (studentData?: {
    studentId: string;
    studentName: string;
    studentEmail: string;
    completionDate: string;
  }) => {
    try {
      setIsGenerating(true);
      
      const certData = studentData || {
        studentId: studentId!,
        studentName: studentName!,
        studentEmail: '',
        completionDate: completionDate!
      };

      const response = await courseService.generateCertificate({
        courseId,
        studentId: certData.studentId,
        templateId: selectedTemplate?.id || 'classic',
        customData: {
          studentName: certData.studentName,
          courseName,
          instructorName,
          completionDate: certData.completionDate
        }
      });

      const certificate = response.data;
      setCertificates(prev => [...(prev || []), certificate]);
      
      showSuccess('Certificate generated successfully!');
      
      if (onCertificateGenerated) {
        onCertificateGenerated(certificate);
      }

      return certificate;
    } catch (error: any) {
      showError(error.message || 'Failed to generate certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBulkCertificates = async () => {
    try {
      setIsGenerating(true);
      const results = [];
      
      for (const student of bulkStudents) {
        if (student.name && student.email) {
          try {
            const certificate = await generateCertificate({
              studentId: `student_${Date.now()}_${Math.random()}`,
              studentName: student.name,
              studentEmail: student.email,
              completionDate: student.completionDate
            });
            
            if (certificate) {
              results.push(certificate);
            }
          } catch (error) {
            console.error(`Failed to generate certificate for ${student.name}:`, error);
          }
        }
      }
      
      showSuccess(`Generated ${results.length} certificates successfully!`);
      setBulkStudents([]);
      setShowBulkGeneration(false);
      
    } catch (error: any) {
      showError(error.message || 'Failed to generate bulk certificates');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCertificate = async (certificate: Certificate, format: 'pdf' | 'png' | 'jpg' = 'pdf') => {
    try {
      const response = await courseService.downloadCertificate(certificate.id, format);
      
      // Create download link
      const blob = new Blob([response.data], { 
        type: format === 'pdf' ? 'application/pdf' : `image/${format}` 
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${certificate.id}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      showSuccess(`Certificate downloaded as ${format.toUpperCase()}`);
    } catch (error: any) {
      showError(error.message || 'Failed to download certificate');
    }
  };

  const shareCertificate = async (certificate: Certificate, platform: string) => {
    const shareUrl = `${window.location.origin}/certificate/${certificate.id}`;
    const shareText = `I've completed ${courseName} and earned my certificate!`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(`Certificate: ${courseName}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
    };
    
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showSuccess('Link copied to clipboard!');
      } catch (error) {
        showError('Failed to copy link');
      }
    } else if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  const addBulkStudent = () => {
    setBulkStudents(prev => [...(prev || []), { name: '', email: '', completionDate: '' }]);
  };

  const updateBulkStudent = (index: number, field: string, value: string) => {
    setBulkStudents(prev => (prev || []).map((student, i) => 
      i === index ? { ...student, [field]: value } : student
    ));
  };

  const removeBulkStudent = (index: number) => {
    setBulkStudents(prev => (prev || []).filter((_, i) => i !== index));
  };

  const renderCertificatePreview = () => {
    if (!previewCertificate) return null;

    const template = selectedTemplate;
    const bg = template.background;
    
    let backgroundStyle: React.CSSProperties = {};
    
    if (bg.type === 'color') {
      backgroundStyle.backgroundColor = bg.value;
    } else if (bg.type === 'gradient' && bg.gradient) {
      const { colors, direction } = bg.gradient;
      backgroundStyle.background = `linear-gradient(${direction}deg, ${colors.join(', ')})`;
    } else if (bg.type === 'image' && bg.image) {
      backgroundStyle.backgroundImage = `url(${bg.image})`;
      backgroundStyle.backgroundSize = 'cover';
      backgroundStyle.backgroundPosition = 'center';
    }

    return (
      <div 
        className="relative border-4 border-yellow-400 shadow-2xl mx-auto"
        style={{
          width: `${template.layout.width}px`,
          height: `${template.layout.height}px`,
          ...backgroundStyle,
          transform: 'scale(0.8)',
          transformOrigin: 'top center'
        }}
      >
        {/* Certificate Border */}
        <div className="absolute inset-2 border-2 border-yellow-300 opacity-50" />
        <div className="absolute inset-4 border border-yellow-200 opacity-30" />
        
        {/* Header */}
        <div className="text-center pt-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-12 w-12 text-yellow-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Certificate of Completion</h1>
            <Award className="h-12 w-12 text-yellow-600 ml-3" />
          </div>
          
          <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
        </div>
        
        {/* Content */}
        <div className="text-center px-16">
          <p className="text-lg text-gray-600 mb-6">This is to certify that</p>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-gray-300 pb-2 inline-block">
            {previewCertificate?.studentName || 'Student Name'}
          </h2>
          
          <p className="text-lg text-gray-600 mb-4">has successfully completed the course</p>
          
          <h3 className="text-2xl font-bold text-pink-600 mb-8">
            {previewCertificate?.courseName || 'Course Name'}
          </h3>
          
          <div className="flex items-center justify-between px-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Date of Completion</p>
              <p className="text-lg font-semibold text-gray-700">
                {previewCertificate?.completionDate ? new Date(previewCertificate.completionDate).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Instructor</p>
              <p className="text-lg font-semibold text-gray-700">
                {previewCertificate?.instructorName || 'Instructor Name'}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Certificate ID</p>
              <p className="text-sm font-mono text-gray-600">
                {previewCertificate?.certificateId || 'CERT-000000'}
              </p>
            </div>
          </div>
        </div>
        
        {/* QR Code */}
        {previewCertificate.qrCode && (
          <div className="absolute bottom-4 right-4">
            <img 
              src={previewCertificate.qrCode} 
              alt="Verification QR Code"
              className="w-16 h-16"
            />
            <p className="text-xs text-gray-500 text-center mt-1">Verify</p>
          </div>
        )}
        
        {/* Decorative Elements */}
        <div className="absolute top-4 left-4">
          <Crown className="h-8 w-8 text-yellow-600" />
        </div>
        <div className="absolute top-4 right-4">
          <Trophy className="h-8 w-8 text-yellow-600" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Medal className="h-8 w-8 text-yellow-600" />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Certificate Generator</h1>
          <p className="text-gray-400">Create and manage course completion certificates</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white "
          >
            {viewMode === 'grid' ? <ListIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => setShowBulkGeneration(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white "
          >
            <Users className="h-4 w-4" />
            <span>Bulk Generate</span>
          </button>
          
          <button
            onClick={() => setShowTemplateEditor(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white "
          >
            <Palette className="h-4 w-4" />
            <span>Template Editor</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Certificate Templates */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-gray-800 p-4 ">
            <h2 className="text-lg font-semibold text-white mb-4">Certificate Templates</h2>
            
            <div className="space-y-3">
              {[...(defaultTemplates || []), ...(Array.isArray(customTemplates) ? customTemplates : [])].map((template) => (
                <div
                  key={template.id}
                  className={`p-3  cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id
                      ? 'bg-pink-600 border-pink-500'
                      : 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                  } border-2`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <h3 className="font-medium text-white">{template.name}</h3>
                  <p className="text-sm text-gray-400">{template.description}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{template.layout.orientation}</span>
                      <span>•</span>
                      <span>{template.layout.width}x{template.layout.height}</span>
                    </div>
                    
                    {selectedTemplate?.id === template.id && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Student Information */}
            {studentName && (
              <div className="mt-6 p-4 bg-gray-700 ">
                <h3 className="font-medium text-white mb-3">Student Information</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{studentName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Course:</span>
                    <span className="text-white">{courseName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Instructor:</span>
                    <span className="text-white">{instructorName}</span>
                  </div>
                  
                  {completionDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completed:</span>
                      <span className="text-white">
                        {new Date(completionDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => generateCertificate()}
                  disabled={isGenerating || !studentId}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:opacity-50 text-white "
                >
                  {isGenerating ? 'Generating...' : 'Generate Certificate'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="xl:col-span-2">
          <div className="bg-gray-800 p-6 ">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Certificate Preview</h2>
              
              <div className="flex items-center space-x-2">
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'png' | 'jpg')}
                  className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                >
                  <option value="pdf">PDF</option>
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                </select>
                
                <button
                  onClick={() => previewCertificate && downloadCertificate({ 
                    id: previewCertificate.id 
                  } as Certificate, exportFormat)}
                  disabled={!previewCertificate}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white  p-8 overflow-auto">
              {renderCertificatePreview()}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Certificates */}
      <div className="bg-gray-800 p-6 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            Generated Certificates ({certificates?.length || 0})
          </h2>
        </div>

        {!certificates || certificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No certificates generated yet</h3>
            <p className="text-gray-400">
              Generate certificates for students who have completed the course
            </p>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}`}>
            {(certificates || []).filter(cert => cert && cert.id).map((certificate) => (
              <div key={certificate.id} className={`bg-gray-700  p-4 ${
                viewMode === 'list' ? 'flex items-center justify-between' : ''
              }`}>
                <div className={`${viewMode === 'list' ? 'flex-1' : 'mb-3'}`}>
                  <h3 className="font-medium text-white">{certificate.studentName || 'Unknown Student'}</h3>
                  <p className="text-sm text-gray-400">{certificate.courseName || 'Unknown Course'}</p>
                  
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{certificate.issuedAt ? new Date(certificate.issuedAt).toLocaleDateString() : 'Unknown Date'}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{certificate.views || 0} views</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-2 ${viewMode === 'list' ? '' : 'justify-between'}`}>
                  <button
                    onClick={() => setShareModal(certificate)}
                    className="p-2 bg-pink-600 hover:bg-pink-700 text-white rounded"
                    title="Share Certificate"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => downloadCertificate(certificate)}
                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                    title="Download Certificate"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      // Open certificate verification page
                      window.open(`/verify-certificate/${certificate.id}`, '_blank');
                    }}
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
                    title="Verify Certificate"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bulk Generation Modal */}
      {showBulkGeneration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6  max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Bulk Certificate Generation</h2>
              <button
                onClick={() => setShowBulkGeneration(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Add students to generate certificates for:</p>
                <button
                  onClick={addBulkStudent}
                  className="flex items-center space-x-2 px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Student</span>
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {(bulkStudents || []).map((student, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-700 rounded">
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={student.name}
                      onChange={(e) => updateBulkStudent(index, 'name', e.target.value)}
                      className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                    
                    <input
                      type="email"
                      placeholder="Student Email"
                      value={student.email}
                      onChange={(e) => updateBulkStudent(index, 'email', e.target.value)}
                      className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                    
                    <input
                      type="date"
                      value={student.completionDate}
                      onChange={(e) => updateBulkStudent(index, 'completionDate', e.target.value)}
                      className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                    
                    <button
                      onClick={() => removeBulkStudent(index)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setShowBulkGeneration(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                
                <button
                  onClick={generateBulkCertificates}
                  disabled={isGenerating || !bulkStudents || bulkStudents.length === 0}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:opacity-50 text-white "
                >
                  {isGenerating ? 'Generating...' : `Generate ${bulkStudents?.length || 0} Certificates`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6  max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Share Certificate</h2>
              <button
                onClick={() => setShareModal(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => shareCertificate(shareModal, 'facebook')}
                  className="flex items-center justify-center space-x-2 p-3 bg-pink-600 hover:bg-pink-700 text-white "
                >
                  <Facebook className="h-5 w-5" />
                  <span>Facebook</span>
                </button>
                
                <button
                  onClick={() => shareCertificate(shareModal, 'twitter')}
                  className="flex items-center justify-center space-x-2 p-3 bg-blue-400 hover:bg-blue-500 text-white "
                >
                  <Twitter className="h-5 w-5" />
                  <span>Twitter</span>
                </button>
                
                <button
                  onClick={() => shareCertificate(shareModal, 'linkedin')}
                  className="flex items-center justify-center space-x-2 p-3 bg-blue-700 hover:bg-blue-800 text-white "
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </button>
                
                <button
                  onClick={() => shareCertificate(shareModal, 'email')}
                  className="flex items-center justify-center space-x-2 p-3 bg-gray-600 hover:bg-gray-700 text-white "
                >
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </button>
              </div>
              
              <button
                onClick={() => shareCertificate(shareModal, 'copy')}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-pink-600 hover:bg-pink-700 text-white "
              >
                <Copy className="h-5 w-5" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
