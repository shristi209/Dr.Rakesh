import AboutUs from "@/components/website/AboutUs";
import { ServicesSection } from "../../components/website/services/service-section";
import ContactPage from "@/components/website/contact/contact-form";
import Main from "@/components/website/Main";

export default function Home() {
  return (
    <>
      <Main />
      <AboutUs />
      <ServicesSection />
      <ContactPage />
    </>
  );
}
