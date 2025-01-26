// components/ui/Sidebar.tsx
"use client";
import { 
  LucideBarChart, 
  LucideNotebook, 
  LucideSettings, 
  LucideHeartPulse, 
  LucideHandshake, 
  LucideUsers, 
  LucideContact 
} from "lucide-react";
import SideBar from "@/components/ui/sidebar";
import { useClientSlug } from '@/hooks/useClientSlug';

interface SidebarProps {
  role: "admin" | "patient";
}

const Sidebar = ({ role }: SidebarProps) => {
  const slug = useClientSlug();

   return (
    <nav className="flex-1 p-4">
      <ul className="space-y-1">
        {role === "admin" && (
          <>
            <SideBar title={"Dashboard"} link={"/admin"} icon={LucideBarChart} />
            <SideBar title={"Users"} link={"/admin/users"} icon={LucideUsers} />
            <SideBar title={"Contact"} link={"/admin/contact"} icon={LucideContact} />
            <SideBar title={"Services"} link={"/admin/services"} icon={LucideHeartPulse} />
            <SideBar title={"About Us"} link={"/admin/about-us"} icon={LucideHandshake} />
            <SideBar title={"Appointments"} link={"/admin/appointments"} icon={LucideNotebook} />
            <SideBar title={"Settings"} link={"/admin/settings"} icon={LucideSettings} />
          </>
        )}

        {role === "patient" && slug && (
          <>
            <SideBar title={"Appointments"} link={`/patientappointment/${slug}/appointments`} icon={LucideNotebook} />
            <SideBar title={"Profile"} link={`/patientappointment/${slug}/profile`} icon={LucideUsers} />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
