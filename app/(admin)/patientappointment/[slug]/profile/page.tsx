import { Breadcrumb } from "@/components/website/Breadcrumb";

export default async function Page() {

  const breadcrumbItems = [
    {
      label: "Profile",
      href: "/patient/profile",
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
    
    </>
  );
}
