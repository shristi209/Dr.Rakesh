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

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {/* Image Container */}
          <div className="relative h-20 w-20 shrink-0 rounded-xl bg-emerald-50 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="80px"
              className="object-cover rounded-xl"
              priority
            />
          </div>
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
        </div>
        {/* Description */}
        <p className="text-gray-600">
          {isExpanded
            ? description
            : description?.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>
        {/* Read More Button */}
        {description?.length > 100 && (
          <button
            className="text-emerald-600 hover:text-emerald-800 focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read Less" : "Read More ....."}
          </button>
        )}
      </div>
    </div>
  );
}
