import AboutUs from "@/components/website/AboutUs";
import { ServicesSection } from "../../components/website/services/service-section";
import ContactPage from "@/components/website/contact/contact-form";
import Main from "@/components/website/Main";
import { getAboutData } from "@/app/api/apiaboutus";
import { getServices } from "@/app/api/apiservice";
import { getContactData } from "@/app/api/apicontact";
import { siteSetting } from "@/app/api/apihome";

export default async function Home() {
  const aboutData = await getAboutData();
  const serviceData = await getServices();
  const contactInformation = await getContactData(1);
  const setting = await siteSetting();

  return (
    <>
      <Main data={setting} />
      <AboutUs data={aboutData} />
      <ServicesSection serviceData={serviceData} />
      <ContactPage contactData={contactInformation} />
    </>
  );
}
