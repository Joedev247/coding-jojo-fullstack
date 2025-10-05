// components/forms/PostForm.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { PostFormData } from "../../types/admin";

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  initialData = {
    title: "",
    content: "",
    type: "announcement",
    pinned: false,
  },
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<PostFormData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="  bg-gray-900 border border-gray-800 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? "Edit Community Post" : "Create New Community Post"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="post-type"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Post Type*
            </label>
            <select
              id="post-type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full  bg-gray-900 border border-gray-700 px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="announcement">Announcement</option>
              <option value="discussion">Discussion</option>
              <option value="question">Question</option>
              <option value="resource">Resource</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="post-title"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Title*
            </label>
            <input
              id="post-title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full  bg-gray-900 border border-gray-700 px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label
              htmlFor="post-content"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Content*
            </label>
            <textarea
              id="post-content"
              name="content"
              required
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full  bg-gray-900 border border-gray-700 px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Write your post content here..."
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              id="pinned"
              name="pinned"
              type="checkbox"
              checked={formData.pinned}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-700 text-pink-500 focus:ring-pink-500  bg-gray-900"
            />
            <label
              htmlFor="pinned"
              className="ml-2 block text-sm text-gray-400"
            >
              Pin this post to the top
            </label>
          </div>
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium px-5 py-2 shadow-md transition duration-200"
            >
              {isEditing ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
