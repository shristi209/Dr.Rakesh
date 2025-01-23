import AboutUs from "@/components/website/AboutUs";
import {Breadcrumb} from "@/components/website/Breadcrumb";
import ContactPage from "@/components/website/contact/contact-form";
import React from "react";
import { AboutData, getAboutData } from "@/app/api/apiaboutus";
import { getContactData } from "@/app/api/apicontact";

interface PageProps {
  aboutData: AboutData | null;
  error: string | null;
}

export default async function page() {
  const contactInformation = await getContactData(1);
  const aboutData = await getAboutData();
  const breadcrumbItems = [
    {
      label: 'About Us',
      href: '/about-us',
    },
  ];
  return (
    <div className="pt-[77px] md:pt-[98px] ">
      <Breadcrumb items={breadcrumbItems} />
      <AboutUs data={aboutData} />
      <ContactPage contactData={contactInformation} />
    </div>
  );
}
