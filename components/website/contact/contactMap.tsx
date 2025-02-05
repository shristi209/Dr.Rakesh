"use client";

import { Card } from "@/components/ui/card";

export function ContactMap() {
  return (
    <Card className="w-full h-[400px] overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.8246479390154!2d86.28459937544154!3d26.97245177661173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eea9c3a7e3d39f%3A0x46470eab117f2d0d!2sprayag%20adhikari%20health%20care!5e0!3m2!1sen!2snp!4v1732091693734!5m2!1sen!2snp"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Card>
  );
}
