import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContext";
import { getApplications, updateApplication } from "../Utils/ApplicationApi";
import { useNavigate } from "react-router-dom";
import { updatePropertyStatus } from "../Utils/PostApi";

function ApplicationPortal() {
  const navigate = useNavigate();
  const { userId } = useContext(userContext);
  const [data, setData] = useState([]);

  const fetchApplication = async () => {
    try {
      const response = await getApplications(userId);

      const sortedData = response.data.sort((a, b) => {
        if (
          a.applicationStatus === "pending" &&
          b.applicationStatus !== "pending"
        )
          return -1;
        if (
          a.applicationStatus !== "pending" &&
          b.applicationStatus === "pending"
        )
          return 1;
        return 0;
      });

      setData(sortedData);
    } catch (error) {
      console.log("Error occurred while fetching applications");
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const handleProfile = (userId) => {
    navigate(`/tenantaccount/${userId}`);
  };

  const handleUpdate = async (status, id, propertyid) => {
    try {
      const response = await updateApplication(id, status);

      const propertyResponse = updatePropertyStatus(propertyid);

      await fetchApplication();
    } catch (error) {
      console.log("Error occurred while updating the application");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Applications Portal
      </h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        data.map((item) => {
          const isPending = item.applicationStatus === "pending";
          return (
            <div
              key={item._id}
              className="bg-white p-5 mb-6 rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.applicantName}
                </h3>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.propertyName}
                </h3>
              </div>

              <p className="text-gray-600 mb-4">{item.applicationBody}</p>

              {isPending && (
                <span className="text-xs text-yellow-500 font-semibold py-1 px-2 rounded-full bg-yellow-100 mb-4">
                  New
                </span>
              )}

              <div className="flex space-x-4 justify-between">
                <button
                  onClick={() =>
                    handleUpdate("accepted", item._id, item.propertyid)
                  }
                  className={`px-4 py-2 rounded-lg transition duration-200 ${
                    isPending
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!isPending}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleUpdate("rejected", item._id)}
                  className={`px-4 py-2 rounded-lg transition duration-200 ${
                    isPending
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!isPending}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleProfile(item.userId)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  View Applicant Profile
                </button>
              </div>
              <div>
                {!isPending && (
                  <p>You have {item.applicationStatus} already!</p>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ApplicationPortal;
