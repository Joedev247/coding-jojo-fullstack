"use client"
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating
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