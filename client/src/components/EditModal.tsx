import React, { useState, useEffect } from 'react';
import { updateUserData } from '../services/api';

interface EditModalProps {
  item: {
    _id: string;
    name: string;
    email: string;
    phone: number;
    title: string;
    description: string;
  };
  onClose: () => void;
  fetch: () => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose, fetch }) => {
  const [editedItem, setEditedItem] = useState({
    name: item.name,
    email: item.email,
    phone: item.phone,
    title: item.title,
    description: item.description,
  });

  useEffect(() => {
    setEditedItem({
      name: item.name,
      email: item.email,
      phone: item.phone,
      title: item.title,
      description: item.description,
    });
  }, [item]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //update user data
    await updateUserData(item._id, editedItem)
      .then(() => {
        onClose();
        fetch();
      }
      ).catch((error) => console.error(error));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded">
        <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={editedItem.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="text"
              name="email"
              value={editedItem.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="number"
              name="phone"
              value={editedItem.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={editedItem.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label className="block mb-4">
            Description:
            <textarea
              name="description"
              value={editedItem.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Item
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
