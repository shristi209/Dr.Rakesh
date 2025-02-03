import { Inter } from 'next/font/google';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import {
  Home,
LogOut,
} from 'lucide-react';
import Header from '@/components/dashboard/header/header';
import Sidebar from '@/components/dashboard/sidebar/sidebar';
import { useSlug } from '@/hooks/useSlug';

const inter = Inter({ subsets: ['latin'] });

type UserRole = 'admin' | 'patient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const userRole = cookieStore.get('userRole')?.value as UserRole | undefined;

  if (!token || !userRole) {
    redirect('/');
  }

  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 bg-gray-900 w-64 z-50">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-gray-800">
            <Link href={userRole === 'admin' ? '/admin' : `/patientappointment/${useSlug()}`} className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-white" />
              <span className="font-bold text-xl text-white">Dr. Rakesh</span>
            </Link>
          </div>
          <Sidebar role={userRole}></Sidebar>
          <div className="p-4 border-t border-gray-800">
            <form action="/api/logout" method="POST">
              <button 
                type="submit" 
                className="flex items-center space-x-2 text-white hover:bg-gray-700 w-full p-2 rounded-md transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </form>
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