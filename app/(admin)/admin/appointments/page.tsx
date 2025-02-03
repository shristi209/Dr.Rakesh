import { Breadcrumb } from "@/components/website/Breadcrumb";
import AppointmentReceived from "@/components/dashboard/appointmentReceived";
import { getAppointment } from "@/app/api/appointment/route";

// interface PageProps {
//   appointData: AppointData[];
//   error: string | null;
// }

export default async function Page() {
  const appointData = await getAppointment();
  const breadcrumbItems = [
    {
      label: "Appointments",
      href: "/admin/appointments",
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      {appointData && appointData.length > 0 ? (
        <AppointmentReceived appointmentData={appointData} />
      ) : (
        <div>No appointments found</div>
      )}
    </>
  );
}
