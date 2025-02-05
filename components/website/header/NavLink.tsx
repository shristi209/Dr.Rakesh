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
  
  return (
    <Link
      href={href}
      className={cn(
        "text-base font-medium transition-colors hover:text-emerald-600 ",
        pathname === href
          ? "text-emerald-600"
          : "text-gray-600"
      )}
    >
      {children}
    </Link>
  );
}