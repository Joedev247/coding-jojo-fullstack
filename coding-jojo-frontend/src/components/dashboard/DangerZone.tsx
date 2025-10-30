import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/button";

interface DangerZoneProps {
  onDeactivateAccount: () => void;
  onDeleteData: () => void;
  onDeleteAccount: () => void;
}

const DangerZone: React.FC<DangerZoneProps> = ({
  onDeactivateAccount,
  onDeleteData,
  onDeleteAccount,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setShowConfirmation(action);
  };

  const confirmAction = () => {
    switch (showConfirmation) {
      case "deactivate":
        onDeactivateAccount();
        break;
      case "delete-data":
        onDeleteData();
        break;
      case "delete-account":
        onDeleteAccount();
        break;
    }
    setShowConfirmation(null);
  };

  const cancelAction = () => {
    setShowConfirmation(null);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-red-200  p-4">
      <div className="flex items-center mb-3">
        <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Danger Zone</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        These actions are irreversible. Please proceed with caution.
      </p>

      <div className="space-y-3">
        <div className="p-3 bg-red-50/50 border border-red-100 ">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Deactivate Account
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Temporarily disable your account. You can reactivate at any
                time.
              </p>
            </div>
            <Button
              variant="warning"
              size="sm"
              className="mt-2 sm:mt-0 text-xs px-3 py-1"
              onClick={() => handleAction("deactivate")}
            >
              Deactivate
            </Button>
          </div>
        </div>

        <div className="p-3 bg-red-50/50 border border-red-100 ">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Delete Course Data
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Delete all your course progress, quiz results, and assignments.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              className="mt-2 sm:mt-0 text-xs px-3 py-1"
              onClick={() => handleAction("delete-data")}
            >
              Delete Data
            </Button>
          </div>
        </div>

        <div className="p-3 bg-red-50/50 border border-red-100 ">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Delete Account Permanently
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                This will permanently delete your account and all data. This
                action cannot be undone.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              className="mt-2 sm:mt-0 text-xs px-3 py-1"
              onClick={() => handleAction("delete-account")}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white  p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Action
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              {showConfirmation === "deactivate" &&
                "Are you sure you want to deactivate your account? You can reactivate it at any time."}
              {showConfirmation === "delete-data" &&
                "Are you sure you want to delete all your course data? This action cannot be undone."}
              {showConfirmation === "delete-account" &&
                "Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost."}
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={cancelAction} className="text-sm px-4 py-2">
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmAction} className="text-sm px-4 py-2">
                {showConfirmation === "deactivate" ? "Deactivate" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangerZone;
