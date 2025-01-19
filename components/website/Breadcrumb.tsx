// "use client";

// import Link from "next/link";
// import { ChevronRight, Home } from "lucide-react";
// import { usePathname } from "next/navigation";

// interface BreadcrumbProps {
//   pageName: string;
// }

// export default function Breadcrumb({ pageName }: BreadcrumbProps) {
//   const pathname = usePathname();
//   console.log(pageName,"pageName");

//   // Don't show breadcrumb on home page
//   if (pathname === "/") return null;

//   // Convert pathname to breadcrumb segments
//   const segments = pathname.split('/').filter(Boolean);
//   const breadcrumbs = segments.map((segment, index) => {
//     const href = `/${segments.slice(0, index + 1).join('/')}`;
//     const label = segment.split('-').map(word =>
//       word.charAt(0).toUpperCase() + word.slice(1)
//     ).join(' ');

//     return { href, label };
//   });

//   return (
//     <div className="bg-gray-100 py-4">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-2 text-sm">
//           <Link
//             href="/"
//             className="flex items-center gap-1  hover:text-emerald-700"
//           >
//             <Home className="h-4 w-4" />
//             Home
//           </Link>
//           {breadcrumbs.map((crumb, index) => (
//             <div key={crumb.href} className="flex items-center gap-2">
//               <ChevronRight className="h-4 w-4 text-gray-400" />
//               {index === breadcrumbs.length - 1 ? (
//                 <span className="font-medium text-emerald-600">{crumb.label}</span>
//               ) : (
//                 <Link
//                   href={crumb.href}
//                   className="text-gray-600 hover:text-emerald-600"
//                 >
//                   {crumb.label}
//                 </Link>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import AdminButton from "../dashboard/button";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 flex justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={isAdmin ? "/admin/" : "/"}
            className="flex items-center gap-1  hover:text-emerald-700"
          >
            <Home className="h-4 w-4" />
            {isAdmin ? "Dashboard" : "Home"}
          </Link>

          {items?.map((item, index) => (
            <div key={item.href} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />

              <Link
                href={item.href}
                className={`${index === items.length - 1
                    ? "font-medium text-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                  }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
}
