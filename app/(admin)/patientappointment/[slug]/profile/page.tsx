import { AppointData, getAppointmentById } from "@/app/api/appointment/route";
import PatientProfile from "@/components/dashboard/patient/patientProfile";
import { Breadcrumb } from "@/components/website/Breadcrumb";
import { useSlug } from "@/hooks/useSlug";

export default async function Page() {
  const slug = useSlug();


  const breadcrumbItems = [
    {
      label: "Profile",
      href: `/patientappointment/${slug}/profile`,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      {/* <PatientProfile /> */}
    </>
  );
}
