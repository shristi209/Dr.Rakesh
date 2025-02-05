import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import orthopedicSurgeonImage from "../../../public/assests/FRHSJuly23-3002.jpg";
import { ContactInformation } from "@/app/api/apicontact";

interface FooterProps {
  contactInformation: ContactInformation;
}

export default function Footer({ contactInformation }: FooterProps) {
  return (
    <footer className="bg-[#1b3a2d] text-white pb-8 md:pb-0 ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 md:w-14 h-10 md:h-14 bg-white rounded-full">
                <Image
                  src={orthopedicSurgeonImage}
                  alt="Physiocare Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 md:h-14 md:w-14 rounded-full"
                />
              </div>
              <span className="text-2xl font-bold">
                Orthopedic <span className="text-[#8fa5a0]">Surgeon</span>
              </span>
            </div>
            <p className="text-sm text-gray-300">
              We understand that injuries and acute pain can happen
              unexpectedly. Our emergency Orthopedic Surgery.
            </p>
            <div className="flex space-x-4">
              <Link
                href={contactInformation.facebook}
                className="hover:text-[#8fa5a0] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href={contactInformation.twitter}
                className="hover:text-[#8fa5a0] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href={contactInformation.instagram}
                className="hover:text-[#8fa5a0] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-xl text-[#8fa5a0]">Working Hours</h3>
            <div className="space-y-2">
              {contactInformation.working_hours.split("\n").map((hour, index) => (
                <p key={index}>{hour}</p>
              ))}
            </div>
          </div>

          {/* More Services */}
          <div className="space-y-4">
            <h3 className="text-xl text-[#8fa5a0]">More Services</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block hover:text-[#8fa5a0] transition-colors"
              >
                Pediatric orthopaedics
              </Link>
              <Link
                href="#"
                className="block hover:text-[#8fa5a0] transition-colors"
              >
                Musculoskeletal oncology
              </Link>
              <Link
                href="#"
                className="block hover:text-[#8fa5a0] transition-colors"
              >
                Adult reconstructive orthopaedics
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl text-[#8fa5a0]">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#8fa5a0]" />
                <span>{contactInformation.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#8fa5a0]" />
                <a href={`tel:${contactInformation.phone}`} target="_blank">
                  {contactInformation.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#8fa5a0]" />
                <a href={`mailto:${contactInformation.email}`} target="_blank">
                  {contactInformation.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            Copyright 2024 Physiocare. All Rights Reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/about-us"
              className="text-sm text-gray-300 hover:text-[#8fa5a0] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="text-sm text-gray-300 hover:text-[#8fa5a0] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-300 hover:text-[#8fa5a0] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
