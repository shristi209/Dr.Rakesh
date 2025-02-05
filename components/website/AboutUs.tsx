import { Apple, Dumbbell, SmilePlus, Heart } from "lucide-react";
import Image from "next/image";
import { AboutData } from "@/app/api/apiaboutus";
import { AppointmentButton2 } from "./AppointmentButton";

interface AboutUsProps {
  data?: AboutData | null;
}

export default function AboutUs({ data }: AboutUsProps) {
  const iconMap: { [key: string]: React.ReactNode } = {
    Heart: <Heart className="w-6 h-6 text-emerald-600" />,
    Apple: <Apple className="w-6 h-6 text-emerald-600" />,
    Dumbbell: <Dumbbell className="w-6 h-6 text-emerald-600" />,
    SmilePlus: <SmilePlus className="w-6 h-6 text-emerald-600" />,

    // Add more icons here as needed
  };

  // Log the received data for debugging
  console.log('AboutUs Component - Received Data:', data);

  // Default values in case data is not provided
  // const defaultImage = '/assets/about-img.jpg';
  // const defaultTitle = 'We Are The Best For';
  // const defaultSubTitle = 'Orthopaedics & Traumatology';
  // const defaultDescription = `Dr. Rakesh Kumar Yadav, MBBS, MS-Orthopaedics, is a distinguished
  //   orthopedic surgeon with extensive expertise in musculoskeletal
  //   health and care. A dedicated professional, he has completed
  //   prestigious fellowships in various subspecialties of orthopedics,
  //   enhancing his skills in advanced surgical techniques, trauma
  //   management, joint replacement, and sports medicine.`;
  const defaultExperience = '15+';
  const imageUrl = data?.picture || '/assets/about-img.jpg';
  return (
    <div className="pt-[13px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={imageUrl}
              alt="About Us Image"
              width={800}
              height={600}
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute bottom-8 left-8 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="text-emerald-600">
                  <span className="text-4xl font-bold">{defaultExperience}</span>
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
                {data?.name}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {data?.title ? (() => {
                const words = data.title.split(' ');
                const regularWords = words.slice(0, -3).join(' ');
                const emeraldWords = words.slice(-3).join(' ');
                return (
                  <>
                    {regularWords ? `${regularWords} ` : ''}
                    <span className="text-emerald-600">{emeraldWords || data.title}</span>
                  </>
                );
              })() : 'About Us'}
            </h1>

            <p className="text-gray-600 text-base text-justify">
              {data?.description}
            </p>

            <div className="grid grid-cols-2 gap-8">
              {/* Render details or default icons */}
              {data?.details && data.details.length > 0 ? (
                data.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg">
                      {iconMap[detail.IconName] || <div className="w-6 h-6 text-gray-600">Icon not found</div>}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {(() => {
                          const words = detail.title.split(' ');
                          const regularWords = words.slice(0, -3).join(' ');
                          const emeraldWords = words.slice(-3).join(' ');
                          return (
                            <>
                              {regularWords ? `${regularWords} ` : ''}
                              <span className="text-emerald-600">{emeraldWords || detail.title}</span>
                            </>
                          );
                        })()}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-600">No details available</div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <AppointmentButton2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
