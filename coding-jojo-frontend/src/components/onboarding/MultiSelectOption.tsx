import React from 'react';
import { CheckCircle } from 'lucide-react';

interface MultiSelectOptionProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
  id,
  title,
  description,
  icon,
  isSelected,
  onSelect,
  disabled = false,
}) => {
  return (
    <div
      onClick={() => !disabled && onSelect(id)}
      className={`p-3 border-2  cursor-pointer transition-all hover:shadow-md ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : isSelected
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-200 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`p-1.5  ${
            isSelected
              ? 'bg-indigo-100 text-indigo-600'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 text-sm">{title}</h3>
          {description && (
            <p className="text-gray-600 text-xs">{description}</p>
          )}
        </div>
        {isSelected && (
          <CheckCircle className="w-4 h-4 text-indigo-600" />
        )}
      </div>
    </div>
  );
};

export default MultiSelectOption;