import Image from "next/image";
import hero from "../../public/assests/rakeshYadav.png";
import { AppointmentButton, ExploreServices } from "./AppointmentButton";
export default function Main() {
  return (
    <>
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-4 ">
        {" "}
        <div className="container px-4 py-12 md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className=" space-y-2 md:space-y-4">
              <h1 className="text-2xl font-bold   text-gray-900 md:text-4xl  text-nowrap ">
                Dr. Rakesh Kr. Yadav
              </h1>
              <p className="text-xl font-semibold text-emerald-600">
              MBBS, MS-Orthopaedics  Surgeon
              </p>
              <p className="max-w-[600px] text-gray-600 md:text-base text-sm text-justify md:text-nowrap pb-4 ">
                Fellowship in Arthroscopic Surgery(India), Fellowship in
                Ilizarov Surgery (Kurgan)
              </p>
              <div className="flex flex-wrap md:gap-8 ">
                <div className="hidden text-white md:block">
                  <ExploreServices />
                </div>
                <AppointmentButton />
              </div>
              {/* <div className="grid gap-8 sm:grid-cols-3">
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
              </div> */}
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
