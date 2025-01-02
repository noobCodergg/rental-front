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
        <div className="p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">All Users</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={item.profile_photo}
                            alt={`${item.name}'s profile`}
                            className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-blue-500"
                        />
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h2>
                        <p className="text-sm text-gray-600 mb-1 font-medium">{item.role}</p>
                        <p className="text-sm text-gray-500 mb-1">{item.email}</p>
                        <p className="text-sm text-gray-500 mb-4">{item.phone}</p>
                        <p className="text-xs text-gray-400 mb-4">ID: {item._id}</p>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition duration-200"
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
