import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import hero from "../public/assests/Physiocare - Physiotherapy HTML Template_files/hero-img.png";
export default function Main() {
  return (
    <>
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-0 ">
        {" "}
        <div className="container px-4 py-12 md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter text-gray-900 md:text-5xl lg:text-6xl">
                Destination For
                <br />
                Relief & Wellness
              </h1>
              <p className="max-w-[600px] text-gray-600">
                It is a long established fact that a reader will be distracted
                the readable content of a page when looking at layout the point
                of using lorem the ipsum less normal distribution of letters.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <div className="text-3xl font-bold text-emerald-600">
                    16/7
                  </div>
                  <div className="text-sm text-gray-600">Emergency Care</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">55+</div>
                  <div className="text-sm text-gray-600">Doctors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">
                    68k+
                  </div>
                  <div className="text-sm text-gray-600">Customer</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src={hero}
                alt="Medical Professional"
                width={500}
                height={500}
                className="rounded-full"
                priority
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-white p-3 shadow-lg">
                <Image
                  src={hero}
                  alt="Dr. Jamie Smith"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">DR. Rakesh Kumar Yadav</div>
                  <div className="text-sm text-gray-600">
                    Orthopedic Surgeon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
