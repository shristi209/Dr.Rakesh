"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
export function AppointmentButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
      onClick={() => router.push("/appointment")}
    >
      Book Appointment
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function AppointmentButton2() {
  const router = useRouter();
  return (
    <Button
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6  rounded-full"
      onClick={() => router.push("/appointment")}
    >
      Book Appointment
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function ExploreServices() {
  const router = useRouter();
  return (
    <Button
      className="bg-emerald-600 hover:bg-emerald-700"
      onClick={() => router.push("/services")}
    >
      Explore Services
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}
