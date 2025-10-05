"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`  bg-gray-900/70 backdrop-blur-sm border border-gray-800  shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
