"use client";

import { Card } from "@/components/ui/card";
import { Phone, Clock, Mail } from "lucide-react";
import { ContactInformation } from "@/app/api/apicontact";

interface ContactPageProps {
  contactData: ContactInformation | null;
}

export default function ContactMarquee({ contactData }: ContactPageProps) {

const marqueeItems = [
  {
    icon: Phone,
    text: [contactData?.phone || ""],
  },
  {
    icon: Clock,
    text: contactData?.working_hours.split(",") || [],
  },
  {
    icon: Phone,
    text:`Emergency number: ${contactData?.emergency_num || ""}`,
  },
  {
    icon: Mail,
    text:  [contactData?.email || ""],
  },
];

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
