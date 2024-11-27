import localFont from "next/font/local";
import "./globals.css";
import TopHeader from "@/components/header/TopHeader";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import orthopedicSurgeonImage from "../public/assests/rakeshYadav.png";
import Footer from "@/components/footer/foooter";
import BackToTop from "@/components/Back-to-top";
import NavLink from "@/components/header/NavLink";
import MobileNav from "@/components/header/MobileNav";
import { metadata } from "./metadata";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export { metadata };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <header>
          <div className="fixed left-0 right-0 z-50">
            <TopHeader />

            {/* Navigation */}
            {/* <header className="border-b bg-white py-2 md:py-4"> */}
            {/* <div className=" flex justify-between px-2 md:px-4 border-b bg-red-500 py-2 md:py-4 "> */}
            {/* <div className="flex items-center gap-4 px-2">
                  <Image
                    src={orthopedicSurgeonImage}
                    alt="Physiocare Logo"
                    width={40}
                    height={40}
                    className="h-16 w-16 rounded-full items-center border-2 border-green-500 "
                  />
                  <h1 className=" font-semibold text-emerald-600 text-2xl md:text-3xl">
                    Dr. Rakesh Kumar Yadav{" "}
                    <p className="text-[#8fa5a0] text-base md:text-xl text-center ">
                      Orthopedic Surgeon
                    </p>
                  </h1>
                </div> */}

            {/* Desktop Navigation */}
            <div className="flex justify-around px-2 md:px-4 border-b bg-white py-2 md:py-4 ">
              <div className=" flex justify-center items-center">
                <nav>
                  <ul className="flex items-center gap-6">
                    <li>
                      <NavLink href="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink href="/about-us">About Us</NavLink>
                    </li>
                    <li>
                      <NavLink href="/services">Services</NavLink>
                    </li>
                    <li>
                      <NavLink href="/contact">Contact Us</NavLink>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <Button className="hidden items-center gap-2 bg-emerald-600 hover:bg-emerald-700 hover:font-bold md:flex">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+9779809627872" target="_blank">
                    +977-9809627872
                  </a>
                </Button>
                <MobileNav />
              </div>
            </div>
          </div>
          {/* </header> */}
          {/* </div> */}
        </header>

        {/* Main Section */}
        <main className="min-h-screen bg-gray-50 pt-9">{children}</main>

        {/* Footer */}
        <footer>
          <Footer />
          <BackToTop />
        </footer>
      </body>
    </html>
  );
}
