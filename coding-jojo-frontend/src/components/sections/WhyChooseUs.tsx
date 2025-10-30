'use client';
import React, { useState, useEffect, ReactElement, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { 
  CheckCircle, Star, Award, Users, Clock, Shield, 
  Sparkles, Code, GitBranch, BrainCircuit, GraduationCap, Bot, ArrowRight
} from 'lucide-react';

interface Feature {
  icon: ReactElement;
  title: string;
  description: string;
  color: string;
  secondaryColor: string;
  codeSnippet: string;
  stats: Array<{ label: string; value: string }>;
}

export function WhyChooseUsSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [techStackElements, setTechStackElements] = useState<ReactElement[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Tech stack items that appear in the background - now wrapped in useMemo
  const techStack = useMemo(() => [
    "JavaScript", "TypeScript", "Python", "React", "Node.js", 
    "GraphQL", "MongoDB", "AWS", "Docker", "Kubernetes", 
    "Redux", "Next.js", "Vue", "Angular", "Express", 
    "SQL", "NoSQL", "Git", "CI/CD", "REST API", 
    "Serverless", "WebSockets", "TDD", "Agile", "DevOps"
  ], []);

  // Generate tech stack elements on client-side only
  useEffect(() => {
    if (mounted) {
      const elements = techStack.map((tech, i) => (
        <div 
          key={i}
          className="absolute text-gray-500 font-mono text-xs opacity-30 transition-opacity duration-500"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 20 - 10}deg)`
          }}
        >
          {tech}
        </div>
      ));
      setTechStackElements(elements);
    }
  }, [techStack, mounted]);

  // Memoize features array to prevent unnecessary re-renders
  const features: Feature[] = useMemo(() => [
    {
      icon: <BrainCircuit className="h-4 w-4 text-white" />,
      title: "AI-Powered Learning Paths",
      description: "Adaptive curriculum that evolves with your progress, using machine learning to identify your strengths and focus on improvement areas.",
      color: "#2563eb",
      secondaryColor: "#1d4ed8",
      codeSnippet: `// AI learning path algorithm
function recommendNextModule(user) {
  const strengths = analyzePerformance(user.completedModules);
  const roadmap = createPersonalizedPath({
    currentLevel: user.skillLevel,
    strengths,
    careerGoal: user.preferences.goal
  });
  
  return roadmap.nextBestModule;
}`,
      stats: [
        { label: "Faster learning", value: "37%" },
        { label: "Knowledge retention", value: "82%" }
      ]
    },
    {
      icon: <Users className="h-4 w-4 text-white" />,
      title: "Elite Mentor Network",
      description: "Connect with verified senior developers from FAANG companies who provide code reviews and mentor you through challenging concepts.",
      color: "#2563eb",
      secondaryColor: "#1d4ed8",
      codeSnippet: `// Mentor matching system
class MentorMatcher {
  constructor(student) {
    this.student = student;
    this.availableMentors = this.fetchAvailableMentors();
  }

  findOptimalMatch() {
    return this.availableMentors
      .filter(mentor => mentor.expertise.includes(this.student.currentModule))
      .sort((a, b) => this.calculateMatchScore(b) - this.calculateMatchScore(a))
      .slice(0, 3); // Top 3 matches
  }
}`,
      stats: [
        { label: "Industry mentors", value: "230+" },
        { label: "Avg. response time", value: "4hrs" }
      ]
    },
    {
      icon: <Code className="h-4 w-4 text-white" />,
      title: "Interactive Projects",
      description: "Build real-world applications with immediate feedback using our intelligent code analysis system that catches bugs and suggests optimizations.",
      color: "#2563eb",
      secondaryColor: "#1d4ed8",
      codeSnippet: `// Project feedback engine
async function analyzeCode(submission) {
  const staticAnalysisResults = await linter.check(submission.code);
  const runtimeTests = await testRunner.execute(submission.tests);
  const aiSuggestions = await codeQualityAI.getOptimizations(submission.code);
  
  return {
    score: calculateScore(staticAnalysisResults, runtimeTests),
    feedback: generateFeedback(staticAnalysisResults, runtimeTests, aiSuggestions)
  };
}`,
      stats: [
        { label: "Projects available", value: "85+" },
        { label: "Companies recognize", value: "92%" }
      ]
    },
    {
      icon: <Clock className="h-4 w-4 text-white" />,
      title: "Flexible Learning Schedule",
      description: "Asynchronous curriculum with spaced repetition algorithms to optimize your study time and maximize retention even with busy schedules.",
      color: "#2563eb",
      secondaryColor: "#1d4ed8",
      codeSnippet: `// Spaced repetition scheduler
class LearningScheduler {
  calculateNextReviewDate(concept, lastReviewScore) {
    const baseInterval = this.getBaseInterval(concept.difficulty);
    const multiplier = this.getScoreMultiplier(lastReviewScore);
    const userTimePreference = user.preferences.studyTime;
    
    return Date.now() + (baseInterval * multiplier * userTimePreference);
  }
}`,
      stats: [
        { label: "Completion rate", value: "94%" },
        { label: "Time flexibility", value: "100%" }
      ]
    },
    {
      icon: <Bot className="h-4 w-4 text-white" />,
      title: "Intelligent Code Review",
      description: "Get real-time feedback on your code's efficiency, style, and potential bugs from our AI assistant that learns from millions of code repositories.",
      color: "#2563eb",
      secondaryColor: "#1d4ed8",
      codeSnippet: `// AI code reviewer
function reviewCode(code, language) {
  return codeAnalyzer.pipe([
    checkSyntax(language),
    identifyAntiPatterns(),
    measureComplexity(),
    suggestRefactoring(),
    securityVulnerabilities(),
    async (results) => {
      const aiEnhancements = await aiModel.enhance(code, results);
      return { ...results, aiSuggestions: aiEnhancements };
    }
  ]);
}`,
      stats: [
        { label: "Bug reduction", value: "78%" },
        { label: "Code quality boost", value: "64%" }
      ]
    },
    {
      icon: <GraduationCap className="h-4 w-4 text-white" />,
      title: "Industry-Verified Certification",
      description: "Complete challenges verified by top companies to earn blockchain-secured certificates that prove your skills to employers.",
      color: "#2563eb",
      secondaryColor: "#1d4ed8",
      codeSnippet: `// Certificate verification
const createVerifiableCertificate = (graduate, course, score) => {
  const certificateData = {
    userId: graduate.id,
    courseName: course.name,
    issueDate: new Date().toISOString(),
    grade: score,
    skills: course.coveredSkills
  };
  
  // Hash and store on blockchain for verification
  const certificate = blockchainService.createToken(
    hashData(certificateData),
    process.env.SCHOOL_PRIVATE_KEY
  );
  
  return { certificateId: certificate.id, ...certificateData };
}`,
      stats: [
        { label: "Employer acceptance", value: "96%" },
        { label: "Avg. salary increase", value: "27%" }
      ]
    }
  ], []);

  // Optimize feature selection with useCallback
  const handleFeatureClick = useCallback((index: number) => {
    setActiveFeature(index);
  }, []);

  if (!mounted) {
    return (
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-800 rounded animate-pulse mb-4 mx-auto w-48"></div>
            <div className="h-16 bg-gray-800 rounded animate-pulse mb-4 mx-auto max-w-2xl"></div>
            <div className="h-8 bg-gray-800 rounded animate-pulse mx-auto max-w-xl"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 xl:col-span-4 space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-800 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="h-96 bg-gray-800  animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative py-12 md:py-16 bg-gray-50">
      {/* Animated code snippets - Client-side only rendering */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        {techStackElements}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full text-xs font-semibold shadow-sm mb-3 border border-blue-200">
            <div className="h-4 w-4 rounded-full bg-blue-600 flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="text-blue-700">
              Platform Features
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-gray-900 mb-3">
            Why Leading Companies <span className="text-blue-600">
               Choose Our Platform
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm">
            Our enterprise-grade learning platform combines advanced technology with industry expertise to accelerate developer growth and productivity.
          </p>
        </div>

        {/* Features Interactive Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Feature Selection - Vertical tab menu */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-2" role="tablist" aria-label="Platform features">
            {features.map((feature, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeFeature === index}
                aria-controls={`feature-panel-${index}`}
                className={`w-full px-3 py-3 transition-all duration-300 cursor-pointer flex items-center  text-left ${
                  activeFeature === index 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm shadow-lg border border-blue-200' 
                    : 'hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleFeatureClick(index)}
              >
                <div 
                  className={`p-2 rounded-full mr-3 flex-shrink-0 transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium transition-colors duration-300 ${
                    activeFeature === index 
                      ? 'text-gray-900' 
                      : 'text-gray-700'
                  }`}>
                    {feature.title}
                  </h3>
                  {activeFeature === index && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2 animate-fade-in">
                      {feature.description}
                    </p>
                  )}
                </div>
                {activeFeature === index && (
                  <div className="ml-auto text-blue-500 animate-fade-in" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Feature Display Area */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div 
              className="bg-white shadow-xl overflow-hidden backdrop-blur-sm border border-gray-200"
              role="tabpanel"
              id={`feature-panel-${activeFeature}`}
              aria-labelledby={`feature-tab-${activeFeature}`}
            >
              {/* Feature Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {features[activeFeature].title}
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {features[activeFeature].description}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 ml-4">
                    {features[activeFeature].icon}
                  </div>
                </div>
                
                {/* Key Stats */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {features[activeFeature].stats.map((stat, statIndex) => (
                    <div key={statIndex} className="bg-gray-50 p-3 border border-gray-200 hover:border-blue-300 transition duration-300">
                      <div className="text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Code Sample */}
              <div className="relative">
                {/* Code editor header */}
                <div className="bg-gray-800 border-b border-gray-700 py-2 px-4 flex items-center">
                  <div className="flex items-center space-x-1.5 mr-4" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-70"></div>
                  </div>
                  <div className="text-xs font-mono text-gray-400 flex-1">
                    {features[activeFeature].title.toLowerCase().replace(/\s/g, '-')}.js
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500" aria-hidden="true">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span className="text-xs">main</span>
                  </div>
                </div>
                
                {/* Code content */}
                <div 
                  className="font-mono text-xs overflow-auto p-3 bg-gray-800 relative"
                  style={{ maxHeight: '340px' }}
                  role="code"
                  aria-label={`Code example for ${features[activeFeature].title}`}
                >
                  <pre className="language-javascript">
                    <code className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {features[activeFeature].codeSnippet}
                    </code>
                  </pre>
                  
                  {/* Subtle code cursor */}
                  <div 
                    className="absolute w-0.5 h-4 bg-blue-400 opacity-70 animate-blink"
                    style={{ 
                      bottom: '54px', 
                      left: '32px'
                    }}
                  />
                </div>
                
                {/* Accent color bar */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" aria-hidden="true" />
              </div>
            </div>
            
            {/* Additional Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: <CheckCircle className="h-4 w-4" />, text: "Enterprise Ready" },
                { icon: <Shield className="h-4 w-4" />, text: "ISO Certified" },
                { icon: <Award className="h-4 w-4" />, text: "Award Winning" }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:border-blue-500/30 transition-all duration-300">
                  <div className="text-blue-500">{badge.icon}</div>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Testimonial Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 backdrop-blur-sm shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-1 h-20 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500 flex-shrink-0" aria-hidden="true"></div>
              <div className="flex-1">
                <div className="flex space-x-1 mb-2" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-blue-400" fill="#2563eb" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic text-xs mb-4">
                  &ldquo;This platform has transformed how our engineering team learns and grows. The AI-powered recommendations and real-time feedback have accelerated our developers&apos; skills acquisition by over 40%.&rdquo;
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden mr-3 relative border border-gray-600">
                    <Image 
                      src="/testimonial-avatar.jpg" 
                      alt="Sarah Johnson, CTO at TechGlobal Inc." 
                      width={40}
                      height={40}
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Sh14WW"
                    />
                  </div>
                  <div>
                    <cite className="text-gray-900 font-medium not-italic">Sarah Johnson</cite>
                    <div className="text-sm text-gray-600">CTO, TechGlobal Inc.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}