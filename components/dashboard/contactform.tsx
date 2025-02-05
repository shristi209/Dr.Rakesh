'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicForm from '../ui/dynamicForm';
import form from '../../public/data/contact.json';
import { convertFormFields, wrapFormSubmit } from "@/lib/form-utils";

const ContactForm = () => {
  const [contact, setContact] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setIsLoading(true);
        const contactId = 1;
        const res = await axios.get(`/api/admin/contact/${contactId}`);
        
        // Log the raw response for debugging
        console.log("Raw response:", res);
        console.log("Response data:", res.data);

        // Ensure the data is converted to the correct format
        const contactData: Record<string, string> = {};
        if (res.data) {
          Object.keys(res.data).forEach(key => {
            // Convert all values to strings
            contactData[key] = res.data[key] ? String(res.data[key]) : '';
          });
        }

        // Set the contact state
        setContact(contactData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching contact data:', error);
        setError('Failed to fetch contact data');
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // More comprehensive loading and error states
  if (isLoading) {
    return <div>Loading contact information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!contact) {
    return <div>No contact information available</div>;
  }

  return (
    <div className="mt-5 mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
        </div>
        <div className="p-6">
          <DynamicForm
            // elements={form}
            elements={convertFormFields(form)}
            onSubmitAction={wrapFormSubmit(handleFormSubmit)}
            formData={contact || {}}
          />
        </div>
      </div>
    </div>
  )
};

export default ContactForm;
