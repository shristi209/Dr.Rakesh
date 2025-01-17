"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact Us" },
    { href: "/appointment", label: "Book Appointment" },
  ];

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="  md:hidden bg-green-200 border-green-500 border-2 w-10 h-10 rounded-3xl items-center text-center flex justify-center ">
      <Sheet>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] h-auto max-h-[36vh] overflow-y-auto bg-white/70 "
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-emerald-600",
                    pathname === link.href
                      ? "text-emerald-600"
                      : "text-gray-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                className="mt-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                onClick={handleLinkClick}
              >
                <Phone className="h-4 w-4" />
                <a href="tel:+9779809627872">+977-9809627872</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </Sheet>
    </div>
  );
}
