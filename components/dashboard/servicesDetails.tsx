"use client";
import { useEffect, useState } from "react";
import DynamicForm from "../ui/dynamicForm";
import axios from "axios";
import formElements from "../../public/data/servicesForm.json";
import { LucideDelete, LucidePlus, LucidePencil, LucideCheck, LucideX } from "lucide-react";
import MultipleForm from "../ui/multipleForm";

interface ServicesDetail {
  DetailID?: number;
  Title: string;
  Description: string;
  Picture: string;
  isDeleted?: boolean;
}

const ServicesDetails = () => {
  const [res, setRes] = useState<any>();
  const [initialServicesData, setInitialServicesData] = useState<any>();
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
            DetailID: detail.DetailID,
            Title: detail.Title,
            Description: detail.Description,
            Picture: detail.Picture || ""
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
    { Title: "", Description: "", Picture: "" }
  ]);

  const handleInputChange = (index: number, field: keyof ServicesDetail, value: string) => {
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
          Title: detail.Title.trim(),
          Description: detail.Description.trim(),
          Picture: detail.Picture.trim() || null
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
            Title: detail.Title.trim(),
            Description: detail.Description.trim(),
            Picture: detail.Picture.trim() || null
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

  const handleSubmit = async (formData: any) => {
    try {
      // console.log("Full form data:", formData);

      // Extract details from form data
      const detailKeys = Object.keys(formData).filter(key => key.includes('details'));
      const newDetails = detailKeys.map(key => {
        try {
          return JSON.parse(formData[key]);
        } catch (error) {
          console.error(`Error parsing details for key ${key}:`, error);
          return [];
        }
      }).flat().filter((detail: any) => detail.Title && detail.Description && detail.Picture);

      console.log("Parsed new details:", newDetails);

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
        setRows([{ Title: "", Description: "", Picture: "" }]);
        
        alert("Data updated successfully!");
      } else {
        alert("No changes detected.");
      }
    } catch (error) {
      console.error("Error submitting data", error);
      alert("Error updating data. Please try again.");
    }
  };

  const additionalFormElements =[
    {
      name: "Title",
      type: "text",
      label: "Title",
      placeholder: "Enter the title"
    },
    {
      name: "Description",
      type: "textarea",
      label: "Description",
      placeholder: "Enter the description"
    },
    {
      name: "Picture",
      type: "file",
      label: "Picture",
      placeholder: "Choose a file"
    }
  ]
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
            elements={formElements}
            onSubmitAction={handleSubmit}
            initialValues={res}
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
                            value={detail.Title}
                            onChange={(e) => handleInputChange(index, "Title", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{detail.Title}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editMode && editingIndex === index ? (
                          <textarea
                            value={detail.Description}
                            onChange={(e) => handleInputChange(index, "Description", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{detail.Description}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editMode && editingIndex === index ? (
                          <input
                            type="text"
                            value={detail.Picture}
                            onChange={(e) => handleInputChange(index, "Picture", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{detail.Picture}</span>
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
                                <LucideCheck className="w-5 h-5" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                              >
                                <LucideX className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditClick(index)}
                                className="text-blue-600 hover:text-blue-900 focus:outline-none"
                              >
                                <LucidePencil className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSavedDetail(index)}
                                className="text-red-600 hover:text-red-900 focus:outline-none"
                              >
                                <LucideDelete className="w-5 h-5" />
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
