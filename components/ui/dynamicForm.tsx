"use client";

import React, { useState, useEffect } from "react";

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
    onSubmitAction: (data: Record<string, string>) => void;
    initialValues?: Record<string, string>;  
}

export default function DynamicForm({ elements, onSubmitAction,  initialValues = {} }: DynamicFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>(initialValues);
    useEffect(() => {
        setFormData(initialValues);
      }, [initialValues]);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value as string;
        });
        onSubmitAction(data);
    };

    return (

        <form onSubmit={handleSubmit} className="space-y-4">
            {elements.map((element) => {
                const { name, label, type, placeholder, options, required, value } = element;
                return (
                    <div key={name} className="flex flex-col space-y-2 boredr-gray-900">
                        <label htmlFor={name} className="mt-3 font-medium">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        {type === "select" && options ? (
                            <select
                                id={name}
                                name={name}
                                required={required}
                                value={formData[name] || ""}
                                onChange={handleInputChange}
                                className="border rounded-md p-2"
                            >
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
                                className="border rounded-md p-2"
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
                                className="border rounded-md p-2"
                            />
                        )}
                    </div>
                );
            })}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-gray-900 text-sm text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                    Submit
                </button>
            </div>

        </form>

    );
}
