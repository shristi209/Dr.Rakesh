import {
  LucideUsers,
  LucideDollarSign,
  LucideHeartPulse,
} from 'lucide-react';


export default async function PatientPage() {

  const stats = [
    {
      name: 'Total Patients',
      value: '100',
      icon: LucideUsers,
    },
    {
      name: 'Total Services',
      value: '50',
      icon: LucideHeartPulse,
    }
  ];

  const activities = [
    {
      icon: LucideUsers,
      title: 'New user registered',
      description: 'John Doe created a new account',
      time: '5 min ago',
    },
    {
      icon: LucideDollarSign,
      title: 'New subscription',
      description: 'Pro plan subscription purchased',
      time: '1 hour ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
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