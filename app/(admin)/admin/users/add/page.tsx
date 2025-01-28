"use client"
import DynamicForm from "@/components/ui/dynamicForm";
import { Breadcrumb } from "@/components/website/Breadcrumb";
import { redirect } from "next/navigation";
import data from '../../../../../public/data/addUser.json'
import axios from "axios";
import { wrapFormSubmit } from "@/lib/form-utils";
import { OK } from "zod";

export default function Page() {
  const breadcrumbItems = [
    {
      label: "Users",
      href: "/admin/users",
    },
    {
      label: "Add",
      href: "/admin/users/add",
    },
  ];

  const handleFormSubmit = async (formData: Record<string, string>) => {
    try {
      const response = await axios.post("/api/admin/users", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("User added successfully!");
        redirect("/admin/users");
      } else {
        alert("Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user!");
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <DynamicForm 
        elements={data.elements} 
        onSubmitAction={wrapFormSubmit(handleFormSubmit)} 
      />
    </>
  )
}