'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicForm from '../ui/dynamicForm';
import form from '../../public/data/contact.json';

const ContactForm = () => {
  const [contact, setContact] = useState<Record<string, string> | null>(null);

  const handleFormSubmit = async (data: Record<string, string | File>) => {
    try {
      const contactId = 1;
      
      // Convert data to a format suitable for axios
      const processedData: Record<string, string> = {};
      Object.entries(data).forEach(([key, value]) => {
        // If it's a File, we'll need to handle it differently
        if (value instanceof File) {
          processedData[key] = value.name; // Or handle file upload separately
        } else {
          processedData[key] = value;
        }
      });

      const response = await axios.put(`/api/admin/contact/${contactId}`, processedData);
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

  return <DynamicForm elements={form} onSubmitAction={handleFormSubmit} initialValues={contact} />;
};

export default ContactForm;
