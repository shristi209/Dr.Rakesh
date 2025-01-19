"use client"

import DynamicForm from "@/components/ui/dynamicForm";
import Breadcrumb from "@/components/website/Breadcrumb";
import { useRouter } from "next/navigation";
import data from '../../../../../public/data/addUser.json'
import axios from "axios";

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
  const handleFormSubmit = async (data: Record<string, string>) => {
    console.log("Form Data:", data);

    const response = await axios.post("/api/admin/users", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      alert("User added successfully!");
      router.push("/admin/users");
    } else {
      alert("Failed to add user!");
    }
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <DynamicForm elements={data.elements} onSubmit={handleFormSubmit}></DynamicForm>
    </>
  )
}