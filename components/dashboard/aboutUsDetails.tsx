"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import formElements from "../../public/data/aboutusForm.json" assert { type: "json" };
import { DynamicFormElement, DetailFormElement } from "../ui/multipleForm";
import { Delete, Pencil, Check, X } from "lucide-react";
import MultipleForm from "../ui/multipleForm";
// import toast from 'react-hot-toast';

const typedFormElements = formElements as DynamicFormElement[];

interface Icon {
  IconID: number;
  IconName: string;
}

interface AboutUsDetail {
  id?: number;
  Title: string;
  IconID: number;
  IconName: string;
  isDeleted?: boolean;
}

interface AboutUsData {
  name: string;
  title: string;
  description: string;
  picture?: string | null;
  details?: AboutUsDetail[];
}

interface FormDetail {
  title?: string;
  Title?: string;
  icon_id?: number | string;
}

interface FormData {
  name?: string;
  title?: string;
  description?: string;
  picture?: string | null;
  [key: string]: string | undefined | null; 
}

interface ApiResponseDetail {
  id?: number;
  title: string;
  icon_id: number;
  IconName?: string;
}

function isValidApiResponseDetail(detail: Partial<ApiResponseDetail>): detail is ApiResponseDetail {
  return (
    typeof detail.title === 'string' && 
    detail.title.trim() !== '' && 
    typeof detail.icon_id === 'number' && 
    detail.icon_id > 0
  );
}

interface RawIconData {
  IconID?: unknown;
  IconName?: unknown;
}

function isValidIcon(icon: RawIconData): icon is Icon {
  return (
    typeof icon.IconID === 'number' && 
    icon.IconID > 0 && 
    typeof icon.IconName === 'string' && 
    icon.IconName.trim() !== ''
  );
}

