'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Save, 
  Eye, 
  Upload, 
  Video, 
  FileText, 
  HelpCircle,
  Award,
  Calendar,
  Download,
  Trash2,
  Edit3,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Settings,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Code,
  FileVideo,
  Mic,
  Image as ImageIcon,
  Link,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered
} from 'lucide-react';
import { courseService, Course, CourseSection, Lesson, QuizQuestion } from '../../services/courseService';
import teacherService from '../../services/teacherService';
import { videoService, VideoUpload } from '../../services/videoService';
import { useToast } from '../../hooks/useToast';
import CustomVideoPlayer from '../video/CustomVideoPlayer';

interface CourseBuilderProps {
  course?: Course;
  onSave?: (course: Course) => void;
  onPublish?: (course: Course) => void;
  isEditing?: boolean;
}

interface DragItem {
  type: 'section' | 'lesson';
  id: string;
  index: number;
  sectionIndex?: number;
}

export default function CourseBuilder({
  course,
  onSave,
  onPublish,
  isEditing = false
}: CourseBuilderProps) {
  const toast = useToast();
    const [courseData, setCourseData] = useState<Course>(course || {
    _id: '',
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    level: 'beginner',
    language: 'en',
    duration: '0h',
    lectures: 0,
    price: 0,
    currency: 'XAF',
    sections: [],
    requirements: [],
    learningOutcomes: [],
    learningObjectives: [],
    tags: [],
    status: 'draft',
    instructor: {
      _id: '',
      name: '',
      avatarUrl: '',
      role: 'instructor'
    },
    studentsEnrolled: 0,
    totalEnrollments: 0,
    rating: {
      average: 0,
      count: 0
    },
    ratingCount: 0,
    totalDuration: 0,
    isFeatured: false,
    createdAt: '',
    updatedAt: ''
  });

  // Get instructor info from localStorage
  useEffect(() => {
    const teacherInfo = localStorage.getItem('teacher_info');
    if (teacherInfo && !courseData.instructor?.name) {
      const instructor = JSON.parse(teacherInfo);
      setCourseData(prev => ({
        ...prev,
        instructor: {
          _id: instructor._id || instructor.id || '',
          name: instructor.name || instructor.firstName + ' ' + instructor.lastName || 'Instructor',
          avatarUrl: instructor.avatar || instructor.avatarUrl || '',
          role: 'instructor'
        }
      }));
    }
  }, []);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showLessonEditor, setShowLessonEditor] = useState(false);
  const [currentLessonType, setCurrentLessonType] = useState<'video' | 'text' | 'quiz' | 'assignment' | 'live_session' | 'download'>('video');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Rich Text Editor State
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState('');
  const [showRichTextToolbar, setShowRichTextToolbar] = useState(false);

  // Quiz Editor State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState<Partial<QuizQuestion>>({
    type: 'multiple_choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    points: 1
  });

  // Video Upload State
  const [uploadingVideo, setUploadingVideo] = useState<VideoUpload | null>(null);
  const [uploadContext, setUploadContext] = useState<'lesson' | 'preview' | 'thumbnail'>('lesson');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (course) {
      setCourseData(course);
    } else {
      // Set instructor data from localStorage
      const teacherInfo = localStorage.getItem('teacher_info');
      if (teacherInfo) {
        try {
          const teacher = JSON.parse(teacherInfo);
          setCourseData(prev => ({
            ...prev,
            instructor: {
              _id: teacher._id || teacher.id,
              name: teacher.name || `${teacher.firstName} ${teacher.lastName}`.trim(),
              avatarUrl: teacher.avatarUrl || teacher.profileImage,
              role: 'instructor'
            }
          }));
        } catch (error) {
          console.error('Error parsing teacher info:', error);
        }
      }
    }
  }, [course]);

  const addSection = () => {
    const newSection: CourseSection = {
      id: `section_${Date.now()}`,
      title: `Section ${courseData.sections.length + 1}`,
      description: '',
      order: courseData.sections.length,
      lessons: [],
      isLocked: false
    };

    setCourseData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));

    setActiveSection(newSection.id);
  };

  const updateSection = (sectionId: string, updates: Partial<CourseSection>) => {
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (sectionId: string) => {
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
    
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };

  const addLesson = (sectionId: string, type: Lesson['type'] = 'video') => {
    const section = courseData.sections.find(s => s.id === sectionId);
    if (!section) return;

    const newLesson: Lesson = {
      id: `lesson_${Date.now()}`,
      title: `New ${type} Lesson`,
      description: '',
      type,
      order: section.lessons.length,
      duration: 0,
      content: {},
      isPreview: false,
      isCompleted: false,
      attachments: []
    };

    updateSection(sectionId, {
      lessons: [...section.lessons, newLesson]
    });

    setActiveLesson(newLesson.id);
    setCurrentLessonType(type);
    setShowLessonEditor(true);
  };

  const updateLesson = (sectionId: string, lessonId: string, updates: Partial<Lesson>) => {
    const section = courseData.sections.find(s => s.id === sectionId);
    if (!section) return;

    const updatedLessons = section.lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
    );

    updateSection(sectionId, { lessons: updatedLessons });
  };

  const deleteLesson = (sectionId: string, lessonId: string) => {
    const section = courseData.sections.find(s => s.id === sectionId);
    if (!section) return;

    const updatedLessons = section.lessons.filter(lesson => lesson.id !== lessonId);
    updateSection(sectionId, { lessons: updatedLessons });

    if (activeLesson === lessonId) {
      setActiveLesson(null);
      setShowLessonEditor(false);
    }
  };

  const handleVideoUpload = async (file: File, lessonId: string) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const videoUpload = await videoService.uploadVideo(
        file,
        {
          title: file.name,
          description: `Video for lesson ${lessonId}`,
          watermarkEnabled: true,
          drmEnabled: true
        },
        (progress) => {
          setUploadProgress(progress);
        }
      );

      if (videoUpload.success) {
        setUploadingVideo(videoUpload.data);
        toast.success('Video uploaded successfully!');
        
        // Update the lesson with the video
        const sectionId = findSectionIdByLessonId(lessonId);
        if (sectionId) {
          updateLesson(sectionId, lessonId, {
            content: {
              video: {
                videoId: videoUpload.data.id,
                video: videoUpload.data
              }
            }
          });
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload video');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handlePreviewVideoUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const videoUpload = await teacherService.uploadVideo(file, (progress) => {
        setUploadProgress(progress);
      }) as any;

      if (videoUpload.success) {
        setCourseData(prev => ({
          ...prev,
          previewVideo: videoUpload.data
        }));
        toast.success('Preview video uploaded successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload preview video');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Use image upload endpoint
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://codingjojo-backend.onrender.com/api/teacher/upload/image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('teacher_token')}`,
        },
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setCourseData(prev => ({
          ...prev,
          thumbnail: result.data.url
        }));
        toast.success('Thumbnail uploaded successfully!');
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload thumbnail');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const findSectionIdByLessonId = (lessonId: string): string | null => {
    for (const section of courseData.sections) {
      if (section.lessons.some(lesson => lesson.id === lessonId)) {
        return section.id;
      }
    }
    return null;
  };

  const handleRichTextCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML);
    }
  };

  const addQuizQuestion = () => {
    if (!newQuestion.question?.trim()) {
      toast.error('Please enter a question');
      return;
    }

    const question: QuizQuestion = {
      id: `question_${Date.now()}`,
      type: newQuestion.type || 'multiple_choice',
      question: newQuestion.question,
      options: newQuestion.options || [],
      correctAnswer: newQuestion.correctAnswer || '',
      explanation: newQuestion.explanation || '',
      points: newQuestion.points || 1
    };

    setQuizQuestions(prev => [...prev, question]);
    
    // Reset form
    setNewQuestion({
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      points: 1
    });
  };

  const removeQuizQuestion = (questionId: string) => {
    setQuizQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const saveCourse = async () => {
    try {
      // Validate required fields
      if (!courseData.title.trim()) {
        toast.error('Course title is required');
        return;
      }
      
      if (!courseData.shortDescription?.trim()) {
        toast.error('Short description is required');
        return;
      }
      
      if (!courseData.category.trim()) {
        toast.error('Course category is required');
        return;
      }

      let savedCourse;
      
      if (isEditing && courseData._id) {
        const response = await teacherService.updateCourse(courseData._id, courseData);
        savedCourse = response.data;
        toast.success('Course updated successfully!');
      } else {
        const response = await teacherService.createCourse(courseData);
        savedCourse = response.data;
        setCourseData(prev => ({ ...prev, _id: savedCourse._id }));
        toast.success('Course saved successfully!');
      }
      
      if (onSave) {
        onSave(savedCourse);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save course');
    }
  };

  const publishCourse = async () => {
    try {
      // Validate required fields before publishing
      if (!courseData.title.trim()) {
        toast.error('Course title is required for publishing');
        return;
      }
      
      if (!courseData.shortDescription?.trim()) {
        toast.error('Short description is required for publishing');
        return;
      }
      
      if (!courseData.description?.trim()) {
        toast.error('Course description is required for publishing');
        return;
      }
      
      if (!courseData.category.trim()) {
        toast.error('Course category is required for publishing');
        return;
      }

      if (courseData.sections.length === 0) {
        toast.error('At least one section is required for publishing');
        return;
      }

      // Check if course has content
      const hasContent = courseData.sections.some(section => 
        section.lessons.length > 0
      );
      
      if (!hasContent) {
        toast.error('Course must have at least one lesson to publish');
        return;
      }

      let response;
      
      if (courseData._id) {
        // If course exists, update it first then publish
        await teacherService.updateCourse(courseData._id, { 
          ...courseData, 
          status: 'published' 
        });
        response = await teacherService.publishCourse(courseData._id);
      } else {
        // Create new course as published
        response = await teacherService.createCourse({ 
          ...courseData, 
          status: 'published' 
        });
        setCourseData(prev => ({ ...prev, _id: response.data._id }));
      }

      toast.success('Course published successfully!');
      
      if (onPublish) {
        onPublish(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to publish course');
    }
  };

  const renderLessonContent = (lesson: Lesson) => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="space-y-4">
            {lesson.content.video?.video ? (
              <div className="aspect-video bg-gray-100 rounded overflow-hidden border border-gray-300">
                <CustomVideoPlayer 
                  video={lesson.content.video.video}
                  controls={true}
                  watermark="Coding Jojo"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm mb-3">Upload a video for this lesson</p>
                  <button
                    onClick={() => {
                      setUploadContext('lesson');
                      fileInputRef.current?.click();
                    }}
                    disabled={isUploading}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded disabled:opacity-50"
                  >
                    {isUploading ? `Uploading... ${uploadProgress.toFixed(1)}%` : 'Upload Video'}
                  </button>
                </div>
              </div>
            )}
            
            {/* Video upload progress */}
            {isUploading && (
              <div className="bg-blue-50 p-3 rounded border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Uploading video...</span>
                  <span className="text-xs text-gray-600">{uploadProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Video transcript */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Video Transcript (Optional)
              </label>
              <textarea
                value={lesson.content.video?.transcript || ''}
                onChange={(e) => {
                  const sectionId = findSectionIdByLessonId(lesson.id);
                  if (sectionId) {
                    updateLesson(sectionId, lesson.id, {
                      content: {
                        ...lesson.content,
                        video: {
                          ...lesson.content.video,
                          transcript: e.target.value
                        }
                      }
                    });
                  }
                }}
                placeholder="Add video transcript for accessibility..."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                rows={4}
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-3">
            {/* Rich Text Toolbar */}
            <div className="bg-gray-50 p-2 rounded border border-gray-200">
              <div className="flex items-center space-x-1 mb-2">
                <button
                  onClick={() => handleRichTextCommand('bold')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                >
                  <Bold className="h-3.5 w-3.5 text-gray-600" />
                </button>
                <button
                  onClick={() => handleRichTextCommand('italic')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                >
                  <Italic className="h-3.5 w-3.5 text-gray-600" />
                </button>
                <button
                  onClick={() => handleRichTextCommand('underline')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                >
                  <Underline className="h-3.5 w-3.5 text-gray-600" />
                </button>
                <div className="border-l border-gray-300 h-4 mx-1" />
                <button
                  onClick={() => handleRichTextCommand('justifyLeft')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                >
                  <AlignLeft className="h-3.5 w-3.5 text-gray-600" />
                </button>
                <button
                  onClick={() => handleRichTextCommand('justifyCenter')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                >
                  <AlignCenter className="h-3.5 w-3.5 text-gray-600" />
                </button>
                <button
                  onClick={() => handleRichTextCommand('justifyRight')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                >
                  <AlignRight className="h-3.5 w-3.5 text-gray-600" />
                </button>
                <div className="border-l border-gray-300 h-4 mx-1" />
                <button
                  onClick={() => handleRichTextCommand('insertUnorderedList')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                >
                  <List className="h-3.5 w-3.5 text-gray-600" />
                </button>
                <button
                  onClick={() => handleRichTextCommand('insertOrderedList')}
                  className="p-1.5 hover:bg-gray-200 rounded"
                >
                  <ListOrdered className="h-3.5 w-3.5 text-gray-600" />
                </button>
              </div>
              
              {/* Rich Text Editor */}
              <div
                ref={editorRef}
                contentEditable
                className="min-h-[200px] p-3 bg-white border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-blue-500 text-sm"
                style={{ whiteSpace: 'pre-wrap' }}
                onInput={(e) => {
                  const content = (e.target as HTMLDivElement).innerHTML;
                  setEditorContent(content);
                  
                  const sectionId = findSectionIdByLessonId(lesson.id);
                  if (sectionId) {
                    updateLesson(sectionId, lesson.id, {
                      content: {
                        ...lesson.content,
                        text: {
                          content,
                          estimatedReadTime: Math.ceil(content.length / 200)
                        }
                      }
                    });
                  }
                }}
                dangerouslySetInnerHTML={{ __html: lesson.content.text?.content || 'Start typing your lesson content...' }}
              />
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            {/* Quiz Settings */}
            <div className="bg-gray-800 p-4 ">
              <h3 className="font-semibold text-white mb-4">Quiz Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={lesson.content.quiz?.passingScore || 70}
                    onChange={(e) => {
                      const sectionId = findSectionIdByLessonId(lesson.id);
                      if (sectionId) {
                        updateLesson(sectionId, lesson.id, {
                          content: {
                            ...lesson.content,
                            quiz: {
                              ...lesson.content.quiz,
                              passingScore: parseInt(e.target.value)
                            }
                          }
                        });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={lesson.content.quiz?.timeLimit || 0}
                    onChange={(e) => {
                      const sectionId = findSectionIdByLessonId(lesson.id);
                      if (sectionId) {
                        updateLesson(sectionId, lesson.id, {
                          content: {
                            ...lesson.content,
                            quiz: {
                              ...lesson.content.quiz,
                              timeLimit: parseInt(e.target.value) || undefined
                            }
                          }
                        });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600  text-white"
                  />
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 mt-6">
                    <input
                      type="checkbox"
                      checked={lesson.content.quiz?.allowRetakes || false}
                      onChange={(e) => {
                        const sectionId = findSectionIdByLessonId(lesson.id);
                        if (sectionId) {
                          updateLesson(sectionId, lesson.id, {
                            content: {
                              ...lesson.content,
                              quiz: {
                                ...lesson.content.quiz,
                                allowRetakes: e.target.checked
                              }
                            }
                          });
                        }
                      }}
                      className="rounded bg-gray-700 border-gray-600 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-sm text-gray-300">Allow Retakes</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-gray-800 p-4 ">
              <h3 className="font-semibold text-white mb-4">Questions ({quizQuestions.length})</h3>
              
              {quizQuestions.map((question, index) => (
                <div key={question.id} className="bg-gray-700 p-4  mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-400">Question {index + 1}</span>
                        <span className="px-2 py-1 bg-gray-600 rounded text-xs text-gray-300">
                          {question.type.replace('_', ' ')}
                        </span>
                        <span className="px-2 py-1 bg-pink-600 rounded text-xs text-white">
                          {question.points} pts
                        </span>
                      </div>
                      <p className="text-white mb-2">{question.question}</p>
                      
                      {question.type === 'multiple_choice' && (
                        <div className="space-y-1">
                          {question.options?.map((option, optIndex) => (
                            <div key={optIndex} className={`p-2 rounded text-sm ${
                              option === question.correctAnswer 
                                ? 'bg-blue-600/20 text-blue-300' 
                                : 'bg-gray-600 text-gray-300'
                            }`}>
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {question.explanation && (
                        <p className="text-gray-400 text-sm mt-2 italic">
                          Explanation: {question.explanation}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => removeQuizQuestion(question.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Question Form */}
              <div className="bg-gray-700 p-4 ">
                <h4 className="font-medium text-white mb-3">Add New Question</h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Question Type
                      </label>
                      <select
                        value={newQuestion.type}
                        onChange={(e) => setNewQuestion(prev => ({ 
                          ...prev, 
                          type: e.target.value as QuizQuestion['type']
                        }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500  text-white"
                      >
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="true_false">True/False</option>
                        <option value="short_answer">Short Answer</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Points
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newQuestion.points}
                        onChange={(e) => setNewQuestion(prev => ({ 
                          ...prev, 
                          points: parseInt(e.target.value) || 1
                        }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500  text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Question
                    </label>
                    <textarea
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion(prev => ({ 
                        ...prev, 
                        question: e.target.value
                      }))}
                      placeholder="Enter your question..."
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500  text-white"
                      rows={3}
                    />
                  </div>
                  
                  {newQuestion.type === 'multiple_choice' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Answer Options
                      </label>
                      <div className="space-y-2">
                        {newQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={newQuestion.correctAnswer === option}
                              onChange={() => setNewQuestion(prev => ({ 
                                ...prev, 
                                correctAnswer: option
                              }))}
                              className="text-pink-600 focus:ring-pink-500"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(newQuestion.options || [])];
                                newOptions[index] = e.target.value;
                                setNewQuestion(prev => ({ 
                                  ...prev, 
                                  options: newOptions
                                }));
                              }}
                              placeholder={`Option ${String.fromCharCode(65 + index)}`}
                              className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500  text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Explanation (Optional)
                    </label>
                    <textarea
                      value={newQuestion.explanation}
                      onChange={(e) => setNewQuestion(prev => ({ 
                        ...prev, 
                        explanation: e.target.value
                      }))}
                      placeholder="Explain the correct answer..."
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500  text-white"
                      rows={2}
                    />
                  </div>
                  
                  <button
                    onClick={addQuizQuestion}
                    className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white "
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-400">Select a lesson type to start creating content</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="bg-white border border-gray-200  shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                  {isEditing ? 'Edit Course' : 'Create Course'}
                </h1>
                <p className="text-gray-600 text-sm">
                  Build engaging courses with videos, quizzes, and assignments
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={saveCourse}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </button>
              
              <button
                onClick={publishCourse}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded text-sm transition-all duration-200"
              >
                <Eye className="h-4 w-4" />
                <span>Publish Course</span>
              </button>
            </div>
          </div>
        </div>

        {/* Course Information Form */}
        <div className="bg-white border border-gray-200  shadow-sm p-4">
          <div className="flex items-center mb-4">
            <Settings className="h-4 w-4 text-blue-600 mr-2" />
            <h2 className="text-sm font-semibold text-gray-900">Course Information</h2>
          </div>
        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Course Title */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your course title..."
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Short Description *
                </label>
                <textarea
                  value={courseData.shortDescription}
                  onChange={(e) => setCourseData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your course..."
                  rows={3}
                  required
                />
              </div>

              {/* Category and Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Category *
                  </label>
                  <select
                    value={courseData.category}
                    onChange={(e) => setCourseData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="data-science">Data Science</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="web-development">Web Development</option>
                    <option value="artificial-intelligence">Artificial Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Level *
                  </label>
                  <select
                    value={courseData.level}
                    onChange={(e) => setCourseData(prev => ({ ...prev, level: e.target.value as Course['level'] }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Price and Language */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Price (XAF) *
                  </label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) => setCourseData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Language
                  </label>
                  <select
                    value={courseData.language}
                    onChange={(e) => setCourseData(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
              </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Full Description */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Course Description *
              </label>
              <textarea
                value={courseData.description}
                onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of what students will learn..."
                rows={4}
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={courseData.tags.join(', ')}
                onChange={(e) => setCourseData(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                }))}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, JavaScript, Frontend, etc."
              />
            </div>

            {/* Course Features */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                Course Features
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={courseData.isFeatured}
                  onChange={(e) => setCourseData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-4 h-4 rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Featured Course</span>
              </label>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Learning Outcomes (What students will achieve)
          </label>
          <div className="space-y-2">
            {courseData.learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => {
                    const newOutcomes = [...courseData.learningOutcomes];
                    newOutcomes[index] = e.target.value;
                    setCourseData(prev => ({ ...prev, learningOutcomes: newOutcomes }));
                  }}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Students will be able to..."
                />
                <button
                  onClick={() => {
                    const newOutcomes = courseData.learningOutcomes.filter((_, i) => i !== index);
                    setCourseData(prev => ({ ...prev, learningOutcomes: newOutcomes }));
                  }}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setCourseData(prev => ({ 
                  ...prev, 
                  learningOutcomes: [...prev.learningOutcomes, ''] 
                }));
              }}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Learning Outcome</span>
            </button>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Requirements (Prerequisites)
          </label>
          <div className="space-y-2">
            {courseData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => {
                    const newRequirements = [...courseData.requirements];
                    newRequirements[index] = e.target.value;
                    setCourseData(prev => ({ ...prev, requirements: newRequirements }));
                  }}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Basic knowledge of..."
                />
                <button
                  onClick={() => {
                    const newRequirements = courseData.requirements.filter((_, i) => i !== index);
                    setCourseData(prev => ({ ...prev, requirements: newRequirements }));
                  }}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setCourseData(prev => ({ 
                  ...prev, 
                  requirements: [...prev.requirements, ''] 
                }));
              }}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Requirement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Course Preview Video/Image */}
      <div className="bg-white  shadow-md border border-gray-200 p-4">
        <div className="flex items-center mb-4">
          <Video className="h-4 w-4 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Course Preview</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Video Upload/Link */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Preview Video (Optional)
            </label>
            
            {courseData.previewVideo ? (
              <div className="aspect-video bg-gray-100 rounded overflow-hidden border border-gray-300">
                <CustomVideoPlayer 
                  video={courseData.previewVideo}
                  controls={true}
                  watermark="Coding Jojo"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm mb-3">Upload a preview video or add a video link</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setUploadContext('preview');
                        fileInputRef.current?.click();
                      }}
                      disabled={isUploading}
                      className="block w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors disabled:opacity-50"
                    >
                      {isUploading ? `Uploading... ${uploadProgress.toFixed(1)}%` : 'Upload Video'}
                    </button>
                    
                    <div className="text-gray-400 text-xs">or</div>
                    
                    <input
                      type="url"
                      placeholder="Paste YouTube/Vimeo URL"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onBlur={(e) => {
                        if (e.target.value) {
                          setCourseData(prev => ({ 
                            ...prev, 
                            previewVideoUrl: e.target.value 
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Video upload progress */}
            {isUploading && (
              <div className="mt-3 bg-blue-50 p-3 rounded border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Uploading preview video...</span>
                  <span className="text-xs text-gray-600">{uploadProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Course Thumbnail */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Course Thumbnail
            </label>
            
            {courseData.thumbnail ? (
              <div className="aspect-video bg-gray-100 rounded overflow-hidden border border-gray-300 relative">
                <img 
                  src={courseData.thumbnail} 
                  alt="Course thumbnail"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setUploadContext('thumbnail');
                    thumbnailInputRef.current?.click();
                  }}
                  className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="aspect-video bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm mb-3">Upload course thumbnail</p>
                  <button 
                    onClick={() => {
                      setUploadContext('thumbnail');
                      thumbnailInputRef.current?.click();
                    }}
                    disabled={isUploading}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors disabled:opacity-50"
                  >
                    {isUploading && uploadContext === 'thumbnail' ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Post/Announcement */}
      <div className="bg-white  shadow-md border border-gray-200 p-4">
        <div className="flex items-center mb-4">
          <FileText className="h-4 w-4 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Course Announcement</h2>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Course Launch Post (Optional)
          </label>
          <p className="text-xs text-gray-500 mb-3">
            This will be posted to the community feed when you publish the course.
          </p>
          
          <div className="bg-gray-50 rounded border border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs">
                    {courseData.instructor?.name?.[0] || 'I'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-sm">{courseData.instructor?.name || 'Instructor'}</p>
                  <p className="text-gray-500 text-xs">Course Instructor</p>
                </div>
              </div>
              
              <textarea
                value={courseData.launchPost || ''}
                onChange={(e) => setCourseData(prev => ({ ...prev, launchPost: e.target.value }))}
                className="w-full bg-transparent text-gray-800 text-sm placeholder-gray-400 border-none outline-none resize-none"
                placeholder={`🎉 Excited to announce my new course: "${courseData.title || 'Your Course Title'}"!\n\n${courseData.shortDescription || 'Brief description of what students will learn...'}\n\n#CodingJojo #${courseData.category || 'Programming'}`}
                rows={5}
              />
            </div>
            
            <div className="p-4 bg-gray-750">
              {/* Course Card Preview */}
              <div className="bg-gray-700  p-4 border border-gray-600">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-14 bg-gray-600  flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {courseData.title || 'Course Title'}
                    </h4>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                      {courseData.shortDescription || 'Course description will appear here...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-pink-400 font-bold text-sm">
                        {courseData.price ? `${courseData.price.toLocaleString()} XAF` : 'Free'}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {courseData.level || 'Beginner'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Structure */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white  shadow-md border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Course Structure</h2>
              <button
                onClick={addSection}
                className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {courseData.sections.map((section, sectionIndex) => (
                <div key={section.id} className="bg-gray-50 rounded border border-gray-200">
                  <div className="p-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        className="flex-1 bg-transparent text-gray-800 text-sm font-medium focus:outline-none"
                      />
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setActiveSection(
                            activeSection === section.id ? null : section.id
                          )}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          {activeSection === section.id ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {activeSection === section.id && (
                      <div className="mt-2 space-y-1.5">
                        {section.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between p-2 bg-white rounded border">
                            <div className="flex items-center space-x-2">
                              {lesson.type === 'video' && <Video className="h-3.5 w-3.5 text-blue-500" />}
                              {lesson.type === 'text' && <FileText className="h-3.5 w-3.5 text-blue-500" />}
                              {lesson.type === 'quiz' && <HelpCircle className="h-3.5 w-3.5 text-blue-500" />}
                              {lesson.type === 'assignment' && <Award className="h-3.5 w-3.5 text-yellow-500" />}
                              
                              <span className="text-xs text-gray-700 truncate">{lesson.title}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => {
                                  setActiveLesson(lesson.id);
                                  setCurrentLessonType(lesson.type);
                                  setShowLessonEditor(true);
                                }}
                                className="p-1 text-gray-500 hover:text-gray-700"
                              >
                                <Edit3 className="h-3 w-3" />
                              </button>
                              
                              <button
                                onClick={() => deleteLesson(section.id, lesson.id)}
                                className="p-1 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {/* Add Lesson Buttons */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          <button
                            onClick={() => addLesson(section.id, 'video')}
                            className="flex items-center space-x-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded"
                          >
                            <Video className="h-3 w-3" />
                            <span>Video</span>
                          </button>
                          
                          <button
                            onClick={() => addLesson(section.id, 'text')}
                            className="flex items-center space-x-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded"
                          >
                            <FileText className="h-3 w-3" />
                            <span>Text</span>
                          </button>
                          
                          <button
                            onClick={() => addLesson(section.id, 'quiz')}
                            className="flex items-center space-x-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded"
                          >
                            <HelpCircle className="h-3 w-3" />
                            <span>Quiz</span>
                          </button>
                          
                          <button
                            onClick={() => addLesson(section.id, 'assignment')}
                            className="flex items-center space-x-1 px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-xs text-white rounded"
                          >
                            <Award className="h-3 w-3" />
                            <span>Assignment</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          {showLessonEditor && activeLesson ? (
            <div className="bg-white  shadow-md border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Edit {currentLessonType.charAt(0).toUpperCase() + currentLessonType.slice(1)} Lesson
                  </h2>
                  <p className="text-sm text-gray-600">
                    Create engaging content for your students
                  </p>
                </div>
                
                <button
                  onClick={() => setShowLessonEditor(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Lesson Title */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={courseData.sections
                    .find(s => s.lessons.some(l => l.id === activeLesson))
                    ?.lessons.find(l => l.id === activeLesson)?.title || ''}
                  onChange={(e) => {
                    const sectionId = findSectionIdByLessonId(activeLesson);
                    if (sectionId) {
                      updateLesson(sectionId, activeLesson, { title: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm"
                  placeholder="Enter lesson title..."
                />
              </div>

              {/* Lesson Content */}
              <div>
                {renderLessonContent(
                  courseData.sections
                    .find(s => s.lessons.some(l => l.id === activeLesson))
                    ?.lessons.find(l => l.id === activeLesson) || {} as Lesson
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white  shadow-md border border-gray-200 p-6 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Welcome to Course Builder
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Start by adding sections and lessons to structure your course content.
              </p>
              <button
                onClick={addSection}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm rounded"
              >
                Add Your First Section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Hidden file input for video upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (uploadContext === 'preview') {
              handlePreviewVideoUpload(file);
            } else if (activeLesson) {
              handleVideoUpload(file, activeLesson);
            }
          }
          // Reset file input
          e.target.value = '';
        }}
      />
      
      {/* Hidden thumbnail input */}
      <input
        ref={thumbnailInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && uploadContext === 'thumbnail') {
            handleThumbnailUpload(file);
          }
          // Reset file input
          e.target.value = '';
        }}
      />
    </div>
  );
}