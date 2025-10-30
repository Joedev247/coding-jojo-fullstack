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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900 text-xs">Loading certificate generator...</div>
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
        className="relative border-4 border-blue-400 shadow-xl mx-auto"
        style={{
          width: `${template.layout.width}px`,
          height: `${template.layout.height}px`,
          ...backgroundStyle,
          transform: 'scale(0.7)',
          transformOrigin: 'top center'
        }}
      >
        {/* Certificate Border */}
        <div className="absolute inset-2 border-2 border-blue-300 opacity-50" />
        <div className="absolute inset-4 border border-blue-200 opacity-30" />
        
        {/* Header */}
        <div className="text-center pt-8">
          <div className="flex items-center justify-center mb-3">
            <Award className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Certificate of Completion</h1>
            <Award className="h-8 w-8 text-blue-600 ml-2" />
          </div>
          
          <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-6" />
        </div>
        
        {/* Content */}
        <div className="text-center px-12">
          <p className="text-sm text-gray-600 mb-4">This is to certify that</p>
          
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-1 inline-block">
            {previewCertificate?.studentName || 'Student Name'}
          </h2>
          
          <p className="text-sm text-gray-600 mb-3">has successfully completed the course</p>
          
          <h3 className="text-lg font-bold text-blue-600 mb-6">
            {previewCertificate?.courseName || 'Course Name'}
          </h3>
          
          <div className="flex items-center justify-between px-6">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Date of Completion</p>
              <p className="text-sm font-semibold text-gray-700">
                {previewCertificate?.completionDate ? new Date(previewCertificate.completionDate).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Instructor</p>
              <p className="text-sm font-semibold text-gray-700">
                {previewCertificate?.instructorName || 'Instructor Name'}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
              <p className="text-xs font-mono text-gray-600">
                {previewCertificate?.certificateId || 'CERT-000000'}
              </p>
            </div>
          </div>
        </div>
        
        {/* QR Code */}
        {previewCertificate.qrCode && (
          <div className="absolute bottom-3 right-3">
            <img 
              src={previewCertificate.qrCode} 
              alt="Verification QR Code"
              className="w-12 h-12"
            />
            <p className="text-xs text-gray-500 text-center mt-0.5">Verify</p>
          </div>
        )}
        
        {/* Decorative Elements */}
        <div className="absolute top-3 left-3">
          <Crown className="h-6 w-6 text-blue-600" />
        </div>
        <div className="absolute top-3 right-3">
          <Trophy className="h-6 w-6 text-blue-600" />
        </div>
        <div className="absolute bottom-3 left-3">
          <Medal className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white  p-4 shadow-sm border border-gray-200">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Certificate Generator</h1>
          <p className="text-gray-600 text-sm">Create and manage course completion certificates</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700  border border-gray-200"
          >
            {viewMode === 'grid' ? <ListIcon className="h-3 w-3" /> : <Grid className="h-3 w-3" />}
          </button>
          
          <button
            onClick={() => setShowBulkGeneration(true)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm "
          >
            <Users className="h-3 w-3" />
            <span>Bulk Generate</span>
          </button>
          
          <button
            onClick={() => setShowTemplateEditor(true)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm "
          >
            <Palette className="h-3 w-3" />
            <span>Template Editor</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Certificate Templates */}
        <div className="xl:col-span-1 space-y-3">
          <div className="bg-white p-4  shadow-sm border border-gray-200">
            <h2 className="text-xs font-semibold text-gray-900 mb-3">Certificate Templates</h2>
            
            <div className="space-y-2">
              {[...(defaultTemplates || []), ...(Array.isArray(customTemplates) ? customTemplates : [])].map((template) => (
                <div
                  key={template.id}
                  className={`p-2 cursor-pointer transition-colors border  ${
                    selectedTemplate?.id === template.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <h3 className="font-medium text-gray-900 text-sm">{template.name}</h3>
                  <p className="text-xs text-gray-600">{template.description}</p>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span>{template.layout.orientation}</span>
                      <span>•</span>
                      <span>{template.layout.width}x{template.layout.height}</span>
                    </div>
                    
                    {selectedTemplate?.id === template.id && (
                      <CheckCircle className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Student Information */}
            {studentName && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 ">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">Student Information</h3>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="text-gray-900">{studentName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="text-gray-900">{courseName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Instructor:</span>
                    <span className="text-gray-900">{instructorName}</span>
                  </div>
                  
                  {completionDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="text-gray-900">
                        {new Date(completionDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => generateCertificate()}
                  disabled={isGenerating || !studentId}
                  className="w-full mt-3 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white text-sm "
                >
                  {isGenerating ? 'Generating...' : 'Generate Certificate'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="xl:col-span-2">
          <div className="bg-white p-4  shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-gray-900">Certificate Preview</h2>
              
              <div className="flex items-center space-x-2">
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'png' | 'jpg')}
                  className="px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-xs"
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
                  className="flex items-center space-x-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded text-xs"
                >
                  <Download className="h-3 w-3" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50  p-4 overflow-auto border border-gray-200">
              {renderCertificatePreview()}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Certificates */}
      <div className="bg-white p-4  shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-gray-900">
            Generated Certificates ({certificates?.length || 0})
          </h2>
        </div>

        {!certificates || certificates.length === 0 ? (
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-xs font-semibold text-gray-900 mb-1">No certificates generated yet</h3>
            <p className="text-gray-600 text-sm">
              Generate certificates for students who have completed the course
            </p>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3' : 'space-y-2'}`}>
            {(certificates || []).filter(cert => cert && cert.id).map((certificate) => (
              <div key={certificate.id} className={`bg-gray-50 border border-gray-200 p-3  ${
                viewMode === 'list' ? 'flex items-center justify-between' : ''
              }`}>
                <div className={`${viewMode === 'list' ? 'flex-1' : 'mb-2'}`}>
                  <h3 className="font-medium text-gray-900 text-sm">{certificate.studentName || 'Unknown Student'}</h3>
                  <p className="text-xs text-gray-600">{certificate.courseName || 'Unknown Course'}</p>
                  
                  <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-2.5 w-2.5" />
                      <span>{certificate.issuedAt ? new Date(certificate.issuedAt).toLocaleDateString() : 'Unknown Date'}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Eye className="h-2.5 w-2.5" />
                      <span>{certificate.views || 0} views</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-1 ${viewMode === 'list' ? '' : 'justify-between'}`}>
                  <button
                    onClick={() => setShareModal(certificate)}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    title="Share Certificate"
                  >
                    <Share2 className="h-3 w-3" />
                  </button>
                  
                  <button
                    onClick={() => downloadCertificate(certificate)}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    title="Download Certificate"
                  >
                    <Download className="h-3 w-3" />
                  </button>
                  
                  <button
                    onClick={() => {
                      // Open certificate verification page
                      window.open(`/verify-certificate/${certificate.id}`, '_blank');
                    }}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    title="Verify Certificate"
                  >
                    <CheckCircle className="h-3 w-3" />
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
          <div className="bg-white p-4  max-w-3xl w-full mx-4 max-h-[85vh] overflow-y-auto shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-gray-900">Bulk Certificate Generation</h2>
              <button
                onClick={() => setShowBulkGeneration(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm">Add students to generate certificates for:</p>
                <button
                  onClick={addBulkStudent}
                  className="flex items-center space-x-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Student</span>
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(bulkStudents || []).map((student, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 bg-gray-50 border border-gray-200 rounded">
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={student.name}
                      onChange={(e) => updateBulkStudent(index, 'name', e.target.value)}
                      className="px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                    />
                    
                    <input
                      type="email"
                      placeholder="Student Email"
                      value={student.email}
                      onChange={(e) => updateBulkStudent(index, 'email', e.target.value)}
                      className="px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                    />
                    
                    <input
                      type="date"
                      value={student.completionDate}
                      onChange={(e) => updateBulkStudent(index, 'completionDate', e.target.value)}
                      className="px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                    />
                    
                    <button
                      onClick={() => removeBulkStudent(index)}
                      className="p-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowBulkGeneration(false)}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel
                </button>
                
                <button
                  onClick={generateBulkCertificates}
                  disabled={isGenerating || !bulkStudents || bulkStudents.length === 0}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white text-sm rounded"
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
          <div className="bg-white p-4  max-w-sm w-full mx-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-gray-900">Share Certificate</h2>
              <button
                onClick={() => setShareModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => shareCertificate(shareModal, 'facebook')}
                  className="flex items-center justify-center space-x-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                >
                  <Facebook className="h-3 w-3" />
                  <span>Facebook</span>
                </button>
                
                <button
                  onClick={() => shareCertificate(shareModal, 'twitter')}
                  className="flex items-center justify-center space-x-1 p-2 bg-blue-400 hover:bg-blue-500 text-white rounded text-xs"
                >
                  <Twitter className="h-3 w-3" />
                  <span>Twitter</span>
                </button>
                
                <button
                  onClick={() => shareCertificate(shareModal, 'linkedin')}
                  className="flex items-center justify-center space-x-1 p-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs"
                >
                  <Linkedin className="h-3 w-3" />
                  <span>LinkedIn</span>
                </button>
                
                <button
                  onClick={() => shareCertificate(shareModal, 'email')}
                  className="flex items-center justify-center space-x-1 p-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs"
                >
                  <Mail className="h-3 w-3" />
                  <span>Email</span>
                </button>
              </div>
              
              <button
                onClick={() => shareCertificate(shareModal, 'copy')}
                className="w-full flex items-center justify-center space-x-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
              >
                <Copy className="h-3 w-3" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
