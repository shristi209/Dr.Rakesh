import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Dr. Smith - Orthopedic Surgeon",
  description: "Get in touch with Dr. Smith's orthopedic clinic. Schedule appointments, ask questions, or request consultations.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-600">
            We're here to help and answer any questions you might have
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}