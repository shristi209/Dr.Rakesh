"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  pageName: string;
}

export default function Breadcrumb({ pageName }: BreadcrumbProps) {
  return (
    <div className="bg-green-100 py-4 md:hidden ">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{pageName}</span>
        </div>
      </div>
    </div>
  );
}
