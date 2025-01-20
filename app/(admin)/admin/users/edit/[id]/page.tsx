"use client";

import DynamicForm from "@/components/ui/dynamicForm";
import Breadcrumb from "@/components/website/Breadcrumb";
import { useRouter, usePathname } from "next/navigation";
import data from "../../../../../../public/data/updateUser.json";  
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const userId = pathname?.split("/").pop(); 
  const breadcrumbItems = [
    { label: "Users", href: "/admin/users" },
    { label: "Update", href: `/admin/users/edit/${userId}` },
  ];

  const [userData, setUserData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true); 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/admin/users/${userId}`);
        if (response.status === 200) {
          setUserData(response.data); 
        } else {
          alert("Failed to fetch user data.");
        }
      } catch (error) {
      } finally {
        setLoading(false);  
      }
    };

    if (userId) {
      fetchUserData();  
    } else {
      setLoading(false);
    }
  }, [userId]);  

  const handleFormSubmit = async (formData: Record<string, string>) => {
    console.log("Form Data:", formData);

    try {
      const response = await axios.put(`/api/admin/users/${userId}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("User updated successfully!");
        router.push("/admin/users");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user!!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <DynamicForm elements={data.elements} onSubmitAction={handleFormSubmit} initialValues={userData} />
    </>
  );
}
