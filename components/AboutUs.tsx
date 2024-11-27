import { Apple, Dumbbell, SmilePlus } from "lucide-react";
import Image from "next/image";
import AboutImage from "../public/assests/Physiocare - Physiotherapy HTML Template_files/about-img.jpg";
// import aboutDoctorImage from "../public/assests/Physiocare - Physiotherapy HTML Template_files/export-doctor-img.jpg";
import Breadcrumb from "./Breadcrumb";
import { AppointmentButton2 } from "./AppointmentButton";
export default function AboutUs() {
  return (
    <div className="pt-[13px]">
      {/* <Breadcrumb pageName="About Us" /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
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
              <span className="text-emerald-600 text-4xl ">
                Orthopaedics & Traumatology
              </span>
            </h1>

            <p className="text-gray-600 text-base text-justify ">
              Dr. Rakesh Kumar Yadav, MBBS, MS-Orthopaedics, is a distinguished
              orthopedic surgeon with extensive expertise in musculoskeletal
              health and care. A dedicated professional, he has completed
              prestigious fellowships in various subspecialties of orthopedics,
              enhancing his skills in advanced surgical techniques, trauma
              management, joint replacement, and sports medicine. Known for his
              patient-centric approach, Dr. Yadav is committed to providing
              comprehensive and personalized care, ensuring optimal recovery and
              mobility for his patients. With a blend of academic rigor and
              clinical excellence, he continues to contribute to the field
              through innovation, research, and mentorship, upholding the
              highest standards in orthopedic practice.
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

            <div className="flex items-center justify-center">
              {/* <div className="flex items-center gap-4">
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
              </div> */}

              <AppointmentButton2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
