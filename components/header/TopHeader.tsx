import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TopHeader() {
  return (
    <div className="bg-emerald-600 py-2 text-white">
      <div className="container flex items-center justify-between px-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <a href="tel:+9779809627872" target="_blank">
              +977-9809627872
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:drrakeshyad2073@gmail.com" target="_blank">
              drrakeshyad2073@gmail.com
            </a>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <MapPin className="h-4 w-4" />
            <span>Prayag Adhikari Health Care & Hospital</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.facebook.com/profile.php?id=61566765223666&mibextid=LQQJ4d"
            target="_blank"
            className="hover:text-emerald-200"
          >
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="hover:text-emerald-200">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="hover:text-emerald-200">
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="hover:text-emerald-200">
            <Youtube className="h-4 w-4" />
            <span className="sr-only">YouTube</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
