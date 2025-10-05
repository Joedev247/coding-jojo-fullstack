'use client';
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface FallbackImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

/**
 * A wrapper around Next.js Image component that provides fallback
 * when the original image fails to load
 */
const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  fallbackSrc = `/testimonial-avatar.jpg`,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default FallbackImage;
