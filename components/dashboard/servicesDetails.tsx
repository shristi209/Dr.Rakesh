"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import formElements from "../../public/data/servicesForm.json";

import { Delete, Pencil, Check, X } from "lucide-react";
import MultipleForm, { DynamicFormElement } from "../ui/multipleForm";
import { DetailFormElement } from "../ui/multipleForm";

const typedFormElements = formElements as DynamicFormElement[];

interface ServicesDetail {
  id?: number;
  ServiceTitle: string;
  ServiceDescription: string;
  ServicePicture: string;
}

interface ServicesData {
  id: number;
  Name: string;
  Title: string;
  Description: string;
  servicesDetails: ServicesDetail[];
}

const ServicesDetails = () => {
  const [res, setRes] = useState<ServicesData | null>(null);
  const [initialServicesData, setInitialServicesData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedDetails, setSavedDetails] = useState<ServicesDetail[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const servicesId = 1;
        const response = await axios.get(`/api/admin/services/${servicesId}`);
        console.log("Fetched Data:", response.data);
        
        setRes(response.data);
        setInitialServicesData(response.data);
        
        // Initialize saved details with existing services details
        if (response.data.servicesDetails && Array.isArray(response.data.servicesDetails)) {
          setSavedDetails(response.data.servicesDetails.map((detail: ServicesDetail) => ({
            id: detail.id,
            ServiceTitle: detail.ServiceTitle,
            ServiceDescription: detail.ServiceDescription,
            ServicePicture: detail.ServicePicture || ""
          })));
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Services data", error);
        setError("Failed to load Services data");
        setLoading(false);
      }
    };
    fetchServicesData();
  }, []);

  const [rows, setRows] = useState<ServicesDetail[]>([
    { ServiceTitle: "", ServiceDescription: "", ServicePicture: "" }
  ]);

  const handleInputChange = (index: number, field: keyof ServicesDetail, value: string | number) => {
    if (editMode && editingIndex !== null) {
      const updatedDetails = [...savedDetails];
      updatedDetails[editingIndex] = { 
        ...updatedDetails[editingIndex], 
        [field]: value 
      };
      setSavedDetails(updatedDetails);
    } else {
      const updatedRows = [...rows];
      updatedRows[index] = { ...updatedRows[index], [field]: value };
      setRows(updatedRows);
    }
  };


  const handleEditClick = (index: number) => {
    setEditMode(true);
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingIndex(null);
  };

  const handleSaveEdit = async () => {
    try {
      const servicesId = 1;
      const response = await axios.put(`/api/admin/services/${servicesId}`, {
        servicesData: res,
        servicesDetailsData: savedDetails.map(detail => ({
          ...detail,
          ServiceTitle: detail.ServiceTitle.trim(),
          ServiceDescription: detail.ServiceDescription.trim(),
          ServicePicture: detail.ServicePicture.trim() || null
        }))
      });
      
      console.log("Edit saved:", response.data);
      setEditMode(false);
      setEditingIndex(null);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving edits", error);
      alert("Error saving changes. Please try again.");
    }
  };

  const handleDeleteSavedDetail = async (index: number) => {
    if (window.confirm('Are you sure you want to delete this detail?')) {
      try {
        const servicesId = 1;
        const updatedDetails = savedDetails.filter((_, i) => i !== index);
        
        const response = await axios.put(`/api/admin/services/${servicesId}`, {
          servicesData: res,
          servicesDetailsData: updatedDetails.map(detail => ({
            ...detail,
            ServiceTitle: detail.ServiceTitle.trim(),
            ServiceDescription: detail.ServiceDescription.trim(),
            ServicePicture: detail.ServicePicture.trim() || null
          }))
        });
        
        console.log("Delete response:", response.data);
        setSavedDetails(updatedDetails);
        alert("Detail deleted successfully!");
      } catch (error) {
        console.error("Error deleting detail", error);
        alert("Error deleting detail. Please try again.");
      }
    }
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    try {

      const detailKeys = Object.keys(formData).filter(key => key.includes('details'));
      console.log("Detail keys:", detailKeys);

      const newDetails: ServicesDetail[] = detailKeys.flatMap(key => {
        try {
          const parsedDetails: ServicesDetail[] = JSON.parse(formData[key]);
          
          return parsedDetails.map(detail => ({
            ServiceTitle: detail.ServiceTitle || '',
            ServiceDescription: detail.ServiceDescription || '',
            ServicePicture: detail.ServicePicture || ''
          })).filter((detail: ServicesDetail) => 
            detail.ServiceTitle.trim() !== '' && detail.ServiceDescription.trim() !== ''
          );
        } catch (error) {
          console.error(`Error parsing details for key ${key}:`, error);
          return [];
        }
      });

      console.log("Filtered new details:", newDetails);

      const hasChanges =
        formData.Name !== initialServicesData?.Name ||
        formData.Title !== initialServicesData?.Title ||
        formData.Description !== initialServicesData?.Description ||
        newDetails.length > 0;

      if (hasChanges) {
        const servicesId = 1;
        const response = await axios.put(`/api/admin/services/${servicesId}`, {
          servicesData: {
            Name: formData.Name,
            Title: formData.Title,
            Description: formData.Description
          },
          servicesDetailsData: [...savedDetails, ...newDetails]
        });
        
        console.log("Submit response:", response.data);
        
        setSavedDetails(prev => [...prev, ...newDetails]);
        setRows([{ ServiceTitle: "", ServiceDescription: "", ServicePicture: "" }]);
        
        alert("Data updated successfully!");
      } else {
        console.log("No changes detected.");
      }
    } catch (error) {
      console.error("Error submitting data", error);
      alert("Error updating data. Please try again.");
    }
  };

  const additionalFormElements = [
    {
      name: "ServiceTitle",
      type: "text",
      label: "Title",
      placeholder: "Enter the title",
      required: true
    },
    {
      name: "ServiceDescription",
      type: "textarea",
      label: "Description",
      placeholder: "Enter the description",
      required: true
    },
    {
      name: "ServicePicture",
      type: "file",
      label: "Picture",
      placeholder: "Choose a file",
      required: true
    }
  ] as DetailFormElement[];

  const initialFormValues: Record<string, string> = res ? {
    Name: res.Name || '',
    Title: res.Title || '',
    Description: res.Description || ''
  } : {};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="mt-5 max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Services Information</h2>
        </div>
        <div>
          <MultipleForm
            elements={typedFormElements}
            onSubmitAction={handleSubmit}
            initialValues={initialFormValues}
            additionalForms={[
              {
                title: "Additional Details",
                elements: additionalFormElements
              }
            ]}
          />
        </div>
      </div>

      {/* Saved Details Section */}
      {savedDetails.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Saved Details</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Picture</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {savedDetails.map((detail, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {editMode && editingIndex === index ? (
                          <input
                            type="text"
                            value={detail.ServiceTitle}
                            onChange={(e) => handleInputChange(index, "ServiceTitle", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{detail.ServiceTitle}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editMode && editingIndex === index ? (
                          <textarea
                            value={detail.ServiceDescription}
                            onChange={(e) => handleInputChange(index, "ServiceDescription", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{detail.ServiceDescription}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editMode && editingIndex === index ? (
                          <input
                            type="text"
                            value={detail.ServicePicture}
                            onChange={(e) => handleInputChange(index, "ServicePicture", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{detail.ServicePicture}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {editMode && editingIndex === index ? (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                className="text-green-600 hover:text-green-900 focus:outline-none"
                              >
                                <Check className="w-5 h-5" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditClick(index)}
                                className="text-blue-600 hover:text-blue-900 focus:outline-none"
                              >
                                <Pencil className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSavedDetail(index)}
                                className="text-red-600 hover:text-red-900 focus:outline-none"
                              >
                                <Delete className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesDetails;
