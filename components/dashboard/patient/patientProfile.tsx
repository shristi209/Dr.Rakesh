// components/dashboard/patient/patientProfile.tsx
"use client";
import React from 'react';
import { LucideUser, LucideMail, LucidePhone, LucideCake, LucideMapPin } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { ProfileInfo } from '@/app/api/patient/route';

// interface PatientProfileProps {
//   profile?: {
//     id?: string;
//     fullname?: string;
//     email?: string;
//     role?: string;
//     phonenumber?: string;
//     age?: number;
//     address?: string;
//   };
// }

const PatientProfile: React.FC = async () => {

  const user = useAuth();
  const id = user.id;
  try {
    const response = await ProfileInfo(id);
  } catch (error) {
    console.log(error);
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LucideUser className="w-12 h-12 text-blue-500" />
        </div>
        {/* <h2 className="text-2xl font-bold text-gray-800">{profile.fullname || 'N/A'}</h2>
        <p className="text-sm text-gray-500">{profile.role || 'N/A'}</p> */}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* <ProfileInfoItem
          icon={<LucideMail className="w-5 h-5 text-blue-500" />}
          label="Email"
          value={profile.email || 'N/A'}
        />
        {profile.phonenumber && (
          <ProfileInfoItem
            icon={<LucidePhone className="w-5 h-5 text-blue-500" />}
            label="Phone Number"
            value={profile.phonenumber}
          />
        )}
        {profile.age && (
          <ProfileInfoItem
            icon={<LucideCake className="w-5 h-5 text-blue-500" />}
            label="Age"
            value={`${profile.age} years`}
          />
        )}
        {profile.address && (
          <ProfileInfoItem
            icon={<LucideMapPin className="w-5 h-5 text-blue-500" />}
            label="Address"
            value={profile.address}
            colSpan={2}
          />
        )} */}
      </div>
    </div>
  );
};

const ProfileInfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string; colSpan?: number }> = ({ icon, label, value, colSpan = 1 }) => (
  <div className={`${colSpan === 2 ? 'md:col-span-2' : ''} bg-gray-50 p-4 rounded-lg flex items-center space-x-4`}>
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default PatientProfile;
