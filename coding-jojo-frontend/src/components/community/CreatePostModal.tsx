// Create Post Modal component for creating and editing posts
"use client"

import React, { useState, useEffect } from 'react';
import { X, Plus, Image as ImageIcon, Link, Code, Bold, Italic, List } from 'lucide-react';
import { Post } from '../../services/communityApi';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => Promise<void>;
  categories: Array<{ _id: string; name: string; slug: string }>;
  editPost?: Post | null;
  isAdmin?: boolean;
}

const POST_TYPES = [
  { value: 'general', label: 'General Discussion', description: 'General programming discussions' },
  { value: 'javascript', label: 'JavaScript', description: 'JavaScript and frameworks' },
  { value: 'python', label: 'Python', description: 'Python programming' },
  { value: 'react', label: 'React', description: 'React.js discussions' },
  { value: 'node', label: 'Node.js', description: 'Backend with Node.js' },
  { value: 'web-design', label: 'Web Design', description: 'UI/UX and design' },
  { value: 'career', label: 'Career Advice', description: 'Career guidance' },
  { value: 'projects', label: 'Project Showcase', description: 'Show your projects' }
];

const ADMIN_POST_TYPES = [
  { value: 'questions', label: 'Questions', description: 'Community Q&A' },
  { value: 'discussions', label: 'Discussions', description: 'General discussions' },
  { value: 'announcements', label: 'Announcements', description: 'Important updates' },
  { value: 'showcase', label: 'Showcase', description: 'Featured projects' },
  { value: 'resources', label: 'Resources', description: 'Learning materials' }
];

export default function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  editPost,
  isAdmin = false
}: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Available post types based on user role
  const availableTypes = isAdmin ? ADMIN_POST_TYPES : POST_TYPES;

  // Initialize form data
  useEffect(() => {
    if (editPost) {
      setFormData({
        title: editPost.title,
        content: editPost.content,
        category: editPost.category,
        tags: editPost.tags || []
      });
    } else {
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: []
      });
    }
    setErrors({});
  }, [editPost, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target === document.querySelector('#tag-input')) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters long';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.tags.length > 10) {
      newErrors.tags = 'Maximum 10 tags allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertTextAtCursor = (textarea: HTMLTextAreaElement, text: string) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = textarea.value.substring(0, start) + text + textarea.value.substring(end);
    
    setFormData(prev => ({ ...prev, content: newContent }));
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const handleFormatting = (format: string) => {
    const textarea = document.querySelector('#content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    switch (format) {
      case 'bold':
        insertTextAtCursor(textarea, `**${selectedText || 'bold text'}**`);
        break;
      case 'italic':
        insertTextAtCursor(textarea, `*${selectedText || 'italic text'}*`);
        break;
      case 'code':
        if (selectedText.includes('\n')) {
          insertTextAtCursor(textarea, `\`\`\`\n${selectedText || 'code block'}\n\`\`\``);
        } else {
          insertTextAtCursor(textarea, `\`${selectedText || 'code'}\``);
        }
        break;
      case 'list':
        insertTextAtCursor(textarea, `\n- ${selectedText || 'list item'}\n- \n- `);
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {editPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter a descriptive title for your post..."
                className={`w-full px-4 py-3 bg-gray-700 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-600'
                }`}
                maxLength={200}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                {formData.title.length}/200 characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-700 border text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Select a category</option>
                {availableTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-400">{errors.category}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              
              {/* Formatting toolbar */}
              <div className="flex items-center space-x-2 mb-2 p-2 bg-gray-700 border border-gray-600">
                <button
                  type="button"
                  onClick={() => handleFormatting('bold')}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition duration-200"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormatting('italic')}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition duration-200"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormatting('code')}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition duration-200"
                  title="Code"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormatting('list')}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition duration-200"
                  title="List"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <textarea
                id="content-textarea"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your post content here... You can use markdown formatting."
                className={`w-full px-4 py-3 bg-gray-700 border border-t-0 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none ${
                  errors.content ? 'border-red-500' : 'border-gray-600'
                }`}
                rows={12}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-400">{errors.content}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                {formData.content.length} characters. Supports markdown formatting.
              </p>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                Tags (Optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-pink-500/20 text-pink-300 text-sm "
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-pink-400 hover:text-pink-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  id="tag-input"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.includes(tagInput.trim())}
                  className="px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {errors.tags && (
                <p className="mt-1 text-sm text-red-400">{errors.tags}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                Add relevant tags to help others find your post. {formData.tags.length}/10 tags
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700 mt-6">
            <div className="text-sm text-gray-400">
              {editPost ? 'Update your post' : 'Share your knowledge with the community'}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-400 hover:text-white transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-orange-500 hover:to-pink-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Publishing...' : editPost ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
