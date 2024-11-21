"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors duration-200",
        isActive ? "text-emerald-600 font-medium" : "text-gray-800 hover:text-emerald-600"
      )}
    >
      {children}
    </Link>
  );
}