"use client"
import ProfileButton from "@/components/ui/profile";
import Cookies from 'js-cookie';
import { redirect } from "next/dist/server/api-utils";

export default function Header() {

  return (
    <header className=" bg-white shadow-sm">
      <div className="h-16 px-8 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <ProfileButton title={" view Profile"} link={"/admin/profile"} />
        </div>
      </div>
    </header >
  );
}


