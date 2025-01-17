import AboutUs from "@/components/website/AboutUs";
import Breadcrumb from "@/components/website/Breadcrumb";
import ContactPage from "@/components/website/contact/contact-form";
import React from "react";

export default function page() {
  const breadcrumbItems = [
    {
      label: 'About Us',
      href: '/about',
    },
  ];
  return (
    <div className="pt-[77px] md:pt-[98px] ">
      <Breadcrumb items={breadcrumbItems} />
      <AboutUs />
      <ContactPage />
    </div>
  );
}
