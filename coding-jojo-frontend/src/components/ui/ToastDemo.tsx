"use client";

import React from "react";
import { useToast } from "../../hooks/useToast";
import { useToastContext } from "../../contexts/ToastContext";

const ToastDemo: React.FC = () => {
  const toast = useToast();
  const toastContext = useToastContext();

  const handleSuccessToast = () => {
    toast.success("Success! Operation completed successfully.", {
      description: "Your changes have been saved.",
      duration: 4000,
    });
  };

  const handleErrorToast = () => {
    toast.error("Error! Something went wrong.", {
      description: "Please try again later.",
      action: {
        label: "Retry",
        onClick: () => toast.info("Retrying..."),
      },
    });
  };

  const handleWarningToast = () => {
    toast.warning("Warning! Please check your input.", {
      description: "Some fields may be missing.",
    });
  };

  const handleInfoToast = () => {
    toast.info("Info: New feature available!", {
      description: "Check out our latest updates.",
    });
  };
  const handleLoadingToast = () => {
    const loadingToast = toast.loading("Loading data...") as string;

    // Simulate async operation
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success("Data loaded successfully!");
    }, 3000);
  };
  const handlePromiseToast = () => {
    const asyncOperation = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Success!");
        } else {
          reject("Failed!");
        }
      }, 2000);
    });

    toast.promise(asyncOperation, {
      loading: "Processing your request...",
      success: "Request completed successfully!",
      error: "Request failed. Please try again.",
    });
  };
  const handleCustomToast = () => {
    toast.custom(
      (id) => (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white  shadow-lg">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            🎉
          </div>
          <div>
            <p className="font-semibold">Custom Toast!</p>
            <p className="text-sm opacity-90">This is a custom styled toast.</p>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        Toast Notification Demo
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleSuccessToast}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white  transition-colors"
        >
          Success Toast
        </button>

        <button
          onClick={handleErrorToast}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white  transition-colors"
        >
          Error Toast
        </button>

        <button
          onClick={handleWarningToast}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white  transition-colors"
        >
          Warning Toast
        </button>

        <button
          onClick={handleInfoToast}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white  transition-colors"
        >
          Info Toast
        </button>

        <button
          onClick={handleLoadingToast}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white  transition-colors"
        >
          Loading Toast
        </button>

        <button
          onClick={handlePromiseToast}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white  transition-colors"
        >
          Promise Toast
        </button>

        <button
          onClick={handleCustomToast}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white  transition-all"
        >
          Custom Toast
        </button>

        <button
          onClick={() => toast.dismissAll()}
          className="px-4 py-2  bg-gray-900 hover:  bg-gray-900 text-white  transition-colors"
        >
          Dismiss All
        </button>
      </div>

      <div className="mt-8 p-4  bg-gray-900/50 ">
        <h3 className="text-lg font-semibold text-white mb-2">
          Usage Examples:
        </h3>
        <div className="text-sm text-gray-300 space-y-2">
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded">
              toast.success('Message')
            </code>{" "}
            - Success notification
          </p>
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded">
              toast.error('Message')
            </code>{" "}
            - Error notification
          </p>
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded">
              toast.warning('Message')
            </code>{" "}
            - Warning notification
          </p>
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded">
              toast.info('Message')
            </code>{" "}
            - Info notification
          </p>
          <p>
            <code className="bg-gray-700 px-2 py-1 rounded">
              toast.loading('Message')
            </code>{" "}
            - Loading notification
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
