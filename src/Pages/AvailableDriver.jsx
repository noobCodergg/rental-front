import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContext";
import { getAvailableDriver } from "../Utils/SubscriptionApi";
import { FaStar, FaPhoneAlt, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postRideRequest } from "../Utils/RideApi";

function AvailableDriver() {
  const { userId, userName } = useContext(userContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchAvailableDriver = async () => {
    try {
      const response = await getAvailableDriver(userId);
      setData(response.data);
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  useEffect(() => {
    fetchAvailableDriver();
  }, []);

  const handleViewProfile = (driverId) => {
    navigate(`/driveraccount/${driverId}`);
  };

  const handleRideRequest = async (driverId) => {
    const pending = "pending";
    try {
      await postRideRequest(userName, userId, driverId, pending);
      alert("Ride requested successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Available Drivers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((driver, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition transform hover:scale-105"
          >
            <div className="mb-4">
              {driver.profile_photo ? (
                <img
                  src={driver.profile_photo}
                  alt="Driver Profile"
                  className="w-24 h-24 rounded-full border-2 border-blue-500"
                />
              ) : (
                <FaUserCircle className="text-gray-400 w-24 h-24" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {driver.name}
            </h3>
            <p className="text-gray-500 text-sm mb-2 flex items-center">
              <FaEnvelope className="text-blue-500 mr-2" />
              {driver.email}
            </p>
            <p className="text-gray-500 text-sm mb-2 flex items-center">
              <FaPhoneAlt className="text-green-500 mr-2" />
              {driver.phone}
            </p>
            <p className="text-yellow-500 text-sm flex items-center">
              <FaStar className="mr-2" />
              {driver.rating ? `${driver.rating}/5` : "No rating"}
            </p>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => handleRideRequest(driver._id)}
                disabled={!driver.isAvailable}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  driver.isAvailable
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {driver.isAvailable ? "Request a Ride" : "Unavailable"}
              </button>
              <button
                onClick={() => handleViewProfile(driver._id)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableDriver;
