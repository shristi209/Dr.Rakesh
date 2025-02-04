import { Breadcrumb } from "@/components/website/Breadcrumb";
import Appointments from "@/components/appointment";

export const metadata ={
  title: "Dr. Rakesh Yadav - Appointment",
}

export default async function AppointmentPage() {

  const breadcrumbItems = [
    {
      label: "Book an Appointment",
      href: "/appointment",
    },
  ];

  return (
    <div className="pt-[77px] md:pt-[98px]">
      <Breadcrumb items={breadcrumbItems} />
      <Appointments></Appointments>
    </div>
  );
}
