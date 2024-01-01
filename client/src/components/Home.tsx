import React, { useState, useEffect } from 'react';
import InsertModal from './InsertModal';
import EditModal from './EditModal';
import { deleteUserData, getUsers } from '../services/api';
import UserTable from './UserTable';

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    title: string;
    description: string;
}
interface responseProps {
    data: User[];
}
const Home: React.FC = () => {
    const [users, setUsers] = useState<responseProps>({ data: [] });
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // fetch all user data
    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response);
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    // all modal close and open properties
    const handleInsertModalOpen = () => {
        setInsertModalOpen(true);
    };

    const handleInsertModalClose = () => {
        setInsertModalOpen(false);
    };

    const handleEditModalOpen = (user: User) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedUser(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (user: User) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedUser(null);
        setDeleteModalOpen(false);
    };
    // user delete method
    const handleDeleteUser = async () => {
        if (selectedUser) {
            await deleteUserData(selectedUser._id)
                .then(() => {
                    handleDeleteModalClose();
                    fetchUsers();
                })
                .catch(error => console.error(error));
        }

    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-3xl font-bold mb-4">User List</h1>
            <button onClick={handleInsertModalOpen} className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
            {/* // userTable component */}
            <UserTable users={users} onEdit={handleEditModalOpen} onDelete={handleDeleteModalOpen} />
            {/* All modal popup functionality */}
            {insertModalOpen && <InsertModal onClose={handleInsertModalClose} fetch={fetchUsers} />}
            {editModalOpen && selectedUser && <EditModal item={{ ...selectedUser, phone: Number(selectedUser.phone) }} onClose={handleEditModalClose} fetch={fetchUsers} />}
            {deleteModalOpen && selectedUser && (
                <div className="mt-4">
                    <p className="mb-2">Are you sure you want to delete this user?</p>
                    <button onClick={handleDeleteUser} className="bg-red-500 text-white px-2 py-1 rounded">Yes, delete</button>
                    <button onClick={handleDeleteModalClose} className="ml-2 bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Home;
