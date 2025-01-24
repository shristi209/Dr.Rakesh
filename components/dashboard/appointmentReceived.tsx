// /pages/appointments/received.js
import React from 'react';
import { AppointData } from "@/app/api/appointment/route";

interface AppointDataProps {
  appointmentData: AppointData[];
}
const AppointmentReceived = ({ appointmentData }: AppointDataProps) => {
    if (!appointmentData || appointmentData.length === 0) {
        return <div>No appointment data available.</div>;
      }
    
  console.log("datareceived", appointmentData)
    return (
      <div className="mt-3 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Appointment Details</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointmentData.map((detail) => (
                  <tr key={detail.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{detail.fullname}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{detail.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{detail.phonenumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{detail.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{detail.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{detail.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{detail.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default AppointmentReceived;
