'use client'; 
import React from 'react';

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
      style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '2px', border: 'none' }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
