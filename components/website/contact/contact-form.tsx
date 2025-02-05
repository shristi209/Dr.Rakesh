"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { ContactMap } from "./contactMap";
import axios from "axios";
import { ContactInformation } from "@/app/api/apicontact";
import ContactMarquee from "./contactMarquee";

interface ContactInfoItem {
  icon: React.ElementType;
  title: string;
  details: string[];
}

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactPageProps {
  contactData: ContactInformation | null;
}

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage({ contactData }: ContactPageProps) {

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactInfoItems: ContactInfoItem[] = [
    {
      icon: MapPin,
      title: "Our Location",
      details: [contactData?.location || ""],
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [contactData?.email || ""],
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: [contactData?.phone || ""],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: contactData?.working_hours.split(",") || [],
    },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("values", values);
      await axios.post("/api/contact", values);
      alert("Message sent successfully!");
      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      alert("Failed to send message. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfoItems.map((info, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Contact Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070"
                alt="Contact support"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <Card className="p-8 bg-white shadow-lg rounded-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>
              <p className="text-muted-foreground mb-3">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>

        <ContactMarquee contactData={contactData} />
        {/* Map Section */}
        <ContactMap />
      </div>
    </div>
  );
}
