"use client";
import React from "react";
import { AlertCircle, X } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  itemName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="  bg-gray-900 border border-gray-800 shadow-2xl w-full max-w-md animate-fade-in">
        <div className="p-6 flex items-start space-x-4">
          <div className="bg-red-500/20 rounded-full p-3">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this {itemName}? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2  bg-gray-900 hover:bg-gray-700 text-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
