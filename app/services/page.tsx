import Breadcrumb from "@/components/Breadcrumb";
import ContactPage from "@/components/contact/contact-form";
import { ServicesSection } from "@/components/services/service-section";
import React from "react";

export default function page() {
  const breadcrumbItems = [
    {
      label: "Services",
      href: "/services",
    },
  ];
  return (
    <div className="pt-[77px] md:pt-[98px] ">
      <Breadcrumb items={breadcrumbItems} />
      <ServicesSection />
      <ContactPage />
    </div>
  );
}
