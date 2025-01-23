"use client";

import React, { useState, useEffect, useRef } from "react";

interface FormElement {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    value?: string;
}

interface DynamicFormProps {
    elements: FormElement[];
    onSubmitAction?: (data: Record<string, string | File>) => void;
    initialValues?: Record<string, string>;
}

export default function DynamicForm({ elements, onSubmitAction, initialValues = {} }: DynamicFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>(initialValues);
    const fileInputRefs = useRef<Record<string, React.RefObject<HTMLInputElement>>>({});

    // Initialize refs for file inputs
    useEffect(() => {
        elements.forEach((element) => {
            if (element.type === 'file') {
                fileInputRefs.current[element.name] = React.createRef<HTMLInputElement>();
            }
        });
    }, [elements]);

    useEffect(() => {
        if (JSON.stringify(initialValues) !== JSON.stringify(formData)) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, files } = event.target as HTMLInputElement;
        
        // Special handling for file inputs
        if (type === 'file' && files && files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0].name, // Store filename
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!onSubmitAction) return;

        const formData = new FormData(event.currentTarget);
        const data: Record<string, string | File> = {};
        formData.forEach((value, key) => {
            data[key] = value as string | File;
        });
        onSubmitAction(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {elements.map((element) => {
                    const { name, label, type, placeholder, options, required } = element;
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
                                    value={formData[name] || ""}
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
                                    value={formData[name] || ""}
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
                                    value={formData[name] || ""}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {onSubmitAction && (
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Submit
                    </button>
                </div>
            )}
        </form>
    );
}
