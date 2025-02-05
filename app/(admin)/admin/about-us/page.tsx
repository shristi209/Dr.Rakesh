import { Breadcrumb } from "@/components/website/Breadcrumb";
import AboutUsDetails from "@/components/dashboard/aboutUsDetails";

export default function Page() {

  const breadcrumbItems = [
    {
      label: "About Us",
      href: "/admin/about-us",
    },
  ];


  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <AboutUsDetails></AboutUsDetails>
    </>
  );
}
