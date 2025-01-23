import { Breadcrumb } from "@/components/website/Breadcrumb";
import ContactPage from "@/components/website/contact/contact-form";
import { getContactData } from "@/app/api/apicontact";

export default async function Page() {
  const contactInformation = await getContactData(1);

  const breadcrumbItems = [
    {
      label: "Contact Us",
      href: "/contact-us", // Ensure href is a non-empty string
    },
  ];

  return (
    <div className="pt-[77px] md:pt-[98px] ">
      <Breadcrumb items={breadcrumbItems} />
      <ContactPage contactData={contactInformation} />
    </div>
  );
}
