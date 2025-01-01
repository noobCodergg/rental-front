import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContext";
import { getSchedule, postHistory, updateTimeStatus } from "../Utils/RideApi";

function MySchedule() {
  const { userId } = useContext(userContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    try {
      setLoading(true); 
      const response = await getSchedule(userId);
      setData(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Failed to fetch schedule.");
    } finally {
      setLoading(false); 
    }
  };

  const handleComplete = async (id,t_id) => {
    try {
      await updateTimeStatus(id);
      await postHistory(userId,t_id)
     
      setData((prevData) =>
        prevData.map((schedule) =>
          schedule._id === id ? { ...schedule, rideStatus: true } : schedule
        )
      );
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 text-lg">
        Loading your schedule...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg">{error}</div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg">
        No schedule found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        My Schedule
      </h1>
      <ul>
        {data.map((schedule) => (
          <li
            key={schedule._id}
            className="p-4 mb-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Time:</span> {schedule.time}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Route:</span>{" "}
                {schedule.route || "Not Assigned"}
              </p>
            </div>
            <button
              disabled={schedule.rideStatus === true}
              onClick={() => handleComplete(schedule._id,schedule.userId)}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                schedule.rideStatus
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {schedule.rideStatus ? "Completed" : "Complete Ride"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MySchedule;
