import { AppointData, getAppointmentById } from '@/app/api/appointment/route';
import { jwtVerify } from 'jose';
import { Timer, Users, DollarSign, Activity } from 'lucide-react'
import { cookies } from 'next/headers';

// interface PageProps {
//   appointData: AppointData[];
//   error: string | null;
// }

export default async function PatientPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let appointData: AppointData[] = [];
  let latestAppointment: AppointData | null = null;

  if (token) {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secretKey) as { payload: { email: string } };

    appointData = await getAppointmentById(payload.email);
    
    // Get the most recent appointment
    if (appointData.length > 0) {
      latestAppointment = appointData[0];
    }
  }

  const stats = [
    {
      name: 'Total Appointments',
      value: appointData.length.toString(),
      icon: Activity,
    },
    {
      name: 'Appointment Date',
      value: latestAppointment?.date ? String(latestAppointment.date) : 'No upcoming appointments',
      icon: Timer,
    },
    {
      name: 'Appointment Time',
      value: latestAppointment?.time ? String(latestAppointment.time) : 'No upcoming appointments',
      icon: Timer,
    }
  ];

  const activities = [
    {
      icon: Users,
      title: 'New user registered',
      description: 'John Doe created a new account',
      time: '5 min ago',
    },
    {
      icon: DollarSign,
      title: 'New subscription',
      description: 'Pro plan subscription purchased',
      time: '1 hour ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="mr-4">
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.name}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y">
          {activities.map((activity, index) => (
            <div key={index} className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <activity.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <span className="text-sm text-gray-600">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}