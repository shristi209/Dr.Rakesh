import ContactForm from "@/components/dashboard/contactform";
import {Breadcrumb} from "@/components/website/Breadcrumb";

const breadcrumbItems = [
  {
    label: "Edit Website Contact",
    href: "/admin/contact",
  },
];

export default function Page() {
  try {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <ContactForm></ContactForm>
      </>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return <div>Error fetching users</div>;
  }
};
