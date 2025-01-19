"use client"
import AdminButton from "@/components/dashboard/button";
import DynamicForm from "@/components/ui/dynamicForm";
import Breadcrumb from "@/components/website/Breadcrumb";
import axios from "axios";
import form from "../../../../public/data/contact.json"
import {
  LucideUsers,
  LucideBarChart,
  LucideDollarSign,
  LucideActivity,
} from 'lucide-react';

interface Contact {
  id: number;
  location: string;
  email: string;
  phone: string;
  emergency_num: string;
  working_hours: string;
}

const breadcrumbItems = [
  {
    label: "Contact",
    href: "/admin/contact",
  },
];

const ContactPage = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/admin/contact/");
    console.log("res", res)
    const contact = res.data;
    console.log("Contact", res.data);
    
    if (!contact) {
      return <div> No contact found </div>;
    }
    const handleFormSubmit = async (data: Record<string, string>) => {
      try {
        const response = await axios.post("http://localhost:3000/api/admin/contact", data);
        console.log("Form submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <DynamicForm elements={form} onSubmitAction={handleFormSubmit} ></DynamicForm>

      </>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return <div>Error fetching users</div>;
  }
};

export default ContactPage;
