// /pages/appointments/received.js
"use client"
import React, { useState } from 'react';
import { AppointData } from "@/app/api/appointment/route";
import axios from 'axios';

const AppointmentStatus = [
  'Pending',
  'Confirmed',
  'Declined',
  'Rescheduled',
  'Completed',
  'Canceled'
] as const;

type AppointmentStatusType = typeof AppointmentStatus[number];

interface AppointDataProps {
  appointmentData: AppointData[];
}

const AppointmentReceived = ({ appointmentData }: AppointDataProps) => {
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatusType | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newTime, setNewTime] = useState<string>('');
  const [newDate, setNewDate] = useState<string>('');
  const [statusMap, setStatusMap] = useState<{ [key: number]: boolean }>({});

  const handleStatusChange = async (appointmentId: number, status: AppointmentStatusType) => {
    setSelectedAppointment(appointmentId);
    setSelectedStatus(status);

    if (status === 'Rescheduled') {
      setShowRescheduleModal(true);
    } else {
      try {
        const response = await axios.put(`/api/appointment/${appointmentId}`, {
          appointmentId,
          status,
        });
        if (response.status === 200) {
          alert(`Appointment status updated to ${status}.`);
          setStatusMap((prev) => ({ ...prev, [appointmentId]: true }));
        }

      } catch (error) {
        console.error('Failed to update status:', error);
        alert('Failed to update status. Please try again.');
      }
    }
  };

  const handleReschedule = async () => {
    if (selectedAppointment && newTime && newDate) {
      console.log("selectedAppointment", selectedAppointment, newTime, newDate, selectedAppointment && newTime && newDate)
      try {
        const response = await axios.put(`/api/appointment/${selectedAppointment}`, {
          appointmentId: selectedAppointment,
          status: 'Rescheduled',
          newDate,
          newTime,
        });
        if (response.status === 200) {
          alert(`Appointment rescheduled to ${newDate} at ${newTime}. The patient has been notified.`);

          setShowRescheduleModal(false);
        }
      } catch (error) {
        console.error('Failed to reschedule:', error);
        alert('Failed to reschedule the appointment. Please try again.');
      }
    } else {
      alert('Please select both new date and new time.');
    }
  };


  const handleCloseModal = () => {
    setShowRescheduleModal(false);
  };

  if (!appointmentData || appointmentData.length === 0) {
    return <div>No appointment data available.</div>
  }

  return (
    <div className="mt-3 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Appointments</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointmentData.map((detail) => (
                <tr key={detail.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{detail.fullname}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{detail.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{detail.phonenumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{detail.service}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {detail.date instanceof Date
                      ? detail.date.toLocaleDateString()
                      : String(detail.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {detail.time instanceof Date
                      ? detail.time.toLocaleTimeString()
                      : String(detail.time)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {detail.status === null || detail.status === undefined ? (
                      <select
                        className="w-full px-2 py-1 border rounded-md text-sm"
                        value={detail.status || ""}
                        onChange={(e) =>
                          handleStatusChange(detail.id, e.target.value as AppointmentStatusType)
                        }
                      >
                        {AppointmentStatus.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
        ${detail.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : detail.status === 'Declined'
                              ? 'bg-red-100 text-red-800'
                              : detail.status === 'Rescheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : detail.status === 'Completed'
                                  ? 'bg-teal-100 text-teal-800'
                                  : detail.status === 'Canceled'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-gray-200 text-gray-800'
                          }`}
                      >
                        {detail.status}
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Reschedule Appointment</h3>
            <div className="mt-4">
              <label htmlFor="new-date" className="block text-sm font-medium text-gray-700">Select new date:</label>
              <input
                type="date"
                id="new-date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="mt-2 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="new-time" className="block text-sm font-medium text-gray-700">Select new time:</label>
              <input
                type="time"
                id="new-time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="mt-2 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-900 text-white rounded-md"
                onClick={handleReschedule}
              >
                Reschedule
              </button>
              <button
                className="ml-2 px-4 py-2 bg-gray-300 rounded-md"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AppointmentReceived;
