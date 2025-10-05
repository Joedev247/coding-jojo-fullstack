// components/forms/CourseForm.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Upload,
  Plus,
  Trash2,
  Clock,
  DollarSign,
  BookOpen,
  Target,
  Users,
} from "lucide-react";
import { CourseFormData } from "../../types/admin";

interface CourseFormProps {
  initialData?: CourseFormData;
  onSubmit: (data: CourseFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
  loading?: boolean;
}

interface ExtendedCourseFormData extends CourseFormData {
  longDescription?: string;
  originalPrice?: string | number;
  tags?: string[];
  prerequisites?: string[];
  learningObjectives?: string[];
  targetAudience?: string[];
  totalLessons?: number;
  durationHours?: number;
  durationMinutes?: number;
}

const CourseForm: React.FC<CourseFormProps> = ({
  initialData = {
    title: "",
    category: "",
    description: "",
    price: "",
    level: "beginner",
    duration: "",
    thumbnail: null,
    featured: false,
  },
  onSubmit,
  onCancel,
  isEditing = false,
  loading = false,
}) => {
  const [formData, setFormData] = useState<ExtendedCourseFormData>({
    ...initialData,
    longDescription: "",
    originalPrice: "",
    tags: [],
    prerequisites: [],
    learningObjectives: [],
    targetAudience: [],
    totalLessons: 0,
    durationHours: 0,
    durationMinutes: 0,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [newTag, setNewTag] = useState("");
  const [newPrerequisite, setNewPrerequisite] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [newAudience, setNewAudience] = useState("");

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Cybersecurity",
    "Game Development",
    "Programming Languages",
    "Databases",
    "Cloud Computing",
  ];

  const levels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  useEffect(() => {
    if (initialData && isEditing) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        longDescription: (initialData as any).longDescription || "",
        originalPrice: (initialData as any).originalPrice || "",
        tags: (initialData as any).tags || [],
        prerequisites: (initialData as any).prerequisites || [],
        learningObjectives: (initialData as any).learningObjectives || [],
        targetAudience: (initialData as any).targetAudience || [],
        totalLessons: (initialData as any).totalLessons || 0,
        durationHours: (initialData as any).durationHours || 0,
        durationMinutes: (initialData as any).durationMinutes || 0,
      }));
    }
  }, [initialData, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : parseInt(value),
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, thumbnail: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const addPrerequisite = () => {
    if (
      newPrerequisite.trim() &&
      !formData.prerequisites?.includes(newPrerequisite.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        prerequisites: [...(prev.prerequisites || []), newPrerequisite.trim()],
      }));
      setNewPrerequisite("");
    }
  };

  const removePrerequisite = (prereqToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      prerequisites:
        prev.prerequisites?.filter((prereq) => prereq !== prereqToRemove) || [],
    }));
  };

  const addObjective = () => {
    if (
      newObjective.trim() &&
      !formData.learningObjectives?.includes(newObjective.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        learningObjectives: [
          ...(prev.learningObjectives || []),
          newObjective.trim(),
        ],
      }));
      setNewObjective("");
    }
  };

  const removeObjective = (objToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives:
        prev.learningObjectives?.filter((obj) => obj !== objToRemove) || [],
    }));
  };

  const addAudience = () => {
    if (
      newAudience.trim() &&
      !formData.targetAudience?.includes(newAudience.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        targetAudience: [...(prev.targetAudience || []), newAudience.trim()],
      }));
      setNewAudience("");
    }
  };

  const removeAudience = (audienceToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      targetAudience:
        prev.targetAudience?.filter(
          (audience) => audience !== audienceToRemove
        ) || [],
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.title &&
          formData.category &&
          formData.description &&
          formData.level
        );
      case 2:
        return !!(
          formData.price &&
          formData.durationHours !== undefined &&
          formData.durationMinutes !== undefined
        );
      case 3:
        return true; // Optional step
      default:
        return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all steps
    if (!validateStep(1) || !validateStep(2)) {
      alert("Please fill in all required fields");
      return;
    }

    // Convert duration to the expected format
    const durationString = `${formData.durationHours || 0}h ${
      formData.durationMinutes || 0
    }m`;

    const submitData: CourseFormData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      price: formData.price,
      level: formData.level,
      duration: durationString,
      thumbnail: formData.thumbnail,
      featured: formData.featured,
      // Include extended fields in the submission
      ...(formData.longDescription && {
        longDescription: formData.longDescription,
      }),
      ...(formData.originalPrice && { originalPrice: formData.originalPrice }),
      ...(formData.tags && formData.tags.length > 0 && { tags: formData.tags }),
      ...(formData.prerequisites &&
        formData.prerequisites.length > 0 && {
          prerequisites: formData.prerequisites,
        }),
      ...(formData.learningObjectives &&
        formData.learningObjectives.length > 0 && {
          learningObjectives: formData.learningObjectives,
        }),
      ...(formData.targetAudience &&
        formData.targetAudience.length > 0 && {
          targetAudience: formData.targetAudience,
        }),
      ...(formData.totalLessons && { totalLessons: formData.totalLessons }),
    };

    onSubmit(submitData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Course Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full  bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Enter course title"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full  bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Short Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full  bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Brief description of the course (max 500 characters)"
          maxLength={500}
        />
        <div className="text-xs text-gray-500 mt-1">
          {(formData.description || "").length}/500 characters
        </div>
      </div>

      <div>
        <label
          htmlFor="longDescription"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Detailed Description
        </label>
        <textarea
          id="longDescription"
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          rows={6}
          className="w-full  bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Detailed course description, what students will learn, course structure, etc."
          maxLength={2000}
        />
        <div className="text-xs text-gray-500 mt-1">
          {(formData.longDescription || "").length}/2000 characters
        </div>
      </div>

      <div>
        <label
          htmlFor="level"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Difficulty Level *
        </label>
        <select
          id="level"
          name="level"
          required
          value={formData.level}
          onChange={handleChange}
          className="w-full  bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          {levels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Price (USD) *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="price"
              name="price"
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full  bg-gray-900 border border-gray-700 pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="originalPrice"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Original Price (Optional)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="originalPrice"
              name="originalPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full  bg-gray-900 border border-gray-700 pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Set this for discount pricing
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Course Duration *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="durationHours"
              className="block text-xs text-gray-500 mb-1"
            >
              Hours
            </label>
            <input
              id="durationHours"
              name="durationHours"
              type="number"
              min="0"
              max="999"
              value={formData.durationHours}
              onChange={handleNumberChange}
              className="w-full  bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label
              htmlFor="durationMinutes"
              className="block text-xs text-gray-500 mb-1"
            >
              Minutes
            </label>
            <input
              id="durationMinutes"
              name="durationMinutes"
              type="number"
              min="0"
              max="59"
              value={formData.durationMinutes}
              onChange={handleNumberChange}
              className="w-full  bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="totalLessons"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Total Lessons
        </label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            id="totalLessons"
            name="totalLessons"
            type="number"
            min="0"
            value={formData.totalLessons}
            onChange={handleNumberChange}
            className="w-full  bg-gray-900 border border-gray-700 pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Number of lessons in this course"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Course Thumbnail
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full  bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
            />
          </div>
          {thumbnailPreview && (
            <div className="w-20 h-20  bg-gray-900 overflow-hidden">
              <Image
                src={thumbnailPreview}
                alt="Thumbnail preview"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          checked={formData.featured}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-gray-300">
          Feature this course on the homepage
        </label>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-pink-600 hover:text-pink-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            className="flex-1  bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Add a tag and press Enter"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Prerequisites
        </label>
        <div className="space-y-2 mb-3">
          {formData.prerequisites?.map((prereq, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3  bg-gray-900 "
            >
              <span className="text-gray-300">{prereq}</span>
              <button
                type="button"
                onClick={() => removePrerequisite(prereq)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newPrerequisite}
            onChange={(e) => setNewPrerequisite(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addPrerequisite())
            }
            className="flex-1  bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Add a prerequisite"
          />
          <button
            type="button"
            onClick={addPrerequisite}
            className="px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Learning Objectives */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Learning Objectives
        </label>
        <div className="space-y-2 mb-3">
          {formData.learningObjectives?.map((objective, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3  bg-gray-900 "
            >
              <span className="text-gray-300">{objective}</span>
              <button
                type="button"
                onClick={() => removeObjective(objective)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addObjective())
            }
            className="flex-1  bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Add a learning objective"
          />
          <button
            type="button"
            onClick={addObjective}
            className="px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Target Audience
        </label>
        <div className="space-y-2 mb-3">
          {formData.targetAudience?.map((audience, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3  bg-gray-900 "
            >
              <span className="text-gray-300">{audience}</span>
              <button
                type="button"
                onClick={() => removeAudience(audience)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newAudience}
            onChange={(e) => setNewAudience(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addAudience())
            }
            className="flex-1  bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Add target audience"
          />
          <button
            type="button"
            onClick={addAudience}
            className="px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="  bg-gray-900 border border-gray-800 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEditing ? "Edit Course" : "Add New Course"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Step {currentStep} of 3:{" "}
              {currentStep === 1
                ? "Basic Information"
                : currentStep === 2
                ? "Pricing & Duration"
                : "Additional Details (Optional)"}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-pink-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? "bg-pink-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-h-[calc(90vh-200px)]"
        >
          <div className="flex-1 overflow-y-auto p-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 flex items-center justify-between">
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep(currentStep)) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      alert("Please fill in all required fields");
                    }
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Saving..."
                    : isEditing
                    ? "Update Course"
                    : "Create Course"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
