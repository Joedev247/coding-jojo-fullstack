const asyncHandler = require('express-async-handler');
const OpenAI = require('openai');
const User = require('../models/User');
const Course = require('../models/Course');

// Lazy initialize OpenAI only if API key exists to avoid startup crash
let openaiClient = null;
const getOpenAI = () => {
  if (openaiClient) return openaiClient;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  openaiClient = new OpenAI({ apiKey: key });
  return openaiClient;
};

// Utility to guard AI routes when key missing
const requireAI = (res) => {
  const client = getOpenAI();
  if (!client) {
    res.status(503).json({ success: false, error: 'AI service not configured. Set OPENAI_API_KEY.' });
    return null;
  }
  return client;
};

// @desc    Generate course outline using AI
// @route   POST /api/ai/course-outline
// @access  Private (Teachers only)
const generateCourseOutline = asyncHandler(async (req, res) => {
  const { courseTitle, courseDescription, targetAudience, duration, level } = req.body;

  if (!courseTitle || !courseDescription) {
    return res.status(400).json({
      success: false,
      error: 'Course title and description are required'
    });
  }

  const openai = requireAI(res); if (!openai) return; // guard

  try {
    const prompt = `
      Create a comprehensive course outline for the following course:
      
      Title: ${courseTitle}
      Description: ${courseDescription}
      Target Audience: ${targetAudience || 'General'}
      Duration: ${duration || 'Not specified'}
      Level: ${level || 'Intermediate'}
      
      Please provide:
      1. Course overview and learning objectives
      2. Detailed module breakdown with lessons
      3. Estimated time for each module
      4. Key topics and skills covered
      5. Prerequisites (if any)
      6. Assessment methods
      7. Resources and materials needed
      
      Format the response as a structured JSON object with clear sections.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert course designer and educational consultant. Create detailed, professional course outlines that are engaging and pedagogically sound." },
        { role: "user", content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const outline = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        outline: outline,
        metadata: { courseTitle, courseDescription, targetAudience, duration, level, generatedAt: new Date() }
      }
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate course outline. Please try again.' });
  }
});

// @desc    Generate lesson content using AI
// @route   POST /api/ai/lesson-content
// @access  Private (Teachers only)
const generateLessonContent = asyncHandler(async (req, res) => {
  const { lessonTitle, learningObjectives, courseContext, duration, contentType } = req.body;

  if (!lessonTitle || !learningObjectives) {
    return res.status(400).json({ success: false, error: 'Lesson title and learning objectives are required' });
  }

  const openai = requireAI(res); if (!openai) return; // guard

  try {
    const prompt = `
      Create detailed lesson content for:
      
      Lesson Title: ${lessonTitle}
      Learning Objectives: ${learningObjectives}
      Course Context: ${courseContext || 'General course'}
      Duration: ${duration || '30 minutes'}
      Content Type: ${contentType || 'Mixed (text, examples, exercises)'}
      
      Please provide:
      1. Lesson introduction and hook
      2. Main content organized in clear sections
      3. Practical examples and demonstrations
      4. Interactive elements and activities
      5. Assessment questions or exercises
      6. Summary and key takeaways
      7. Additional resources and further reading
      
      Make the content engaging, practical, and pedagogically sound.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert instructional designer. Create engaging, comprehensive lesson content that promotes active learning and practical application." },
        { role: "user", content: prompt }
      ],
      max_tokens: 2500,
      temperature: 0.7
    });

    const content = response.choices[0].message.content;

    res.status(200).json({ success: true, data: { content, metadata: { lessonTitle, learningObjectives, duration, contentType, generatedAt: new Date() } } });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate lesson content. Please try again.' });
  }
});

