"use client"
import DynamicForm from "@/components/ui/dynamicForm";
import { Breadcrumb } from "@/components/website/Breadcrumb";
import { redirect } from "next/navigation";
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

      <div className="mt-5 mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Add User </h2>
          </div>
          <div className="p-6">
            <DynamicForm
              elements={data.elements}
              onSubmitAction={wrapFormSubmit(handleFormSubmit)}
            />
          </div>
        </div>
      </div>
    </>
  )
}