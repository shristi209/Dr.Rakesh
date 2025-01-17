import { Inter } from 'next/font/google';
import Link from 'next/link';
import {
  LucideHome,
  LucideUsers,
  LucideSettings,
  LucideBarChart,
  LucideLogOut,
} from 'lucide-react';
import Header from '@/components/dashboard/header/header';
import Cookies from 'js-cookie';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 bg-gray-900 w-64 z-50">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-gray-800">
            <Link href="/admin" className="flex items-center space-x-2">
              <LucideHome className="w-6 h-6 text-white" />
              <span className="font-bold text-xl text-white">Admin</span>
            </Link>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 rounded-md px-3 py-2"
                >
                  <LucideBarChart className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 rounded-md px-3 py-2"
                >
                  <LucideUsers className="w-5 h-5" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 rounded-md px-3 py-2"
                >
                  <LucideSettings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <Link
              href="/"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 rounded-md px-3 py-2"
              // onClick={() =>{
              //   Cookies.remove('token');
              // }}
            >
              <LucideLogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <Header/>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}