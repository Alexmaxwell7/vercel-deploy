import React from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  description: string;
}

interface UserTableProps {
  users: { data: User[] } | undefined;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="mt-4 w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 sm:px-6 md:px-8 text-left">Name</th>
            <th className="px-4 py-2 sm:px-6 md:px-8 text-left">Email</th>
            <th className="px-4 py-2 sm:px-6 md:px-8 text-left">Phone</th>
            <th className="px-4 py-2 sm:px-6 md:px-8 text-left">Title</th>
            <th className="px-4 py-2 sm:px-6 md:px-8 text-left">Description</th>
            <th className="px-4 py-2 sm:px-6 md:px-8 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-4 py-2 sm:px-6 md:px-8 text-left">{user.name}</td>
              <td className="px-4 py-2 sm:px-6 md:px-8 text-left">{user.email}</td>
              <td className="px-4 py-2 sm:px-6 md:px-8 text-left">{user.phone}</td>
              <td className="px-4 py-2 sm:px-6 md:px-8 text-left">{user.title}</td>
              <td className="px-4 py-2 sm:px-6 md:px-8 text-left">{user.description}</td>
              <td className="px-4 py-2 sm:px-6 md:px-8 space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
