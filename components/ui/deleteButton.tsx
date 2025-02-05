'use client'; 
import React from 'react';
import { LucideTrash2 } from 'lucide-react';

interface DeleteButtonProps {
  userId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ userId }) => {

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');

    if (!confirmation) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('User deleted successfully!');
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert('An error occurred while deleting the user');
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center justify-center bg-red-600 p-1.5 rounded-md hover:bg-red-700 transition duration-300"
      title="Delete User"
    >
      <LucideTrash2 className="w-4 h-4 text-white" />
    </button>
  );
};

export default DeleteButton;
