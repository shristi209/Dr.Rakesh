"use client";

import DynamicForm from "@/components/ui/dynamicForm";
import { Breadcrumb } from "@/components/website/Breadcrumb";
import { useRouter, usePathname } from "next/navigation";
import data from "../../../../../../public/data/updateUser.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { wrapFormSubmit, convertFormFields } from "@/lib/form-utils";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const userId = pathname?.split("/").pop();
  const breadcrumbItems = [
    { label: "Users", href: "/admin/users" },
    { label: "Update", href: `/admin/users/edit/${userId}` },
  ];

  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<Record<string, string> | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/admin/users/${userId}`);
        if (response.status === 200) {
          console.log(response.data);
          setUserData(response.data);
        } else {
          alert("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
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
    <div>
      <Breadcrumb items={breadcrumbItems} />
      {!loading && (
        <div className="mt-5 mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Update User</h2>
            </div>
            <div className='p-6'>
              <DynamicForm
                elements={convertFormFields(data.elements)}
                onSubmitAction={wrapFormSubmit(handleFormSubmit)}
                formData={userData || {}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
