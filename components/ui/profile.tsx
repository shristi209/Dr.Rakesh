import React, {useState} from 'react';
import { User } from 'lucide-react';
import Cookies from 'js-cookie';

const ProfileButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] =useState(false);
  const handleLogout = () => {
    Cookies.remove('token');
    window.location.reload();
  }

  return (
    <>
      <button
        className="w-10 h-10 border-[1px] border-emerald-900 rounded-full bg-white text-white flex items-center justify-center hover:bg-emerald-50"
      onClick={()=>setIsModalOpen(!isModalOpen)}
      >
        <User className="w-6 h-6 text-emerald-900" />
      </button>

      {isModalOpen &&(
      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
        <ul className="flex flex-col p-2">
          <li className="p-2 hover:bg-gray-100 cursor-pointer">
            <a href="/profile">View Profile</a>
          </li>
          <li className="p-2 hover:bg-gray-100 cursor-pointer">
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li
            className="p-2 hover:bg-gray-100 cursor-pointer text-red-600"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
      )}

    </>
  );
};

export default ProfileButton;