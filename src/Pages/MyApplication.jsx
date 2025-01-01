import React, { useContext, useEffect, useState } from "react";
import { getMyApplications } from "../Utils/ApplicationApi";
import { userContext } from "../Context/UserContext";

function MyApplication() {
  const { userId } = useContext(userContext);
  const [data, setData] = useState([]);

  const fetchMyApplications = async () => {
    try {
      const response = await getMyApplications(userId);
      setData(response.data);
    } catch (error) {
      console.log("Error occurred while fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Applications
      </h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Applicant: {item.applicantName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Property Name:{" "}
                <span className="font-medium">{item.propertyName}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Application Body:
                <span className="block text-gray-800 font-light mt-1">
                  {item.applicationBody}
                </span>
              </p>
              <p
                className={`text-sm font-semibold ${
                  item.applicationStatus === "accepted"
                    ? "text-green-500"
                    : item.applicationStatus === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Status:
                {item.applicationStatus === "accepted"
                  ? "Accepted"
                  : item.applicationStatus === "pending"
                  ? "Pending"
                  : "Rejected"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-6">
          No applications found.
        </p>
      )}
    </div>
  );
}

export default MyApplication;
