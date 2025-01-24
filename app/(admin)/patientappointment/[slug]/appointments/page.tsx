import { Breadcrumb } from "@/components/website/Breadcrumb";
import AppointmentReceived from "@/components/dashboard/appointmentReceived";
import { AppointData, getAppointmentById } from "@/app/api/appointment/route";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { useSlug } from "@/hooks/useSlug";

interface PageProps {
  appointData: AppointData[];
  error: string | null;
}

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let appointData: AppointData[] = [];
  let error: string | null = null;

  if (token) {
    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      const { payload } = await jwtVerify(token, secretKey) as { payload: { email: string } };

      appointData = await getAppointmentById(payload.email);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      error = 'Failed to fetch appointments';
    }
  }
  const slug = useSlug();
  const breadcrumbItems = [
    {
      label: "Appointments",
      href: `/patientappointment/${slug}/appointments`,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <AppointmentReceived
        appointmentData={appointData}
      />
    </>
  );
}
