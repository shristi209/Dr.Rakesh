"use client";

import React, { useState, useCallback } from "react";
import DynamicForm from "./dynamicForm";
import DetailForm from "./detailForm";

interface FieldOption {
    id: number;
    name: string;
}

export interface FormElement<T = string> {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'file' | 'select';
    placeholder?: string;
    options?: T[];
    required?: boolean;
}

export type DynamicFormElement = FormElement<string>;
export type DetailFormElement = FormElement<FieldOption>;

interface MultipleFormProps {
    elements: DynamicFormElement[];
    onSubmitAction: (data: Record<string, string>) => void;
    initialValues?: Record<string, string> | undefined;
    additionalForms?: {
        title: string;
        elements: DetailFormElement[];
    }[];
}

export default function MultipleForm({
    elements,
    onSubmitAction,
    initialValues = {},
    additionalForms = []
}: MultipleFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>(initialValues ?? {});
    const [additionalFormData, setAdditionalFormData] = useState<Record<string, string>[]>(
        additionalForms.map(() => ({}))
    );

    const handleMainFormChange = useCallback((data: Record<string, string>) => {
        setFormData(prevData => {
            // Only update if the data is actually different
            const isChanged = Object.keys(data).some(
                key => prevData[key] !== data[key]
            );
            return isChanged ? data : prevData;
        });
    }, []);

    const handleAdditionalFormChange = useCallback((index: number, data: Record<string, string>) => {
        setAdditionalFormData(prevData => {
            const updatedAdditionalForms = [...prevData];
            
            // Only update if the data is actually different
            const isChanged = Object.keys(data).some(
                key => updatedAdditionalForms[index][key] !== data[key]
            );
            
            if (isChanged) {
                updatedAdditionalForms[index] = data;
            }
            
            return updatedAdditionalForms;
        });
    }, []);

    const handleDetailRowsChange = useCallback((index: number, rows: Record<string, string>[]) => {
        setAdditionalFormData(prevData => {
            const updatedAdditionalForms = [...prevData];
            
            const formattedRows = rows
              .filter(row => Object.values(row).some(value => value && value.trim() !== ''))
              .map(row => {
                const mappedRow: Record<string, string> = {};
                
                if (additionalForms[index]) {
                  additionalForms[index].elements.forEach(element => {
                    if (row[element.name]) {
                      mappedRow[element.name] = row[element.name];
                    }
                  });
                }
                
                return mappedRow;
              });
            
            const newFormData = {
              ...updatedAdditionalForms[index],
              details: JSON.stringify(formattedRows)
            };
            
            // Only update if the data is actually different
            const isChanged = JSON.stringify(updatedAdditionalForms[index]) !== JSON.stringify(newFormData);
            
            if (isChanged) {
                updatedAdditionalForms[index] = newFormData;
            }
            
            return updatedAdditionalForms;
        });
    }, [additionalForms]);

    const handleSubmit = useCallback(() => {
        const combinedData: Record<string, string> = {
            ...formData,
            ...additionalFormData.reduce((acc, curr, index) => {
                Object.keys(curr).forEach(key => {
                    acc[`additionalForm_${index}_${key}`] = curr[key];
                });
                return acc;
            }, {})
        };
        
        onSubmitAction(combinedData);
    }, [formData, additionalFormData, onSubmitAction]);

    return (
        <div className="space-y-6">
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