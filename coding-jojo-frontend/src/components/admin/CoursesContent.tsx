// components/dashboard/CoursesContent.tsx
import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  BookOpen,
  Edit,
  Trash,
  Star,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Archive,
  Upload,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import { Course } from "../../types/admin";
import adminService, { AdminCourse } from "../../services/adminService";
import { useToast } from "../../contexts/ToastContext";
import DeleteConfirmationDialog from "../ui/DeleteConfirmationDialog";
import CreateCourseForm from "./CreateCourseForm";

interface CoursesContentProps {
  courses: Course[];
  onAddCourse: () => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  onRefresh?: () => void;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCourses: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const CoursesContent: React.FC<CoursesContentProps> = ({
  courses,
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
  onRefresh,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // Get unique categories and levels for filters
  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  ).filter(Boolean);
  const levels = Array.from(
    new Set(courses.map((course) => course.level))
  ).filter(Boolean);
  const statuses = ["published", "draft", "archived"];

  // Filter and sort courses
  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        false;

      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || course.category === categoryFilter;
      const matchesLevel =
        levelFilter === "all" || course.level === levelFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Course];
      let bValue = b[sortBy as keyof Course];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortOrder === "asc" ? 1 : -1;
      if (bValue === undefined) return sortOrder === "asc" ? -1 : 1;

