"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Code,
  BookOpen,
  AlertTriangle,
  Info,
  CheckCircle,
  Copy,
  ExternalLink,
  Menu,
  X,
  FileText,
  Zap,
  Target,
  Award,
  Search,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { languageData } from "../../../data/languages";
import VSCodeEditor from "../../../components/learn/VSCodeEditor";
import { useToast } from "../../../hooks/useToast";
import Navbar from "../../../components/Navbar";
import ProtectedRoute from "../../../components/auth/ProtectedRoute";

interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  tryItCode?: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
}

export default function LanguagePage() {
  const params = useParams();
  const language = params.language as string;
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTryIt, setShowTryIt] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();

  // Format language name for display
  const formatLanguageName = (lang: string) => {
    return lang
      .replace(/-/g, " ")
      .replace(/plus/g, "+")
      .replace(/sharp/g, "#")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const formattedLanguage = formatLanguageName(language);
  const currentLanguageData =
    languageData[language] || languageData["javascript"]; // fallback to javascript
  const topics: Topic[] = currentLanguageData.topics;
  const currentTopic = topics[currentTopicIndex];

  // Filter topics based on search query
  const filteredTopics = topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update progress based on current topic
  useEffect(() => {
    const newProgress = ((currentTopicIndex + 1) / topics.length) * 100;
    setProgress(newProgress);
  }, [currentTopicIndex, topics.length]);

  const handleNextTopic = () => {
    if (currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    }
  };

  const handlePrevTopic = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    }
  };
  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code. Please try again.");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400 bg-green-500/10";
      case "intermediate":
        return "text-yellow-400 bg-yellow-500/10";
      case "advanced":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-blue-400 bg-blue-500/10";
    }
  };
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <div className="min-h-screen text-white">
          {" "}
          <div className="flex">
            {/* Sidebar */}
            <div
              className={`${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } 
            fixed lg:sticky lg:translate-x-0 z-30
          w-80 h-screen top-0   bg-gray-900 border-r border-gray-800 
          transition-transform duration-300 ease-in-out flex flex-col`}
            >
              {/* Sticky Header */}
              <div className="p-6 border-b border-gray-800   bg-gray-900 sticky top-0 z-40">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
                    {formattedLanguage} Tutorial
                  </h1>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-1 rounded hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2  bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 pt-2">
                <div className="space-y-2">
                  {(searchQuery ? filteredTopics : topics).map(
                    (topic, index) => {
                      // Get original index for the filtered topics
                      const originalIndex = searchQuery
                        ? topics.findIndex((t) => t.id === topic.id)
                        : index;

                      return (
                        <div
                          key={topic.id}
                          className="border border-gray-700 overflow-hidden"
                        >
                          <button
                            onClick={() => setCurrentTopicIndex(originalIndex)}
                            className={`w-full text-left p-3 transition-all duration-200 
                        ${
                          originalIndex === currentTopicIndex
                            ? "bg-gradient-to-r from-pink-500/20 to-orange-500/20 border-pink-500/30 text-white"
                            : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                        }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {topic.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                  <span>{topic.estimatedTime}</span>
                                  <span
                                    className={`px-2 py-0.5 rounded text-xs ${getDifficultyColor(
                                      topic.difficulty
                                    )}`}
                                  >
                                    {topic.difficulty}
                                  </span>
                                </div>
                              </div>
                              {originalIndex <= currentTopicIndex && (
                                <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                              )}
                            </div>
                          </button>

                          {/* Topic content preview */}
                          <div
                            className={`px-3 pb-3 transition-all duration-300 ${
                              originalIndex === currentTopicIndex
                                ? "block"
                                : "hidden"
                            }`}
                          >
                            <div className="text-xs text-gray-400 mt-2 line-clamp-3">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    topic.content
                                      .replace(/<[^>]*>/g, "")
                                      .substring(0, 150) + "...",
                                }}
                              />
                            </div>
                            {topic.codeExample && (
                              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                <Code className="h-3 w-3" />
                                <span>Code example included</span>
                              </div>
                            )}
                            {topic.tryItCode && (
                              <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                <span>Interactive editor available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* Language Info */}
                <div className="mt-8 p-4  bg-gray-900/50 border border-gray-700">
                  <h3 className="font-semibold text-gray-200 mb-2">
                    About {formattedLanguage}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {currentLanguageData.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Award className="h-4 w-4" />
                    <span>{topics.length} Topics</span>
                    <span>•</span>
                    <span>Interactive Learning</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-20"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            {/* Main Content */}
            <div className="flex-1 min-h-screen">
              <div className="max-w-7xl mx-auto p-6 lg:p-8">
                {/* Topic Header */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-sm font-bold">
                        {currentTopicIndex + 1}
                      </div>
                      <h1 className="text-3xl font-bold text-white">
                        {currentTopic.title}
                      </h1>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                        <span>Progress:</span>
                        <div className="w-32 h-2  bg-gray-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span>{Math.round(progress)}%</span>
                      </div>

                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                          currentTopic.difficulty
                        )}`}
                      >
                        {currentTopic.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-7 gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Estimated time: {currentTopic.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span
                        className={`px-2 py-1 rounded ${getDifficultyColor(
                          currentTopic.difficulty
                        )}`}
                      >
                        {currentTopic.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none mb-8">
                  <div
                    className="text-gray-300 leading-relaxed bg-blue-500/10 p-4"
                    dangerouslySetInnerHTML={{ __html: currentTopic.content }}
                  />
                </div>

                {/* Code Example */}
                {currentTopic.codeExample && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Example
                      </h3>
                      <button
                        onClick={() => copyCode(currentTopic.codeExample!)}
                        className="flex items-center gap-2 px-3 py-1.5  bg-gray-900 hover:bg-gray-700 transition-colors text-sm text-gray-300"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </button>
                    </div>

                    <div className="relative   bg-gray-900 border border-gray-800 overflow-hidden">
                      <SyntaxHighlighter
                        language={currentTopic.language.toLowerCase()}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: "1.5rem",
                          background: "transparent",
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        {currentTopic.codeExample}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}

                {/* Try It Yourself */}
                {currentTopic.tryItCode && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        Try It Yourself
                      </h3>
                      <button
                        onClick={() => setShowTryIt(!showTryIt)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-all duration-300 text-white font-medium"
                      >
                        <Play className="h-4 w-4" />
                        {showTryIt ? "Hide Editor" : "Open Editor"}
                      </button>
                    </div>{" "}
                    {showTryIt && (
                      <VSCodeEditor
                        initialCode={currentTopic.tryItCode}
                        language={currentTopic.language.toLowerCase()}
                      />
                    )}
                  </div>
                )}

                {/* Info Boxes */}
                <div className="grid gap-4 mb-8">
                  <div className="bg-blue-500/10 border border-blue-500/20 p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-300 mb-1">
                          Good to Know
                        </h4>
                        <p className="text-blue-200 text-sm">
                          This topic builds on previous concepts. Make sure you
                          understand the basics before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-300 mb-1">
                          Important Note
                        </h4>
                        <p className="text-amber-200 text-sm">
                          Practice makes perfect! Try modifying the examples and
                          experiment with different approaches.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-800">
                  <button
                    onClick={handlePrevTopic}
                    disabled={currentTopicIndex === 0}
                    className={`flex items-center gap-2 px-6 py-3 transition-all duration-300 
                  ${
                    currentTopicIndex === 0
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="text-sm text-gray-400">
                    {currentTopicIndex + 1} of {topics.length}
                  </div>

                  <button
                    onClick={handleNextTopic}
                    disabled={currentTopicIndex === topics.length - 1}
                    className={`flex items-center gap-2 px-6 py-3 transition-all duration-300 
                  ${
                    currentTopicIndex === topics.length - 1
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
                  }`}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}
