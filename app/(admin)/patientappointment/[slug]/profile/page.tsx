import PatientProfile from "@/components/dashboard/patient/patientProfile";
import { Breadcrumb } from "@/components/website/Breadcrumb";
import { useSlug } from "@/hooks/useSlug";
import { getDbPool } from "@/admin/utils/db";

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
