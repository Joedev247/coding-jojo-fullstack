import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 'sm' 
}) => {
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const sizeClass = starSizes[size];
  
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : star <= rating + 0.5
              ? 'text-yellow-400 fill-yellow-400 opacity-50'
              : 'text-gray-500'
          }`}
        />
      ))}
    </div>
  );
};

export default RatingStars;