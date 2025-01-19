"use client"
import { useState } from "react";  // Import useState
import DynamicForm from "@/components/ui/dynamicForm";
import Breadcrumb from "@/components/website/Breadcrumb";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [form, setForm] = useState(false);

  const breadcrumbItems = [
    {
      label: "About Us",
      href: "/admin/about-us",
    },
  ];

  const formElements = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter the title",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter the description",
    },
    {
      name: "picture",
      label: "Picture URL",
      type: "text",
      placeholder: "Enter the image URL",
    },
  ];

  const handleFormSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Button onClick={() => setForm(!form)}>Add</Button>

      {form && (
        <div className="w-full">
          <DynamicForm elements={formElements} onSubmitAction={handleFormSubmit} />
        </div>
      )}
    </>
  );
}
