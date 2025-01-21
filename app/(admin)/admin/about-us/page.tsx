"use client"
import { useState } from "react";  
import DynamicForm from "@/components/ui/dynamicForm";
import Breadcrumb from "@/components/website/Breadcrumb";
import {
  LucidePlus, LucideDelete
} from 'lucide-react';
import AboutUsDetails from "@/components/dashboard/aboutUsDetails";

export default function Page() {

  const breadcrumbItems = [
    {
      label: "About Us",
      href: "/admin/about-us",
    },
  ];
  const HandleSubmit=()=>{
console.log("submit")
  }
  

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <AboutUsDetails></AboutUsDetails>
      


    </>
  );
}
