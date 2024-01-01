import React, { useState } from 'react';
import { insertUserData } from '../services/api';

interface InsertModalProps {
  onClose: () => void;
  fetch: () => Promise<void>;
}

const InsertModal: React.FC<InsertModalProps> = ({ onClose,fetch }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await insertUserData({
      ...newItem,
      phone: parseInt(newItem.phone)
    }).then(() => {   
      onClose();
      fetch();
    }).catch((error) => console.error(error));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded">
        <h2 className="text-2xl font-bold mb-4">Add Item</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input type="text" name="name" value={newItem.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-2 py-1" />
          </label>
          <label className="block mb-2">
            Email:
            <input type="text" name="email" value={newItem.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-2 py-1" />
          </label>
          <label className="block mb-2">
            Phone:
            <input type="text" name="phone" value={newItem.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-2 py-1" />
          </label>
          <label className="block mb-2">
            Address:
            <input type="text" name="address" value={newItem.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-2 py-1" />
          </label>
          <label className="block mb-2">
            Title:
            <input type="text" name="title" value={newItem.title} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-2 py-1" />
          </label>
          <label className="block mb-4">
            Description:
            <input type="text" name="description" value={newItem.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-2 py-1" />
          </label>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Item</button>
            <button type="button" onClick={onClose} className="ml-2 bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsertModal;