      // Handle string comparisons
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages,
    totalCourses: filteredCourses.length,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };

  // Event handlers
  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      try {
        setLoading(true);
        await onDeleteCourse(courseToDelete);
        showSuccessToast("Course deleted successfully");
        setDeleteDialogOpen(false);
        setCourseToDelete(null);
        if (onRefresh) onRefresh();
      } catch (error) {
        showErrorToast("Failed to delete course");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusChange = async (courseId: string, newStatus: string) => {
    try {
      setLoading(true);
      await adminService.updateCourseStatus(courseId, newStatus as any);
      showSuccessToast(`Course status updated to ${newStatus}`);
      if (onRefresh) onRefresh();
    } catch (error) {
      showErrorToast("Failed to update course status");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedCourses.length === 0) {
      showErrorToast("Please select courses first");
      return;
    }

    try {
      setLoading(true);

      if (action === "delete") {
        // Handle bulk delete
        await Promise.all(selectedCourses.map((id) => onDeleteCourse(id)));
        showSuccessToast(
          `${selectedCourses.length} courses deleted successfully`
        );
      } else if (
        action === "publish" ||
        action === "archive" ||
        action === "draft"
      ) {
        // Handle bulk status update
        await Promise.all(
          selectedCourses.map((id) =>
            adminService.updateCourseStatus(id, action as any)
          )
        );
        showSuccessToast(
          `${selectedCourses.length} courses updated to ${action}`
        );
      }

      setSelectedCourses([]);
      if (onRefresh) onRefresh();
    } catch (error) {
      showErrorToast(`Failed to ${action} courses`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedCourses.length === paginatedCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(paginatedCourses.map((course) => course.id));
    }
  };

  const handleSelectCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedCourses([]); // Clear selections when changing pages
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setLevelFilter("all");
    setSortBy("title");
    setSortOrder("asc");
    setCurrentPage(1);
  };
  const handleCourseCreated = (newCourse: AdminCourse) => {
    // Add the new course to the list and refresh
    onRefresh?.();
    setShowCreateForm(false);
  };

  // Show create form if requested
  if (showCreateForm) {
    return (
      <CreateCourseForm
        onSuccess={handleCourseCreated}
        onCancel={() => setShowCreateForm(false)}
      />
    );
  }

  return (
    <>
      {/* Enhanced Header with Actions */}
      <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 mb-6">
        <div className="p-5 border-b border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
                All Courses ({filteredCourses.length})
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2  bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  <Filter className="h-4 w-4" />
                </button>
                {onRefresh && (
                  <button
                    onClick={onRefresh}
                    disabled={loading}
                    className="p-2  bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/70 border border-gray-700 pl-9 pr-4 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent w-64"
                />
              </div>

              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium px-4 py-2 text-sm shadow-md transition duration-200 flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Course
              </button>
            </div>
          </div>

          {/* Filters Row */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-800/70 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-gray-800/70 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-gray-800/70 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Levels</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/70 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="title">Sort by Title</option>
                <option value="createdAt">Sort by Date</option>
                <option value="studentsEnrolled">Sort by Enrollment</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="bg-gray-800/70 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>

              <button
                onClick={resetFilters}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          )}
        </div>
        {/* Bulk Actions */}
        {selectedCourses.length > 0 && (
          <div className="p-3  bg-gray-900 border-b border-gray-800 flex items-center justify-between">
            <span className="text-sm text-gray-300">
              {selectedCourses.length} course
              {selectedCourses.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction("publish")}
                disabled={loading}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors disabled:opacity-50"
              >
                Publish
              </button>
              <button
                onClick={() => handleBulkAction("draft")}
                disabled={loading}
                className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white text-xs rounded transition-colors disabled:opacity-50"
              >
                Draft
              </button>
              <button
                onClick={() => handleBulkAction("archive")}
                disabled={loading}
                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded transition-colors disabled:opacity-50"
              >
                Archive
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                disabled={loading}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        )}{" "}
        {/* Enhanced Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left py-3 px-4 w-8">
                  <input
                    type="checkbox"
                    checked={
                      selectedCourses.length === paginatedCourses.length &&
                      paginatedCourses.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-600 bg-gray-700 text-pink-500 focus:ring-pink-500 focus:ring-offset-gray-800"
                  />
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Course
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Students
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Rating
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {paginatedCourses.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="flex flex-col items-center">
                      <BookOpen className="h-12 w-12 text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">
                        No courses found
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {filteredCourses.length === 0 && courses.length > 0
                          ? "No courses match your current filters."
                          : "Get started by creating your first course."}
                      </p>
                      {filteredCourses.length === 0 && courses.length > 0 ? (
                        <button
                          onClick={resetFilters}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 transition-colors"
                        >
                          Clear Filters
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowCreateForm(true)}
                          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-4 py-2 transition-colors"
                        >
                          <PlusCircle className="h-4 w-4 mr-2 inline" />
                          Create First Course
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleSelectCourse(course.id)}
                        className="rounded border-gray-600 bg-gray-700 text-pink-500 focus:ring-pink-500 focus:ring-offset-gray-800"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12  bg-gray-900 flex items-center justify-center mr-3 flex-shrink-0">
                          <BookOpen className="h-6 w-6 text-pink-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div
                            className="text-sm font-medium text-white truncate"
                            title={course.title}
                          >
                            {course.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center space-x-3">
                            <span>
                              Created:{" "}
                              {new Date(course.createdAt).toLocaleDateString()}
                            </span>
                            {course.isFeatured && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-300">
                        {course.category}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {course.level}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-white">
                        {typeof course.price === "number"
                          ? `$${course.price}`
                          : course.price}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-300">
                          {course.studentsEnrolled?.toLocaleString() || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm text-gray-300">
                          {course.rating || 0}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({course.ratingCount || 0})
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={course.status}
                        onChange={(e) =>
                          handleStatusChange(course.id, e.target.value)
                        }
                        disabled={loading}
                        className={`text-xs px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-pink-500 disabled:opacity-50 ${
                          course.status === "published"
                            ? "bg-green-100 text-green-800"
                            : course.status === "draft"
                            ? "bg-blue-100 text-blue-800"
                            : course.status === "archived"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onEditCourse(course)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors hover:bg-gray-800"
                          title="Edit course"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-500 transition-colors hover:bg-gray-800"
                          title="View course"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-gray-800"
                          title="Delete course"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>{" "}
        {/* Enhanced Pagination */}
        <div className="p-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Showing{" "}
              <span className="font-medium text-white">{startIndex + 1}</span>{" "}
              to{" "}
              <span className="font-medium text-white">
                {Math.min(startIndex + itemsPerPage, filteredCourses.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-white">
                {filteredCourses.length}
              </span>{" "}
              courses
            </div>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-gray-200"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!paginationInfo.hasPrevPage}
                className="p-2  bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else {
                  if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 text-sm transition-colors ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!paginationInfo.hasNextPage}
                className="p-2  bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:shadow-lg transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 text-sm mb-1">Total Courses</div>
              <div className="text-2xl font-bold text-white">
                {courses.length}
              </div>
            </div>
            <div className="p-3 bg-pink-500/20">
              <BookOpen className="h-6 w-6 text-pink-400" />
            </div>
          </div>
        </div>

        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:shadow-lg transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 text-sm mb-1">Published</div>
              <div className="text-2xl font-bold text-white">
                {courses.filter((c) => c.status === "published").length}
              </div>
            </div>
            <div className="p-3 bg-green-500/20">
              <Eye className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:shadow-lg transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 text-sm mb-1">Total Students</div>
              <div className="text-2xl font-bold text-white">
                {courses
                  .reduce(
                    (total, course) => total + (course.studentsEnrolled || 0),
                    0
                  )
                  .toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-blue-500/20">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:shadow-lg transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 text-sm mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-white">
                $
                {courses
                  .reduce((total, course) => {
                    const price =
                      typeof course.price === "number" ? course.price : 0;
                    const students = course.studentsEnrolled || 0;
                    return total + price * students;
                  }, 0)
                  .toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-orange-500/20">
              <DollarSign className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Top Performing Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Top Performing Courses
            </h3>
          </div>
          <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
            {courses
              .filter((course) => course.status === "published")
              .sort(
                (a, b) => (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0)
              )
              .slice(0, 5)
              .map((course, index) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-3  bg-gray-900"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10  bg-gray-900 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-pink-400">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <div
                        className="text-sm font-medium text-white truncate max-w-xs"
                        title={course.title}
                      >
                        {course.title}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center space-x-2">
                        <span>
                          {course.studentsEnrolled?.toLocaleString() || 0}{" "}
                          students
                        </span>
                        <span>•</span>
                        <span>{course.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-white">
                          {course.rating || 0}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        ${typeof course.price === "number" ? course.price : 0}
                      </div>
                    </div>
                    <button
                      onClick={() => onEditCourse(course)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            {courses.filter((course) => course.status === "published")
              .length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No published courses yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Course Analytics */}
        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Course Analytics
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 p-4">
                <div className="text-gray-400 text-sm mb-1">Avg. Rating</div>
                <div className="text-xl font-bold text-white">
                  {courses.length > 0
                    ? (
                        courses.reduce(
                          (sum, course) => sum + (course.rating || 0),
                          0
                        ) / courses.length
                      ).toFixed(1)
                    : "0.0"}
                </div>
              </div>
              <div className="bg-gray-800/50 p-4">
                <div className="text-gray-400 text-sm mb-1">Avg. Price</div>
                <div className="text-xl font-bold text-white">
                  $
                  {courses.length > 0
                    ? Math.round(
                        courses.reduce((sum, course) => {
                          const price =
                            typeof course.price === "number" ? course.price : 0;
                          return sum + price;
                        }, 0) / courses.length
                      )
                    : 0}
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">
                Category Distribution
              </h4>
              {categories.slice(0, 5).map((category) => {
                const categoryCount = courses.filter(
                  (course) => course.category === category
                ).length;
                const percentage =
                  courses.length > 0
                    ? (categoryCount / courses.length) * 100
                    : 0;

                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{category}</span>
                      <span className="text-gray-400">
                        {categoryCount} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full  bg-gray-900 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        itemName="course"
        onClose={() => {
          setDeleteDialogOpen(false);
          setCourseToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default CoursesContent;
