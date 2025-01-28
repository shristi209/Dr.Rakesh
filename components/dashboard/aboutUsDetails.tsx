"use client";
import { useEffect, useState } from "react";
import DynamicForm from "../ui/dynamicForm";
import axios from "axios";
import formElements from "../../public/data/aboutusForm.json";
import { LucideDelete, LucidePlus, LucidePencil, LucideCheck, LucideX } from "lucide-react";
import MultipleForm from "../ui/multipleForm";

interface Icon {
  IconID: number;
  IconName: string;
}

interface AboutUsDetail {
  DetailID?: number;
  Title: string;
  IconID: number;
  IconName?: string;
  isDeleted?: boolean;
}

const AboutUsDetails = () => {
  const [res, setRes] = useState<any>();
  const [initialAboutUsData, setInitialAboutUsData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedDetails, setSavedDetails] = useState<AboutUsDetail[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [icons, setIcons] = useState<Icon[]>([]);
  const [rows, setRows] = useState<AboutUsDetail[]>([
    { Title: "", IconID: 0 }
  ]);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const aboutUsId = 1;
        const response = await axios.get(`/api/admin/about-us/${aboutUsId}`);
        console.log("Fetched Data:", response.data);

        setRes(response.data);
        setInitialAboutUsData(response.data);

        if (response.data.aboutUsDetails && Array.isArray(response.data.aboutUsDetails)) {
          setSavedDetails(response.data.aboutUsDetails.map((detail: any) => ({
            DetailID: detail.DetailID,
            Title: detail.title,
            IconID: detail.icon_id,
            IconName: detail.IconName
          })));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching About Us data", error);
        setError("Failed to load About Us data");
        setLoading(false);
      }
    };
    fetchAboutUsData();
  }, []);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get("/api/admin/icons");
        console.log("Fetched Icons:", response.data);

        // Ensure icons are valid
        const validIcons = response.data.filter((icon: Icon) =>
          icon.IconID && icon.IconName
        );

        setIcons(validIcons);

        if (validIcons.length === 0) {
          console.warn("No valid icons found");
        }
      } catch (error) {
        console.error("Error fetching Icons", error);
        setError("Failed to load icons");
      }
    };
    fetchIcons();
  }, []);

  const handleInputChange = (index: number, field: keyof AboutUsDetail, value: string | number) => {
    if (editMode && editingIndex !== null) {
      const updatedDetails = [...savedDetails];
      updatedDetails[editingIndex] = {
        ...updatedDetails[editingIndex],
        [field]: field === 'IconID' ? Number(value) : value
      };
      setSavedDetails(updatedDetails);
    } else {
      const updatedRows = [...rows];
      updatedRows[index] = {
        ...updatedRows[index],
        [field]: field === 'IconID' ? Number(value) : value
      };
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
      const aboutUsId = 1;
      const response = await axios.put(`/api/admin/about-us/${aboutUsId}`, {
        aboutUsData: res,
        aboutUsDetailsData: savedDetails
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
        const aboutUsId = 1;
        const updatedDetails = savedDetails.filter((_, i) => i !== index);

        const response = await axios.put(`/api/admin/about-us/${aboutUsId}`, {
          aboutUsData: res,
          aboutUsDetailsData: updatedDetails.map(detail => ({
            ...detail,
            Title: detail.Title.trim()
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
    console.log("Full form data:", formData);
    console.log("Initial About Us Data:", initialAboutUsData);
    console.log("Available Icons:", icons);
  
    try {
      // Find keys that include 'details'
      const detailKeys = Object.keys(formData).filter(key => key.includes('details'));
  
      const newDetails = detailKeys.flatMap(key => {
        try {
          const parsedDetails = JSON.parse(formData[key]);
          console.log(`Parsed details for key ${key}:`, parsedDetails);
  
          return parsedDetails.map((detail: any) => {
            // Find the corresponding icon
            const foundIcon = icons.find(icon => 
              icon.IconName === detail.icon_id || 
              icon.IconID === detail.icon_id
            );
  
            return {
              Title: detail.title || detail.Title,
              IconID: foundIcon ? foundIcon.IconID : 0,
              IconName: foundIcon ? foundIcon.IconName : ''
            };
          });
        } catch (error) {
          console.error(`Error parsing details for key ${key}:`, error);
          return [];
        }
      }).filter((detail: any) => detail.Title && detail.IconID);
      
      console.log("Parsed new details:", newDetails);
  
      // Comprehensive change detection
      const hasMainDataChanges = 
        formData.name !== initialAboutUsData?.name ||
        formData.title !== initialAboutUsData?.title ||
        formData.description !== initialAboutUsData?.description ||
        formData.picture !== initialAboutUsData?.picture;
  
      console.log("Main data changes:", {
        name: formData.name !== initialAboutUsData?.name,
        title: formData.title !== initialAboutUsData?.title,
        description: formData.description !== initialAboutUsData?.description,
        picture: formData.picture !== initialAboutUsData?.picture
      });
  
      const hasDetailsChanges = 
        JSON.stringify(newDetails) !== JSON.stringify(savedDetails);
  
      console.log("New details length:", newDetails.length);
      console.log("Saved details:", savedDetails);
      console.log("Details changed:", hasDetailsChanges);
  
      const hasChanges = hasMainDataChanges || hasDetailsChanges;
  
      console.log("Overall changes detected:", hasChanges);
  
      if (hasChanges) {
        const aboutUsId = 1;
        
        const response = await axios.put(`/api/admin/about-us/${aboutUsId}`, {
          aboutUsData: {
            name: formData.name,
            title: formData.title,
            description: formData.description,
            picture: formData.picture
          },
          aboutUsDetailsData: [...savedDetails, ...newDetails]
        });
        
        console.log("Submit response:", response.data);
        
        // Update saved details and initial data
        setSavedDetails(prev => [...prev, ...newDetails]);
        setInitialAboutUsData(prev => ({
          ...prev,
          aboutUsDetails: [...(prev.aboutUsDetails || []), ...newDetails]
        }));
        
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
  const additionalFormElements = [
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter the title"
  },
  {
    name: "icon_id",
    type: "select",
    label: "Icon",
    placeholder: "Select the Icon",
    options: icons.map(icon => ({
      id: icon.IconID,     // Database IconID
      name: icon.IconName  // Display name
    }))
  }
];
  return (
    <div className="mt-5 max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">About Us Information</h2>
        </div>
        <div>
          <MultipleForm
            elements={formElements}
            onSubmitAction={handleSubmit}
            initialValues={res}
            additionalForms={[
              {
                title: "Additional Form",
                elements: additionalFormElements,
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
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
                          <select
                            value={detail.IconID}
                            onChange={(e) => handleInputChange(index, "IconID", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                          >
                            <option value={0}>Select an icon</option>
                            {icons.map((icon) => (
                              <option key={icon.IconID} value={icon.IconID}>
                                {icon.IconName}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm text-gray-900">
                            {(() => {
                              // First, check if IconName is directly available from the detail
                              if (detail.IconName) {
                                return detail.IconName;
                              }

                              // If not, fall back to finding icon in icons array
                              const foundIcon = icons.find(icon => icon.IconID === detail.IconID);

                              console.log('Searching for icon:', {
                                detailIconId: detail.IconID,
                                availableIcons: icons.map(i => ({ id: i.IconID, name: i.IconName }))
                              });

                              return foundIcon
                                ? foundIcon.IconName
                                : `Unknown Icon (ID: ${detail.IconID})`
                            })()}
                          </span>
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

export default AboutUsDetails;
