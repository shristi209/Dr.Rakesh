
import { Phone, Mail, Clock ,Facebook, Twitter, Instagram} from "lucide-react";
import Link from "next/link";
import React from "react";
import { ContactInformation } from "@/app/api/apicontact";

interface TopHeaderProps {
  contactInformation: ContactInformation;
}

export default function TopHeader({ contactInformation }: TopHeaderProps) {

  return (
    <div className="bg-emerald-600 py-2 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center space-y-2 sm:space-y-0">
        <div className="flex flex-wrap items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <Link 
              href={`tel:${contactInformation.phone}`} 
              className="hover:underline"
            >
              {contactInformation.phone}
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <Link 
              href={`mailto:${contactInformation.email}`} 
              className="hover:underline"
            >
              {contactInformation.email}
            </Link>
          </div>
        </div>
        <div className="items-center gap-4 hidden md:flex ">
          <Link
            href={contactInformation?.facebook || "#"}
            target="_blank"
            className="hover:text-emerald-200"
          >
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link 
            href={contactInformation?.twitter || "#"} 
            className="hover:text-emerald-200"
            target="_blank"
          >
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link 
            href={contactInformation?.instagram || "#"} 
            className="hover:text-emerald-200"
            target="_blank"
          >
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
