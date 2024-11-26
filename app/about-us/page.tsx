import AboutUs from "@/components/AboutUs";
import ContactPage from "@/components/contact/contact-form";
import React from "react";

export default function page() {
  return (
    <div className="pt-16 md:pt-[85px] ">
      <AboutUs />
      <ContactPage />
    </div>
  );
}
