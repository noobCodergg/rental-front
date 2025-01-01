import React, { useContext, useEffect, useState } from "react";
import { getRequest, postSchedule, updateRideStatus, updateIsRead } from "../Utils/RideApi";
import { userContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function DriverNotification() {
  const { userId } = useContext(userContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTrue, setIstrue] = useState(false);
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const fetchDriverNotification = async () => {
    try {
      setLoading(true);
      const response = await getRequest(userId);
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setData(response.data[0]);
      } else {
        setData(null);
      }
    } catch (error) {
      setError("Error fetching notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriverNotification();
  }, [userId]);

  const handleChat = (id) => {
    navigate(`/chat/${id}/${userId}`);
  };

  const handleAccept = async (id) => {
    try {
      await updateIsRead(id);
      await updateRideStatus(id, "accepted");
      setIstrue(!isTrue);
    } catch (error) {
      console.log("Error occurred");
    }
  };

  const handleReject = async (id) => {
    await updateIsRead(id);
  };

  const handlePostTime = async (senderId) => {
    if (time) {
      await postSchedule(userId, senderId, time, false);
    } else {
      alert("Please select a time.");
    }
  };

  const handleSetTime = (e) => {
    setTime(e.target.value);
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-8 border border-gray-200">
      {data ? (
        <>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">You have a new ride request</h1>
          <div className="mb-6">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Name:</span> {data.name}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Time:</span> {data.time}
            </p>
          </div>

          <div className="flex space-x-6 mb-4">
            {isTrue && (
              <div className="flex items-center space-x-4">
                <input
                  type="time"
                  value={time}
                  onChange={handleSetTime}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handlePostTime(data.sender)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Assign Time
                </button>
              </div>
            )}

            <button
              onClick={() => handleAccept(data._id)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(data._id)}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-300"
            >
              Reject
            </button>
          </div>

          <button
            onClick={() => handleChat(data.sender)}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-300"
          >
            Chat With User
          </button>
        </>
      ) : (
        <p className="text-lg text-gray-600">No new ride requests at the moment.</p>
      )}
    </div>
  );
}

export default DriverNotification;
