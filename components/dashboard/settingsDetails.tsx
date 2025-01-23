"use client"
import DynamicForm from "../ui/dynamicForm";
import settingForm from "../../public/data/settingForm.json";
import axios from "axios";
import { useState } from "react";

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
        <div>
            <DynamicForm
                elements={formConfig.fields}
                initialValues={settings}
                onSubmitAction={handleFormSubmit}
            />
        </div>
    );
};

export default SettingsDetails;
