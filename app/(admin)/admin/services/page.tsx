import {Breadcrumb} from "@/components/website/Breadcrumb";
import ServicesDetails from "@/components/dashboard/servicesDetails";

export default function Page() {
  const breadcrumbItems = [
    {
      label: "Services",
      href: "/admin/services",
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ServicesDetails></ServicesDetails>
    </>
  );
}
