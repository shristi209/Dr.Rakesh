'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicForm from '../ui/dynamicForm';
import form from '../../public/data/contact.json';
import { wrapFormSubmit } from "@/lib/form-utils";

const ContactForm = () => {
  const [contact, setContact] = useState<Record<string, string> | null>(null);

  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      const contactId = 1;
      const response = await axios.put(`/api/admin/contact/${contactId}`, data);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const contactId = 1;
        const res = await axios.get(`/api/admin/contact/${contactId}`);
        setContact(res.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
        </div>
        <div className="p-6">
          <DynamicForm
            elements={form}
            onSubmitAction={wrapFormSubmit(handleFormSubmit)}
            initialValues={contact || {}}
          />
        </div>
      </div>
    </div>

  )
};

export default ContactForm;
