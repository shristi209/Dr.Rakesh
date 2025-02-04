import { Breadcrumb } from "@/components/website/Breadcrumb";
import ContactPage from "@/components/website/contact/contact-form";
import { getContactData } from "@/app/api/apicontact";


export const metadata ={
  title: "Dr. Rakesh Yadav - Contact",
}

export default async function Page() {
  const contactInformation = await getContactData();

  const breadcrumbItems = [
    {
      label: "Contact Us",
      href: "/contact-us", 
    },
  ];

  return (
    <div className="pt-[77px] md:pt-[98px] ">
      <Breadcrumb items={breadcrumbItems} />
      <ContactPage contactData={contactInformation} />
    </div>
  );
}
