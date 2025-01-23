import SideBar from "@/components/ui/sidebar";
import { Link, LucideBarChart,LucideNotebook, LucideSettings, LucideHeartPulse, LucideHandshake, LucideUsers, LucideContact } from "lucide-react";

export default function Sidebar() {
    return (
        <nav className="flex-1 p-4">
            <ul className="space-y-1">
                <SideBar title={"Dashboard"} link={"/admin"} icon={LucideBarChart}></SideBar>
                <SideBar title={"Users"} link={"/admin/users"} icon={LucideUsers}></SideBar>
                <SideBar title={"Contact"} link={"/admin/contact"} icon={LucideContact}></SideBar>
                <SideBar title={"Services"} link={"/admin/services"} icon={LucideHeartPulse}></SideBar>
                <SideBar title={"AboutUs"} link={"/admin/about-us"} icon={LucideHandshake}></SideBar>
                <SideBar title={"Appointments"} link={"/admin/appointments"} icon={LucideNotebook}></SideBar>
                <SideBar title={"Settings"} link={"/admin/settings"} icon={LucideSettings}></SideBar>
            </ul>
        </nav>
    );
}