import { Button } from "@/components/ui/button";
import { ArrowRight, Apple, Dumbbell, SmilePlus } from "lucide-react";
import Image from "next/image";
import AboutImage from "../public/assests/Physiocare - Physiotherapy HTML Template_files/about-img.jpg";
import aboutDoctorImage from "../public/assests/Physiocare - Physiotherapy HTML Template_files/export-doctor-img.jpg";
export default function AboutUs() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={AboutImage}
              alt="Physiotherapy session"
              width={800}
              height={600}
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute bottom-8 left-8 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="text-emerald-600">
                  <span className="text-4xl font-bold">15+</span>
                </div>
                <div className="text-gray-600">
                  <p className="text-sm">Years Of</p>
                  <p className="text-sm font-semibold">Experience</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                About Us
              </span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              We Are The Best For{" "}
              <span className="text-emerald-600">Physiotherapy</span>
            </h1>

            <p className="text-gray-600 text-lg">
              We understand that injuries and acute pain can happen
              unexpectedly. Our emergency physiotherapy services are designed to
              provide prompt and effective care to help you manage pain, prevent
              further injury, and start your recovery process as quickly as
              possible.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Apple className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Nutrition Strategies
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <SmilePlus className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Be Pro Active</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Dumbbell className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Workout Routines
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <SmilePlus className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Support & Motivation
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={aboutDoctorImage}
                  alt="Dr. Jamie Smith"
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Dr. Jamie Smith
                  </h3>
                  <p className="text-emerald-600">Physiotherapy</p>
                </div>
              </div>

              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6  rounded-full">
                Make An Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
