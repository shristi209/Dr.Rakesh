"use client";

import React, { useState } from "react";
import DynamicForm from "./dynamicForm";
import DetailForm from "./detailForm";

interface FormElement {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
}

interface MultipleFormProps {
    elements: FormElement[];
    onSubmitAction: (data: Record<string, string>) => void;
    initialValues?: Record<string, string>;
    additionalForms?: {
        title: string;
        elements: FormElement[];
    }[];
}

export default function MultipleForm({
    elements,
    onSubmitAction,
    initialValues = {},
    additionalForms = []
}: MultipleFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>(initialValues);
    const [additionalFormData, setAdditionalFormData] = useState<Record<string, string>[]>(
        additionalForms.map(() => ({}))
    );

    const handleMainFormChange = (data: Record<string, string>) => {
        setFormData(data);
    };

    const handleAdditionalFormChange = (index: number, data: Record<string, string>) => {
        const updatedAdditionalForms = [...additionalFormData];
        updatedAdditionalForms[index] = data;
        setAdditionalFormData(updatedAdditionalForms);
    };

    const handleDetailRowsChange = (index: number, rows: Record<string, string>[]) => {
        const updatedAdditionalForms = [...additionalFormData];
        
        const formattedRows = rows
          .filter(row => row.Title || row.title)
          .map(row => ({
            title: row.Title || row.title,
            icon_id: row.IconID || row.icon_id
          }));
      
        updatedAdditionalForms[index] = {
          ...updatedAdditionalForms[index],
          details: JSON.stringify(formattedRows)
        };
        
        console.log(`Detail rows for form ${index}:`, rows);
        console.log('Formatted rows:', formattedRows);
        console.log('Updated additional form data:', updatedAdditionalForms);
        
        setAdditionalFormData(updatedAdditionalForms);
      };

    const handleSubmit = () => {
        const combinedData: Record<string, string> = {
            ...formData,
            ...additionalFormData.reduce((acc, curr, index) => {
                Object.keys(curr).forEach(key => {
                    acc[`additionalForm_${index}_${key}`] = curr[key];
                });
                return acc;
            }, {})
        };

        console.log('Combined submission data:', combinedData);

        onSubmitAction(combinedData);
    };

    return (
        <div className=" space-y-6">
            {/* Main Form */}
            <div className="bg-white rounded-lg overflow-hidden">
                <div className="p-6">
                    <DynamicForm
                        elements={elements}
                        formData={formData}
                        onChange={handleMainFormChange}
                    />
                </div>
            </div>

            {/* Additional Dynamic Forms */}
            {additionalForms.map((form, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden">
                    <div>
                        <DetailForm
                            fields={form.elements}
                            onRowsChange={(rows) => handleDetailRowsChange(index, rows)}
                        />
                    </div>
                </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center" style={{ marginBottom: '30px' , marginTop: '30px' }}>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-64 px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}