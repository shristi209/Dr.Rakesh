import { getServices, ServiceData } from "@/app/api/apiservice";
import { ServicesSection } from "@/components/website/services/service-section";
import { Breadcrumb } from "@/components/website/Breadcrumb";
import React from "react";

export default async function ServicesPage() {
  const serviceData: ServiceData = await getServices();

  const breadcrumbItems = [
    {
      label: "Services",
      href: "/services",
    },
  ];

  return (
    <div className="pt-[77px] md:pt-[98px]">
      <Breadcrumb items={breadcrumbItems} />
      <ServicesSection serviceData={serviceData} />
    </div>
  );
}
