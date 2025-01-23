"use client"

import DynamicForm from "@/components/ui/dynamicForm";
import { Breadcrumb } from "@/components/website/Breadcrumb";
import { useRouter } from "next/navigation";
import data from '../../../../../public/data/addUser.json'
import axios from "axios";
import { wrapFormSubmit } from "@/lib/form-utils";

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

  const router = useRouter();
  const handleFormSubmit = async (formData: Record<string, string>) => {
    try {
      const response = await axios.post("/api/admin/users", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        alert("User added successfully!");
        router.push("/admin/users");
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