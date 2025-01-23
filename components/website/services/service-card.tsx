"use client";

import Image from "next/image";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

export function ServiceCard({ title, description, image }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Default image path if none provided
  const defaultImage = '';
  
  // Use the provided image path or fall back to default
  const imagePath = image || defaultImage;

  console.log('Service card image path:', { title, imagePath });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {/* Image Container */}
          <div className="relative h-20 w-20 shrink-0 rounded-xl bg-emerald-50 overflow-hidden">
            {!imageError ? (
              <Image
                src={imagePath}
                alt={title}
                fill
                sizes="80px"
                className="object-cover rounded-xl"
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-100">
                <span className="text-emerald-600 text-3xl">+</span>
              </div>
            )}
          </div>
      
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="relative">
          <p className={`text-gray-600 transition-all duration-300 ${
            isExpanded ? 'line-clamp-none' : 'line-clamp-3'
          }`}>
            {description}
          </p>
          
          {/* Gradient Overlay when collapsed */}
          {!isExpanded && description.length > 150 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {/* Read More Button - Only show if description is long enough */}
        {description.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors duration-200"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
}
