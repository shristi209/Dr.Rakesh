import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1b3a2d] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full" />
              <span className="text-2xl font-bold">Physio<span className="text-[#8fa5a0]">care</span></span>
            </div>
            <p className="text-sm text-gray-300">
              We understand that injuries and acute pain can happen unexpectedly. Our emergency physiotherapy.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-[#8fa5a0] transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#8fa5a0] transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#8fa5a0] transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#8fa5a0] transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-xl text-[#8fa5a0]">Working Hours</h3>
            <div className="space-y-2">
              <p>Mon To Fri : 10:00 To 6:00</p>
              <p>Sat : 10:00AM To 3:00PM</p>
              <p>Sun : Closed</p>
            </div>
          </div>

          {/* More Services */}
          <div className="space-y-4">
            <h3 className="text-xl text-[#8fa5a0]">More Services</h3>
            <div className="space-y-2">
              <Link href="#" className="block hover:text-[#8fa5a0] transition-colors">
                Manual Therapy
              </Link>
              <Link href="#" className="block hover:text-[#8fa5a0] transition-colors">
                Chronic Pain
              </Link>
              <Link href="#" className="block hover:text-[#8fa5a0] transition-colors">
                Hand Therapy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl text-[#8fa5a0]">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#8fa5a0]" />
                <span>(+0) 789 3456 012</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#8fa5a0]" />
                <span>domain@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#8fa5a0]" />
                <span>24/11 Robert Road,New York,USA</span>
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
            <Link href="#" className="text-sm text-gray-300 hover:text-[#8fa5a0] transition-colors">
              About Us
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-[#8fa5a0] transition-colors">
              Services
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-[#8fa5a0] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}