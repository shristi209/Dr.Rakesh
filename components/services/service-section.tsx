import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "./service-card";
import Breadcrumb from "../Breadcrumb";

const services = [
  {
    title: "Spine Surgeon",
    description:
      "The vertebral column, also known as the spinal column, spine or backbone, is the core part of the axial skeleton in vertebrate animals.",
    image: "/assests/download.jpeg",
  },
  {
    title: "Trauma ",
    description:
      "Trauma is an emotional response to a terrible event like an accident, crime, natural disaster, physical or emotional abuse, neglect, experiencing or witnessing violence, death of a loved one, war, and more. Immediately after the event, shock and denial are typical.",
    image: "/assests/download (1).jpeg",
  },
  {
    title: "Ankle Surgery",
    description:
      " Ankle surgery is a surgical procedure performed on the ankle joint. The ankle joint is a hinge joint that connects the foot with the lower leg. It is composed of three bones: the tibia, fibula, and talus. The tibia and fibula are bones of the lower leg, while the talus is a bone of the foot.",
    image: "/assests/images.jpeg",
  },
  {
    title: "Joint Replacement",
    description:
      "Joint replacement surgery is removing a damaged joint and putting in a new one. A joint is where two or more bones come together, like the knee, hip, and shoulder. The surgery is usually done by a doctor called an orthopaedic (or-tho-PEE-dik) surgeon.",
    image: "/assests/download (3).jpeg",
  },
  {
    title: "Carpal tunnel syndrome",
    description:
      "Carpal tunnel syndrome is a condition that causes numbness, tingling and other symptoms in the hand and arm. Carpal tunnel syndrome is caused by a compressed nerve in the carpal tunnel, a narrow passageway on the palm side of your wrist.",
    image: "/assests/download (4).jpeg",
  },
  {
    title: "Fractures",
    description:
      "A fracture is a broken bone. It requires medical attention. If the broken bone is the result of major trauma or injury, call 911 or your local emergency number. Also call for emergency help if the person is unresponsive, isn't breathing or isn't moving.",
    image: "/assests/download (5).jpeg",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <Breadcrumb pageName="Services" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-4">
            <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
              Orthopedic Surgeon Team
            </span>
            <h2 className="text-4xl font-bold">
              <span className="text-emerald-600">We Provide</span> The Best
              Services
            </h2>
          </div>
          {/* <Button variant="outline" className="rounded-full">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">
            Ready To Start Your Journey To Recovery?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We understand that injuries and acute pain can unexpectedly. Our
            emergency physiotherapy.
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6  rounded-full">
            Book Appointment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