const AboutUsDetails = () => {
  const [res, setRes] = useState<AboutUsData | null>(null);
  const [initialAboutUsData, setInitialAboutUsData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedDetails, setSavedDetails] = useState<AboutUsDetail[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [icons, setIcons] = useState<Icon[]>([]);
  const [rows, setRows] = useState<AboutUsDetail[]>([
    { Title: "", IconID: 0, IconName: "" }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutUsId = 1;
        const response = await axios.get(`/api/admin/about-us/${aboutUsId}`);
        console.log("Fetched Data:", response.data);

        setRes(response.data);
        setInitialAboutUsData(response.data);

        // Robust validation and mapping of details
        if (response.data.aboutUsDetails && Array.isArray(response.data.aboutUsDetails)) {
          const validDetails: AboutUsDetail[] = response.data.aboutUsDetails
            .filter(isValidApiResponseDetail)
            .map((detail : ApiResponseDetail) : AboutUsDetail => {
              const foundIcon = icons.find(icon => 
                icon.IconID === detail.icon_id || 
                icon.IconName === String(detail.icon_id)
              );

              return {
                id: detail.id,
                Title: detail.title,
                IconID: detail.icon_id,
                IconName: foundIcon?.IconName || detail.IconName || 'Unknown Icon'
              };
            });

          // Only set details if there are valid entries
          if (validDetails.length > 0) {
            setSavedDetails(validDetails);
          } else {
            console.warn('No valid details found in the response');
          }
        }

        setLoading(false);
      } catch (error) {
        // Comprehensive error handling
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An unknown error occurred while fetching data';
        
        console.error("Error fetching About Us data:", errorMessage);
        setError(`Failed to load About Us data: ${errorMessage}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [icons, setRes, setInitialAboutUsData, setSavedDetails]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get<RawIconData[]>("/api/admin/icons");
        console.log("Fetched Icons:", response.data);

        // Validate and transform icons
        const validIcons: Icon[] = response.data
          .filter(isValidIcon)
          .map(icon => ({
            IconID: icon.IconID as number,
            IconName: icon.IconName as string
          }));

        // Only update if there are valid icons
        if (validIcons.length > 0) {
          setIcons(validIcons);
        } else {
          console.warn("No valid icons found");
          setIcons([]); // Ensure icons is an empty array if no valid icons
        }
      } catch (error) {
        // Comprehensive error handling
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An unknown error occurred while fetching icons';
        
        console.error("Error fetching Icons:", errorMessage);
        setError(`Failed to load icons: ${errorMessage}`);
        setIcons([]); // Ensure icons is an empty array on error
      }
    };

    // Only fetch if icons is empty
    if (icons.length === 0) {
      fetchIcons();
    }
  }, [icons, setIcons, setError]);

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

  const handleDeleteSavedDetail = async (detail: AboutUsDetail) => {
    if (window.confirm('Are you sure you want to delete this detail?')) {
      try {
        if (detail.id) {
          const response = await axios.delete(`/api/admin/about-us/${detail.id}`);
          
          if (response.status === 200) {
            const updatedDetails = savedDetails.filter(d => d.id !== detail.id);
            setSavedDetails(updatedDetails);
            console.log("Detail deleted successfully!");
          } else {
            console.error("Failed to delete detail. Status:", response.status);
          }
        } else {
          console.error("Detail has no ID");
        }
      } catch (error) {
        console.error("Error deleting detail", error);
      }
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      // Find keys that include 'details'
      const detailKeys = Object.keys(formData).filter(key => key.includes('details'));
  
      const newDetails: AboutUsDetail[] = detailKeys.flatMap(key => {
        try {
          // Safely parse details
          const parsedDetails: FormDetail[] = JSON.parse(formData[key] as string);
  
          return parsedDetails.map((detail) => {
            // Find the corresponding icon
            const foundIcon = icons.find(icon => 
              icon.IconName === String(detail.icon_id) || 
              icon.IconID === Number(detail.icon_id)
            );
  
            return {
              Title: (detail.title || detail.Title || '').toString(),
              IconID: foundIcon ? foundIcon.IconID : 0,
              IconName: foundIcon ? foundIcon.IconName : 'Unknown Icon'
            };
          });
        } catch (error) {
          console.error(`Error parsing details for key ${key}:`, error);
          return [];
        }
      }).filter((detail): detail is AboutUsDetail => 
        !!detail.Title && detail.IconID !== 0 && detail.IconName !== 'Unknown Icon'
      );
      
      console.log("Parsed new details:", newDetails);
  
      // Comprehensive change detection
      const hasMainDataChanges = 
        formData.name !== initialAboutUsData?.name ||
        formData.title !== initialAboutUsData?.title ||
        formData.description !== initialAboutUsData?.description ||
        formData.picture !== initialAboutUsData?.picture;

  
      const hasDetailsChanges = 
        JSON.stringify(newDetails) !== JSON.stringify(savedDetails);
  
      const hasChanges = hasMainDataChanges || hasDetailsChanges;
    
      if (hasChanges) {
        const aboutUsId = 1;
        
        const response = await axios.put(`/api/admin/about-us/${aboutUsId}`, {
          aboutUsData: {
            name: formData.name || '',
            title: formData.title || '',
            description: formData.description || '',
            picture: formData.picture || null
          },
          aboutUsDetailsData: [...savedDetails, ...newDetails]
        });
        
        console.log("Submit response:", response.data);
        
        setSavedDetails(prev => [...prev, ...newDetails]);
        
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
        id: icon.IconID,     
        name: icon.IconName  
      }))
    }
  ] as DetailFormElement[];
  const initialValues: Record<string, string> = res ? {
    name: res.name || '',
    title: res.title || '',
    description: res.description || '',
    picture: res.picture || ''
  } : {};
  return (
    <div className="mt-5 max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">About Us Information</h2>
        </div>
        <div>
          <MultipleForm
            elements={typedFormElements}
            onSubmitAction={handleSubmit}
            initialValues={initialValues}
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
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {savedDetails.map((detail, index) => (
                    <tr
                      key={detail.id || index}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        {editMode && editingIndex === index ? (
                          <input
                            type="text"
                            value={detail.Title}
                            onChange={(e) => {handleInputChange(index, 'Title', e.target.value)}}
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
                            onChange={(e) => {handleInputChange(index, 'IconID', Number(e.target.value))}}
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
                              if (detail.IconName) {
                                return detail.IconName;
                              }

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
                                onClick={() => handleDeleteSavedDetail(detail)}
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

export default AboutUsDetails;
