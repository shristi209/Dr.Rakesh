"use client"
import DynamicForm from "../ui/dynamicForm";
import settingForm from "../../public/data/settingForm.json";
import axios from "axios";
import { useState } from "react";
import { convertFormFields } from "@/lib/form-utils";

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue: string;
}

interface FormConfig {
    formTitle: string;
    fields: FormField[];
}

interface SettingsDetailsProps {
    initialSettings: Record<string, string>;
}

const SettingsDetails: React.FC<SettingsDetailsProps> = ({ initialSettings }) => {

    const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
    const formConfig = settingForm as FormConfig;
// console.log("Settings......................", settings);


    const handleFormSubmit = async (data: Record<string, string | File>) => {
        try {
            const settingId = 1;

            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof File) {
                    formData.append(key, value, value.name);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            const response = await axios.put(`/api/admin/settings/${settingId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Form submitted successfully:', response.data);

            setSettings(prevSettings => {
                const updatedSettings = { ...prevSettings };

                const textFields = ['name', 'specialist', 'description'];
                textFields.forEach(field => {
                    if (data[field]) {
                        updatedSettings[field] = data[field].toString();
                    }
                });

                if (response.data.logoPath) {
                    updatedSettings.logo = response.data.logoPath;
                }
                if (response.data.imagePath) {
                    updatedSettings.image = response.data.imagePath;
                }

                console.log('Updated Settings:', updatedSettings);
                return updatedSettings;
            });
            console.log('Settings updated successfully:', settings);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                console.error('Error submitting form:', errorMessage);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <div className="mt-5 mx-auto space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">Settings Information</h2>
                </div>
                <div className='p-6'>
                    <DynamicForm
                        elements={convertFormFields(formConfig.fields)}
                        formData={settings}
                        onSubmitAction={handleFormSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsDetails;
