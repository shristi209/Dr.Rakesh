"use client";

import React, { useState } from "react";
import { DynamicFormElement } from "./multipleForm";

interface DynamicFormProps {
    elements: DynamicFormElement[];
    formData?: Record<string, string>;
    initialValues?: Record<string, string>;
    onChange?: (data: Record<string, string>) => void;
    onSubmitAction?: (data: Record<string, string>) => void;
    className?: string;
}

export default function DynamicForm({
    elements,
    formData = {}, 
    initialValues = {}, 
    onChange,
    onSubmitAction,
    className = ""
}: DynamicFormProps) {
    // Prioritize initialValues over formData
    const initialFormData = { ...formData, ...initialValues };

    // Ensure initialFormData is always an object
    const safeFormData = initialFormData || {};

    // Initialize state with a safe, guaranteed object
    const [localFormData, setLocalFormData] = useState<Record<string, string>>(() => {
        // Create a new object with all element names as keys
        const initialData: Record<string, string> = {};
        elements.forEach(element => {
            // Prioritize values from initialFormData
            initialData[element.name] = safeFormData[element.name] || '';
        });
        return initialData;
    });

    // Defensive onChange handler
    const safeOnChange = onChange || (() => {});

    // Log initial form data for debugging
    console.log('Initial Form Data:', localFormData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        // Defensive checks
        if (!event || !event.target) {
            console.warn('Invalid input event');
            return;
        }

        const { name, value, type, files } = event.target as HTMLInputElement;
        
        // Ensure name exists and is a string
        if (!name || typeof name !== 'string') {
            console.warn('Invalid input name', name);
            return;
        }

        // Create a new object to avoid direct mutation
        const updatedFormData = { ...localFormData };

        if (type === 'file' && files && files.length > 0) {
            updatedFormData[name] = files[0].name;
        } else {
            updatedFormData[name] = value || '';
        }

        // Update local state
        setLocalFormData(updatedFormData);
        
        // Call onChange with the updated data
        safeOnChange(updatedFormData);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmitAction?.(localFormData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
                {elements.map((element) => {
                    // Defensive element check
                    if (!element || !element.name) {
                        console.warn('Invalid form element', element);
                        return null;
                    }

                    const { name, label, type, placeholder, options, required } = element;
                    
                    // Ensure localFormData is initialized for this element
                    const elementValue = localFormData[name] ?? '';

                    return (
                        <div key={name} className="flex flex-col space-y-1">
                            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                                {label} {required && <span className="text-red-500">*</span>}
                            </label>
                            {type === "select" && options ? (
                                <select
                                    id={name}
                                    name={name}
                                    required={required}
                                    value={elementValue}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                >
                                    <option value="">Select {label}</option>
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : type === "textarea" ? (
                                <textarea
                                    id={name}
                                    name={name}
                                    placeholder={placeholder}
                                    required={required}
                                    value={elementValue}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    rows={4}
                                />
                            ) : type === "file" ? (
                                <input
                                    id={name}
                                    name={name}
                                    type="file"
                                    placeholder={placeholder}
                                    required={required}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                />
                            ) : (
                                <input
                                    id={name}
                                    name={name}
                                    type={type}
                                    placeholder={placeholder}
                                    required={required}
                                    value={elementValue}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            {onSubmitAction && (
                <div className="flex justify-center my-6">
                    <button
                        type="submit"
                        className="w-64 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}
        </form>
    );
}