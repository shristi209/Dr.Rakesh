// components/dashboard/patient/patientProfile.tsx

import React from 'react';
import { LucideUser, LucideMail, LucidePhone, LucideCake, LucideMapPin, LucideDroplet } from 'lucide-react';

interface PatientProfileProps {
  profile: {
    id: string;
    fullname: string;
    email: string;
    phonenumber?: string;
    age?: number;
    bloodgroup?: string;
    address?: string;
  };
}

const PatientProfile: React.FC<PatientProfileProps> = ({ profile }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LucideUser className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{profile.fullname}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ProfileInfoItem 
          icon={<LucideMail className="w-5 h-5 text-blue-500" />} 
          label="Email" 
          value={profile.email} 
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
        {profile.bloodgroup && (
          <ProfileInfoItem 
            icon={<LucideDroplet className="w-5 h-5 text-blue-500" />} 
            label="Blood Group" 
            value={profile.bloodgroup} 
          />
        )}
        {profile.address && (
          <ProfileInfoItem 
            icon={<LucideMapPin className="w-5 h-5 text-blue-500" />} 
            label="Address" 
            value={profile.address} 
            colSpan={2} 
          />
        )}
      </div>
    </div>
  );
};

const ProfileInfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string; colSpan?: number }> = ({ icon, label, value, colSpan = 1 }) => (
  <div className={`col-span-${colSpan} bg-gray-50 p-4 rounded-lg flex items-center space-x-4`}>
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default PatientProfile;
