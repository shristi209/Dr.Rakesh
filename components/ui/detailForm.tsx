"use client";

import React, { useState, useEffect } from 'react';
import { LucidePlus, LucideDelete } from 'lucide-react';

interface DetailFormProps {
  fields: {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    options?: string[];
  }[];
  initialRows?: Record<string, string>[];
  onRowsChange?: (rows: Record<string, string>[]) => void;
}

export default function DetailForm({ 
  fields, 
  initialRows = [{}], 
  onRowsChange 
}: DetailFormProps) {
  const [rows, setRows] = useState<Record<string, string>[]>(initialRows);

  useEffect(() => {
    // Log rows whenever they change
    console.log('DetailForm rows updated:', rows);
    onRowsChange?.(rows);
  }, [rows]);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value
    };
    setRows(updatedRows);
  };

  const handleAddClick = () => {
    const newRow = fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as Record<string, string>);

    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
  };

  const handleDeleteClick = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const renderInputField = (row: Record<string, string>, field: any, index: number) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={row[field.name] || ''}
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(index, field.name, e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        );
      case 'textarea':
        return (
          <textarea
            value={row[field.name] || ''}
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(index, field.name, e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows={3}
          />
        );
      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleInputChange(index, field.name, file.name);
              }
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        );
        case 'select':
            return (
              <select
                value={row[field.name] || ''}
                onChange={(e) => handleInputChange(index, field.name, e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option: any) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Add New Details</h2>
        <button
          onClick={handleAddClick}
          className="inline-flex items-center justify-center p-1.5 text-gray-700 bg-white border border-gray-900 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <LucidePlus className="w-5 h-5" />
        </button>
      </div>

      <div className="">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {fields.map((field) => (
                  <th 
                    key={field.name} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {field.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {fields.map((field) => (
                    <td key={field.name} className="px-6 py-4">
                      {renderInputField(row, field, index)}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="text-red-600 hover:text-red-900 focus:outline-none"
                    >
                      <LucideDelete className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}