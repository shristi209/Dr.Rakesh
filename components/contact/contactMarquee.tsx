"use client";

import { Card } from "@/components/ui/card";
import { Phone, Clock, Mail } from "lucide-react";

const marqueeItems = [
  {
    icon: Phone,
    text: "Book Appointment: +977-9809627872",
  },
  {
    icon: Clock,
    text: "Working Hours: Mon to Fri : 10:00 To 6:00",
  },
  {
    icon: Phone,
    text: "Emergency No. : +977-9809627872",
  },
  {
    icon: Mail,
    text: "For any additional queries: drrakeshyadav2073@gmail.com",
  },
];

export function ContactMarquee() {
  return (
    <div className="w-full bg-primary/5 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <Card key={index} className="inline-flex items-center mx-4 px-6 py-3">
            <item.icon className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">{item.text}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
