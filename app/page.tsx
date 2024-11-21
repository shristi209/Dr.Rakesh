import Main from "../components/Main";
import AboutUs from "../components/AboutUs";
import { ServicesSection } from "../components/services/service-section";
import ContactPage from "@/components/contact/contact-form";

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
