"use client"
import React, { useState } from 'react';
import { User } from 'lucide-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProfileButtonProps {
  title?: string;
  link?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ title, link }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
    window.location.reload();
  };

  return (
    <>
      <div className="relative">
        <button
          className="w-10 h-10 border-[1px] border-emerald-900 rounded-full bg-white text-white flex items-center justify-center hover:bg-emerald-50"
          onClick={() => setIsModalOpen(!isModalOpen)}
          aria-label="User Profile Menu"
        >
          <User className="w-6 h-6 text-emerald-900" />
        </button>

        {isModalOpen && (
          <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 right-0">
            <ul className="flex flex-col p-2">
              {title && link && (
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  <Link href={link}>
                    {title}
                  </Link>
                </li>
              )}
              <li
                className="p-2 hover:bg-gray-100 cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileButton;
