"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import AdminButton from "../dashboard/button";

export interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <nav className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 flex justify-between">
        <div className="flex items-center space-x-2 text-gray-600">
          <Link
            href={isAdmin ? "/admin/" : "/"}
            className="hover:text-emerald-600 flex items-center"
          >
            <Home className="h-4 w-4" />
            {isAdmin ? "Dashboard" : "Home"}
          </Link>

          {items?.map((item, index) => (
            <div key={item.href} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />

              <Link
                href={item.href}
                className={`${index === items.length - 1
                    ? "text-emerald-600"
                    : "hover:text-emerald-600"
                  }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
       
      </div>
    </nav>
  );
}
