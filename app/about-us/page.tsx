import AboutUs from "@/components/AboutUs";
import Breadcrumb from "@/components/Breadcrumb";
import ContactPage from "@/components/contact/contact-form";
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
