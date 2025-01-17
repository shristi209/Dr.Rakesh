import {
    LucideUsers,
    LucideBarChart,
    LucideDollarSign,
    LucideActivity,
  } from 'lucide-react';
  
  export default function AdminDashboard() {
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
              <div className="mt-4 flex items-center text-sm">
                <span className={stat.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                  {stat.trend > 0 ? '+' : ''}{stat.trend}%
                </span>
                <span className="text-gray-600 ml-2">from last month</span>
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
  
  const stats = [
    {
      name: 'Total Users',
      value: '2,543',
      trend: 12.5,
      icon: LucideUsers,
    },
    {
      name: 'Total Revenue',
      value: '$45,234',
      trend: 8.2,
      icon: LucideDollarSign,
    },
    {
      name: 'Active Sessions',
      value: '1,234',
      trend: -3.1,
      icon: LucideActivity,
    },
    {
      name: 'Conversion Rate',
      value: '3.24%',
      trend: 2.3,
      icon: LucideBarChart,
    },
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
    {
      icon: LucideActivity,
      title: 'System update',
      description: 'Successfully deployed version 2.1.0',
      time: '2 hours ago',
    },
  ];