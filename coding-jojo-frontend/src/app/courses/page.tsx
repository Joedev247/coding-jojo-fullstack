"use client";

import React, { useState, useEffect } from "react";
import {
  BookMarked,
  Code,
  Database,
  Smartphone,
  Palette,
  Cpu,
  Briefcase,
  Globe,
  Search,
} from "lucide-react";
import { Course } from "../../types/courses";
import { courseService } from "../../services/courseService";
import { formatCourseDuration } from "../../utils/formatters";

// Import components
// import HeaderSection from '../../components/courses/HeaderSection';
import FeaturedCourseBanner from "../../components/courses/FeatureCourseBanner";
import CategorySidebar from "../../components/courses/CategorySidebar";
import Filters from "../../components/courses/Filters";
import CourseCard from "../../components/courses/CourseCard";
import CourseListItem from "../../components/courses/CourseListItem";
import Pagination from "../../components/courses/Pagination";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeLevel, setActiveLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 9; // show up to 9 courses per page

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await courseService.getCourses();
        
        if (response.success && response.data) {
          // Transform service courses to component courses
        const transformedCourses = response.data
          .filter((course: any) => !!course.id) // Backend sends 'id' not '_id'
          .map((course: any) => ({
            id: course.id, // Backend already transforms _id to id
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail || "/default-course.jpg",
            instructor: {
              id: course.instructor?.id || "",
              name: course.instructor?.name || "Unknown",
              avatarUrl: course.instructor?.avatar || "/default-avatar.png", // Backend sends 'avatar', frontend expects 'avatarUrl'
              role: course.instructor?.role || "Instructor",
            },
            category: course.category,
            tags: course.tags || [],
            level: course.level,
            duration: formatCourseDuration(course.duration),
            lectures: course.totalLessons || 0,
            studentsEnrolled: course.totalEnrollments || 0, // Backend sends 'totalEnrollments'
            rating: course.averageRating || 0, // Backend sends 'averageRating'
            ratingCount: course.totalRatings || 0, // Backend sends 'totalRatings'
            progress: course.progress || 0,
            price: course.price || 0,
            originalPrice: course.originalPrice,
            isFeatured: course.isFeatured || false,
            isNew: course.isNew || false,
            isSaved: course.isSaved || false,
            createdAt: course.createdAt,
            status: course.status || "published",
          }));

        setCourses(transformedCourses);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Create categories from course data
  const categories = [
    { id: "all", name: "All Courses" },
    ...Array.from(new Set(courses.map((course) => course.category))).map(
      (category) => ({ id: category.toLowerCase(), name: category })
    ),
  ];

  // Add icons to categories
  const categoriesWithIcons = categories.map((category) => {
    let icon;
    switch (category.id) {
      case "all":
        icon = <BookMarked className="w-4 h-4 text-gray-400" />;
        break;
      case "development":
        icon = <Code className="w-4 h-4 text-blue-400" />;
        break;
      case "data science":
        icon = <Database className="w-4 h-4 text-blue-400" />;
        break;
      case "mobile":
        icon = <Smartphone className="w-4 h-4 text-orange-400" />;
        break;
      case "design":
        icon = <Palette className="w-4 h-4 text-pink-400" />;
        break;
      case "cryptocurrency":
        icon = <Cpu className="w-4 h-4 text-yellow-400" />;
        break;
      case "business":
        icon = <Briefcase className="w-4 h-4 text-purple-400" />;
        break;
      default:
        icon = <Globe className="w-4 h-4 text-gray-400" />;
        break;
    }
    return {
      ...category,
      icon,
      count: 0, // Will be calculated from course data
    };
  });
  // Filter courses based on active filters and search query
  const filteredCourses = (() => {
    let filtered = courses;

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (course: Course) => course.category.toLowerCase() === activeCategory
      );
    }

    if (activeLevel !== "all") {
      filtered = filtered.filter(
        (course: Course) => course.level.toLowerCase() === activeLevel
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (course: Course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (course?.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ??
            false)
      );
    }

    // Sort courses based on selected order
    switch (sortOrder) {
      case "popular":
        filtered = [...filtered].sort(
          (a, b) => (b.studentsEnrolled ?? 0) - (a.studentsEnrolled ?? 0)
        );
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // For demo purposes, we'll use the isNew property
        filtered = [...filtered].sort((a, b) =>
          a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
        );
        break;
      default:
        break;
    }

    return filtered;
  })();

  // Reset page when filters change so user sees first page of results
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeLevel, searchQuery, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const handleSaveCourse = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            isSaved: !course.isSaved,
          };
        }
        return course;
      })
    );
  };

  const handleClearFilters = () => {
    setActiveCategory("all");
    setActiveLevel("all");
    setSearchQuery("");
    setSortOrder("popular");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800 relative">
        {/* <HeaderSection /> */}
        <FeaturedCourseBanner />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 py-4 relative z-10">
          <div className="flex flex-col text-gray-800 lg:flex-row gap-4">
            <CategorySidebar
              categories={categoriesWithIcons}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeLevel={activeLevel}
              setActiveLevel={setActiveLevel}
              trendingCourses={courses.map((course) => course.title)}
              featuredInstructors={[]}
            />

            {/* Main Content */}
            <div className="flex-1">
              <Filters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showMobileFilters={showMobileFilters}
                setShowMobileFilters={setShowMobileFilters}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                viewMode={viewMode}
                setViewMode={setViewMode}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeLevel={activeLevel}
                setActiveLevel={setActiveLevel}
                handleClearFilters={handleClearFilters}
                categories={categoriesWithIcons}
              />
              {/* Results Info */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="text-gray-600 text-sm">
                  Showing{" "}
                  <span className="font-medium text-gray-800">
                    {courses.length}
                  </span>{" "}
                  courses
                  {activeCategory !== "all" && (
                    <span>
                      {" "}
                      in{" "}
                      <span className="text-blue-600 font-medium capitalize">
                        {activeCategory}
                      </span>
                    </span>
                  )}
                    {activeLevel !== "all" && (
                      <span>
                        {" "}
                        •{" "}
                        <span className="text-blue-600 font-medium capitalize">
                          {activeLevel} level
                        </span>
                      </span>
                    )}
                  </div>
                <div className="flex items-center space-x-4">
                  {(activeCategory !== "all" ||
                    activeLevel !== "all" ||
                    searchQuery) && (
                    <button
                      onClick={handleClearFilters}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      Clear filters
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>{" "}
              {/* No Results */}
              {filteredCourses.length === 0 && !loading && (
                <div className="bg-white border border-gray-200  shadow-sm p-8 text-center">
                  <div className="flex justify-center mb-3">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    We couldn&apos;t find any courses matching your current
                    filters.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium  transition duration-200"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
              {/* Loading State */}
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-80 bg-gray-200  animate-pulse"
                    ></div>
                  ))}
                </div>
              )}
              {/* Courses Grid/List View */}
              {filteredCourses.length > 0 && !loading && (
                <>
                  {" "}
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {paginatedCourses.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          handleSaveCourse={handleSaveCourse}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {paginatedCourses.map((course) => (
                        <CourseListItem
                          key={course.id}
                          course={course}
                          handleSaveCourse={handleSaveCourse}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
              {/* Pagination */}
              {filteredCourses.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
