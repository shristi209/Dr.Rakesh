import { Link, LucideBarChart, LucideHome, LucideLogOut, LucideSettings, LucideUsers } from "lucide-react";

export default function Sidebar() {
    return (
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
    );
}