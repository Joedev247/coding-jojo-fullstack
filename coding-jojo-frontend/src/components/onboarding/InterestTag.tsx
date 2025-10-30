import React from 'react';

interface InterestTagProps {
  interest: string;
  isSelected: boolean;
  onSelect: (interest: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const InterestTag: React.FC<InterestTagProps> = ({
  interest,
  isSelected,
  onSelect,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-xs',
    lg: 'px-3 py-2 text-sm',
  };

  return (
    <button
      onClick={() => onSelect(interest)}
      className={`${sizeClasses[size]} border-2  cursor-pointer transition-all text-center hover:shadow-md font-medium ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
          : 'border-gray-200 hover:border-indigo-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      {interest}
    </button>
  );
};

export default InterestTag;