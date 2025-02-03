import { Breadcrumb } from "@/components/website/Breadcrumb";
import AppointmentsReceivedByPatient from "@/components/dashboard/appointmentsReceivedByPatient"; // Capitalized import
import { AppointData, getAppointmentById } from "@/app/api/appointment/route";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";


export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let appointData: AppointData[] = [];

  if (token) {
    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      const { payload } = await jwtVerify(token, secretKey) as { payload: { email: string } };

      appointData = await getAppointmentById(payload.email);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }

  const breadcrumbItems = [
    {
      label: "Appointments",
      href: `/patient`,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <AppointmentsReceivedByPatient appointmentData={appointData} />
    </>
  );
}
