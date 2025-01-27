"use client";
import { useEffect, useState } from "react";
import DynamicForm from "../ui/dynamicForm";
import axios from "axios";
import formElements from "../../public/data/servicesForm.json";
import { LucideDelete, LucidePlus, LucidePencil, LucideCheck, LucideX } from "lucide-react";

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

  const handleAddClick = () => {
    setRows([...rows, { Title: "", Description: "", Picture: "" }]);
  };

  const handleDeleteClick = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
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
      const hasChanges =
        formData.Name !== initialServicesData?.Name ||
        formData.Title !== initialServicesData?.Title ||
        formData.Description !== initialServicesData?.Description;
console.log("rows",rows)

      if (hasChanges || rows.some((row) => row.Title && row.Description && row.Picture)) {
        const servicesId = 1;
        const newDetails = rows.filter(row => row.Title && row.Description && row.Picture);
// console.log("newDetails",newDetails)
// console.log("savedDetails",savedDetails)
        const response = await axios.put(`/api/admin/services/${servicesId}`, {
          servicesData: formData,
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Services Information</h2>
        </div>
        <div className="p-6">
          <DynamicForm
            elements={formElements}
            onSubmitAction={handleSubmit}
            initialValues={res}
          />
        </div>
      </div>

      {/* Add New Details Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Add New Details</h2>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center justify-center p-1.5 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LucidePlus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Picture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={row.Title}
                        placeholder="Add title"
                        onChange={(e) => handleInputChange(index, "Title", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <textarea
                        value={row.Description}
                        placeholder="Add description"
                        onChange={(e) => handleInputChange(index, "Description", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={row.Picture}
                        placeholder="Add picture URL"
                        onChange={(e) => handleInputChange(index, "Picture", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteClick(index)}
                        className="text-red-600 hover:text-red-900 focus:outline-none"
                      >
                        <LucideDelete className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
