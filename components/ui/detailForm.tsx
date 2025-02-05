import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash } from 'lucide-react';
import { DetailFormElement } from "./multipleForm";

interface DetailFormProps {
  fields: DetailFormElement[];
  initialRows?: Record<string, string>[];
  onRowsChange?: (rows: Record<string, string>[]) => void;
}

export default function DetailForm({ 
  fields, 
  initialRows = [{}], 
  onRowsChange 
}: DetailFormProps) {
  const [rows, setRows] = useState<Record<string, string>[]>(initialRows);
  const [lastNotifiedRows, setLastNotifiedRows] = useState<Record<string, string>[]>(initialRows);

  useEffect(() => {
    // Only call onRowsChange if rows have actually changed
    const hasChanged = JSON.stringify(rows) !== JSON.stringify(lastNotifiedRows);
    
    if (hasChanged) {
      // Use a timeout to debounce the change
      const timerId = setTimeout(() => {
        onRowsChange?.(rows);
        setLastNotifiedRows(rows);
      }, 300);

      // Cleanup function to cancel the timeout if component unmounts or rows change again
      return () => clearTimeout(timerId);
    }
  }, [rows, onRowsChange, lastNotifiedRows]);

  const handleInputChange = useCallback((index: number, field: string, value: string) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      
      // Only update if the value is actually different
      const currentValue = updatedRows[index]?.[field];
      if (currentValue === value) return prevRows;

      updatedRows[index] = {
        ...updatedRows[index],
        [field]: value
      };
      return updatedRows;
    });
  }, []);

  const handleAddClick = useCallback(() => {
    setRows(prevRows => {
      const newRow = fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
      }, {} as Record<string, string>);

      return [...prevRows, newRow];
    });
  }, [fields]);

  const handleDeleteClick = useCallback((index: number) => {
    setRows(prevRows => prevRows.filter((_, i) => i !== index));
  }, []);

  const renderInputField = useCallback((row: Record<string, string>, field: DetailFormElement, index: number) => {
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
            {field.options?.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  }, [handleInputChange]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Add New Details</h2>
        <button
          onClick={handleAddClick}
          className="inline-flex items-center justify-center p-1.5 text-gray-700 bg-white border border-gray-900 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <Plus className="w-5 h-5" />
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
                      <Trash className="w-5 h-5" />
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