import AboutUs from "@/components/website/AboutUs";
import React from "react";
import { getAboutData } from "@/app/api/apiaboutus";
import {Breadcrumb} from "@/components/website/Breadcrumb";

export const metadata ={
  title: "Dr. Rakesh Yadav - About-Us",
}

export default async function page() {
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
    </div>
  );
}
