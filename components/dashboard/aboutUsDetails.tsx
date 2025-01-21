"use client";
import { useEffect, useState } from "react";
import DynamicForm from "../ui/dynamicForm";
import axios from "axios";
import formElements from "../../public/data/aboutusForm.json";
import { LucideDelete, LucidePlus } from "lucide-react";

interface Icon {
  IconID: number;
  IconName: string;
}

interface AboutUsDetail {
  DetailID?: number;
  Title: string;
  IconID: number;
  isDeleted?: boolean;
}

const AboutUsDetails = () => {
  const [res, setRes] = useState<any>(); // Holds initial fetched data
  const [initialAboutUsData, setInitialAboutUsData] = useState<any>(); // Holds initial "About Us" data

  // Fetch initial About Us data on component mount
  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const aboutUsId = 1;
        const res = await axios.get(`/api/admin/about-us/${aboutUsId}`);
        setRes(res.data);
        setInitialAboutUsData(res.data); // Save the initial data
        // console.log("Fetched About Us data", res.data);
      } catch (error) {
        console.error("Error fetching About Us data", error);
      }
    };
    fetchAboutUsData();
  }, []);

  const [icons, setIcons] = useState<Icon[]>([]);
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const res = await axios.get("/api/admin/icons");
        setIcons(res.data);
        // console.log("Fetched Icons", res.data);
      } catch (error) {
        console.error("Error fetching Icons", error);
      }
    };
    fetchIcons();
  }, []);

  const [rows, setRows] = useState<{ title: string; iconID: number }[]>([
    { title: "", iconID: 0 },
  ]);

  // Handle dynamic row changes (add, delete, and edit rows)
  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
    console.log(updatedRows);
  };

  const handleAddClick = () => {
    setRows([...rows, { title: "", iconID: 0 }]);
  };

  const handleDeleteClick = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSubmit = async (formData: any) => {
    try {
      console.log("Form Data to be submitted:", formData);
      console.log("About Us Details Data to be submitted:", rows);

      // Check if the data has changed before sending it to the backend
      const hasChanges =
        formData.title !== initialAboutUsData?.title ||
        formData.description !== initialAboutUsData?.description ||
        formData.name !== initialAboutUsData?.name ||
        formData.picture !== initialAboutUsData?.picture;

      if (hasChanges || rows.some((row) => row.title || row.iconID !== 0)) {
        const aboutUsId = 1;
        const response = await axios.put(`/api/admin/about-us/${aboutUsId}`, {
          aboutUsData: formData,
          aboutUsDetailsData: rows,
        });
        console.log("Update response:", response.data);
      } else {
        console.log("No changes detected, not submitting data.");
      }
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <div>
      <DynamicForm
        elements={formElements}
        onSubmitAction={handleSubmit} // Submit handler receives the form data
        initialValues={res} // Pass initial values for form
      />
      <table style={{ width: "100%", textAlign: "left", padding: "10px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Select an icon</th>
            <th>
              <LucidePlus
                className="text-black border-2 border-gray-200"
                onClick={handleAddClick}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="title"
                  value={row.title}
                  placeholder="Add about us title"
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  name="icon"
                  value={row.iconID}
                  onChange={(e) =>
                    handleInputChange(index, "iconID", Number(e.target.value))
                  }
                >
                  <option value={0}>select an icon</option>
                  {icons.map((icon) => (
                    <option key={icon.IconID} value={icon.IconID}>
                      {icon.IconName}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(index)}>
                  <LucideDelete color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AboutUsDetails;
