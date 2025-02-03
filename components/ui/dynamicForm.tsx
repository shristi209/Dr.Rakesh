"use client";

import React, { useState } from "react";
import { DynamicFormElement } from "./multipleForm";

interface DynamicFormProps {
    elements: DynamicFormElement[];
    formData: Record<string, string>;
    onChange: (data: Record<string, string>) => void;
    onSubmitAction?: (data: Record<string, string>) => void;
    className?: string;
}

export default function DynamicForm({
    elements,
    formData,
    onChange,
    onSubmitAction,
    className = ""
}: DynamicFormProps) {
    const [localFormData, setLocalFormData] = useState<Record<string, string>>(formData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, files } = event.target as HTMLInputElement;
        const updatedFormData = { ...localFormData };

        if (type === 'file' && files && files.length > 0) {
            updatedFormData[name] = files[0].name;
        } else {
            updatedFormData[name] = value;
        }

        setLocalFormData(updatedFormData);
        onChange({ ...updatedFormData });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmitAction?.(localFormData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
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
                                    value={localFormData[name] || ""}
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
                                    value={localFormData[name] || ""}
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
                                    value={localFormData[name] || ""}
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