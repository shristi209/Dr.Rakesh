import Breadcrumb from "@/components/Breadcrumb";
import ContactPage from "@/components/contact/contact-form";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    {
      label: "Contact Us",
      href: "/contact",
    },
  ];
  return (
    <div className="pt-[77px] md:pt-[98px] ">
      <Breadcrumb items={breadcrumbItems} />
      <ContactPage />
    </div>
  );
}