// @desc    Generate quiz questions using AI
// @route   POST /api/ai/quiz-questions
// @access  Private (Teachers only)
const generateQuizQuestions = asyncHandler(async (req, res) => {
  const { topic, difficultyLevel, questionCount, questionTypes, courseContext } = req.body;

  if (!topic || !questionCount) {
    return res.status(400).json({
      success: false,
      error: 'Topic and question count are required'
    });
  }

  const openai = requireAI(res); if (!openai) return; // guard

  try {
    const prompt = `
      Generate ${questionCount} quiz questions for the following topic:
      
      Topic: ${topic}
      Difficulty Level: ${difficultyLevel || 'Intermediate'}
      Question Types: ${questionTypes ? questionTypes.join(', ') : 'Multiple choice, True/False, Short answer'}
      Course Context: ${courseContext || 'General education'}
      
      For each question, provide:
      1. The question text
      2. Answer options (for multiple choice)
      3. Correct answer
      4. Brief explanation of the correct answer
      5. Learning objective being tested
      
      Format as a JSON array of question objects.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert assessment designer. Create fair, challenging, and educationally valuable quiz questions that accurately test understanding of the topic." },
        { role: "user", content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.6
    });

    const questions = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        questions: questions,
        metadata: {
          topic,
          difficultyLevel,
          questionCount,
          questionTypes,
          generatedAt: new Date()
        }
      }
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate quiz questions. Please try again.'
    });
  }
});

// @desc    Analyze course performance and provide suggestions
// @route   POST /api/ai/course-analysis
// @access  Private (Teachers only)
const analyzeCoursePerformance = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({
      success: false,
      error: 'Course ID is required'
    });
  }

  const openai = requireAI(res); if (!openai) return; // guard

  try {
    // Get course data
    const course = await Course.findById(courseId)
      .populate('enrolledStudents.student', 'name')
      .populate('ratings');

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check if teacher owns the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to analyze this course'
      });
    }

    // Prepare course data for analysis
    const courseData = {
      title: course.title,
      totalStudents: course.enrolledStudents.length,
      completionRate: course.enrolledStudents.filter(s => s.completed).length / course.enrolledStudents.length * 100,
      averageRating: course.rating.average,
      ratingsCount: course.rating.count,
      price: course.price,
      createdAt: course.createdAt,
      lastUpdated: course.updatedAt,
      sectionsCount: course.courseContent.length,
      totalLessons: course.courseContent.reduce((sum, section) => sum + section.lessons.length, 0)
    };

    const prompt = `
      Analyze the following course performance data and provide actionable insights:
      
      Course Data:
      ${JSON.stringify(courseData, null, 2)}
      
      Please provide:
      1. Overall performance assessment
      2. Strengths and areas for improvement
      3. Specific recommendations to increase engagement
      4. Pricing optimization suggestions
      5. Content improvement recommendations
      6. Marketing and promotion strategies
      7. Student retention strategies
      
      Be specific and actionable in your recommendations.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert educational analyst and course optimization specialist. Provide detailed, actionable insights based on course performance data." },
        { role: "user", content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const analysis = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        analysis: analysis,
        courseData: courseData,
        analyzedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Course Analysis Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze course performance. Please try again.'
    });
  }
});

// @desc    Generate personalized student feedback
// @route   POST /api/ai/student-feedback
// @access  Private (Teachers only)
const generateStudentFeedback = asyncHandler(async (req, res) => {
  const { studentId, courseId, performanceData, personalizedNotes } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({
      success: false,
      error: 'Student ID and Course ID are required'
    });
  }

  const openai = requireAI(res); if (!openai) return; // guard

  try {
    // Get student and course data
    const [student, course] = await Promise.all([
      User.findById(studentId),
      Course.findById(courseId)
    ]);

    if (!student || !course) {
      return res.status(404).json({
        success: false,
        error: 'Student or course not found'
      });
    }

    // Check if teacher owns the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to provide feedback for this course'
      });
    }

    const prompt = `
      Generate personalized feedback for a student based on their performance:
      
      Student: ${student.name}
      Course: ${course.title}
      Performance Data: ${JSON.stringify(performanceData, null, 2)}
      Teacher Notes: ${personalizedNotes || 'None provided'}
      
      Please provide:
      1. Acknowledgment of strengths and achievements
      2. Areas for improvement with specific suggestions
      3. Encouragement and motivation
      4. Next steps and learning recommendations
      5. Resources for continued learning
      
      Keep the tone encouraging, constructive, and personalized.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a supportive and experienced teacher providing personalized feedback to help students improve their learning outcomes." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.8
    });

    const feedback = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        feedback: feedback,
        studentName: student.name,
        courseName: course.title,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Feedback Generation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate student feedback. Please try again.'
    });
  }
});

// @desc    Generate course marketing content
// @route   POST /api/ai/marketing-content
// @access  Private (Teachers only)
const generateMarketingContent = asyncHandler(async (req, res) => {
  const { courseId, contentType, platform, tone } = req.body;

  if (!courseId || !contentType) {
    return res.status(400).json({
      success: false,
      error: 'Course ID and content type are required'
    });
  }

  const openai = requireAI(res); if (!openai) return; // guard

  try {
    const course = await Course.findById(courseId).populate('instructor', 'name');

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check if teacher owns the course
    if (course.instructor._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to generate marketing content for this course'
      });
    }

    const prompt = `
      Generate ${contentType} marketing content for the following course:
      
      Course Title: ${course.title}
      Description: ${course.description}
      Instructor: ${course.instructor.name}
      Category: ${course.category}
      Level: ${course.level}
      Price: $${course.price}
      Platform: ${platform || 'General'}
      Tone: ${tone || 'Professional and engaging'}
      
      Content Type: ${contentType}
      
      Please create compelling, engaging content that highlights the course benefits, target audience, and unique value proposition.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert marketing copywriter specializing in educational content. Create compelling, conversion-focused marketing materials." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.8
    });

    const content = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        content: content,
        contentType,
        platform,
        courseTitle: course.title,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Marketing Content Generation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate marketing content. Please try again.'
    });
  }
});

module.exports = {
  generateCourseOutline,
  generateLessonContent,
  generateQuizQuestions,
  analyzeCoursePerformance,
  generateStudentFeedback,
  generateMarketingContent
};
