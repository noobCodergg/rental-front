import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../Utils/UserApi';

function AllUsers() {
    const [data, setData] = useState([]);

    const fetchAllUsers = async () => {
        try {
            const response = await getUsers();
            setData(response.data);
        } catch (error) {
            console.log("Error occurred while fetching users");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setData((prevData) => prevData.filter((user) => user._id !== userId));
            alert("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">All Users</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={item.profile_photo}
                            alt={`${item.name}'s profile`}
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-600 mb-1">{item.role}</p>
                        <p className="text-gray-600 mb-1">{item.email}</p>
                        <p className="text-gray-600 mb-4">{item.phone}</p>
                        <p className="text-gray-600 mb-1">{item._id}</p>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Delete User
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllUsers;
