import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContext";
import { getSubscription, updatesubscription, validation, postIncome, updateUserSubscription } from "../Utils/SubscriptionApi";
import { authContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AvailableDriver from "./AvailableDriver";
import { postSuggestion } from "../Utils/UserApi";

function SubscriptionPlans() {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(userContext);
  const { role } = useContext(authContext);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const currentDate = new Date();
  const nextWeek = new Date();

  const fetchSubscription = async () => {
    try {
      const response = await getSubscription();
      setData(response.data);
    } catch (error) {
      console.error("Error occurred while fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchValidation = async () => {
    try {
      const response = await validation(userId);
      setIsValid(response.data);
    } catch (error) {
      console.error("Error occurred while validating subscription:", error);
    }
  };

  const handleInputChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSaveChanges = async (id) => {
    const updatedSubscription = data.find((item) => item._id === id);
    try {
      await updatesubscription(id, updatedSubscription);
      alert("Subscription updated successfully!");
    } catch (error) {
      console.error("Error occurred while updating subscription:", error);
    }
  };

  const handleSelectPlan = async (subscriptionId, subscriptionDuration, price) => {
    try {
      setLoading(true);
      await updateUserSubscription(
        userId,
        subscriptionId,
        nextWeek.setDate(currentDate.getDate() + subscriptionDuration)
      );
      localStorage.setItem("subscriptionId", subscriptionId);
      alert("Subscription updated successfully!");
      fetchValidation();
      fetchSubscription();

      {role!=="Driver" && await postIncome(price)};
    } catch (error) {
      console.error("Error updating subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValidation();
    fetchSubscription();
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handlePost = async () => {
    const id = localStorage.getItem("subscriptionId");
    try {
      await postSuggestion(userId, id, content, "sugg");
      setOpen(!open)
    } catch (error) {
      console.log("Error");
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        {isValid ? "You are already a premium member" : "Subscription Plans"}
      </h1>
      {isValid && (
        <div className="text-center">
          <button
            onClick={handleOpen}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Suggestions
          </button>
        </div>
      )}
      {open && (
        <div className="mt-4 text-center">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Suggest something..."
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handlePost}
            className="ml-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-xl font-semibold text-gray-600">Loading...</p>
        </div>
      ) : isValid ? (
        role !== "Driver" && <AvailableDriver />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-200"
            >
              {role === "Admin" ? (
                <>
                  <input
                    type="text"
                    value={item.subscriptionName}
                    onChange={(e) =>
                      handleInputChange(item._id, "subscriptionName", e.target.value)
                    }
                    className="text-2xl font-bold text-blue-600 mb-4 w-full border-b-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={item.subscriptionDuration}
                    onChange={(e) =>
                      handleInputChange(item._id, "subscriptionDuration", e.target.value)
                    }
                    className="w-full text-gray-600 border-b-2 focus:outline-none focus:border-blue-500 mb-3"
                    placeholder="Duration (days)"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(item._id, "price", e.target.value)
                    }
                    className="w-full text-gray-600 border-b-2 focus:outline-none focus:border-blue-500 mb-3"
                    placeholder="Price"
                  />
                  <input
                    type="time"
                    value={item.rideAvailabilityFrom}
                    onChange={(e) =>
                      handleInputChange(item._id, "rideAvailabilityFrom", e.target.value)
                    }
                    className="w-full text-gray-600 border-b-2 focus:outline-none focus:border-blue-500 mb-3"
                  />
                  <input
                    type="time"
                    value={item.rideAvailabilityTo}
                    onChange={(e) =>
                      handleInputChange(item._id, "rideAvailabilityTo", e.target.value)
                    }
                    className="w-full text-gray-600 border-b-2 focus:outline-none focus:border-blue-500 mb-3"
                  />
                  <input
                    type="text"
                    value={item.areaCoverage}
                    onChange={(e) =>
                      handleInputChange(item._id, "areaCoverage", e.target.value)
                    }
                    className="w-full text-gray-600 border-b-2 focus:outline-none focus:border-blue-500 mb-3"
                    placeholder="Area Coverage"
                  />
                  <textarea
                    value={item.otherFeatures}
                    onChange={(e) =>
                      handleInputChange(item._id, "otherFeatures", e.target.value)
                    }
                    className="w-full text-gray-600 border-b-2 focus:outline-none focus:border-blue-500 mb-4"
                    placeholder="Other Features"
                  ></textarea>
                  <button
                    onClick={() => handleSaveChanges(item._id)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">{item.subscriptionName}</h2>
                  <div className="text-gray-600 space-y-3 mb-6">
                    <p>Duration: {item.subscriptionDuration} days</p>
                    <p>Price: ${item.price}</p>
                    <p>
                      Ride Availability: {item.rideAvailabilityFrom} - {item.rideAvailabilityTo}
                    </p>
                    <p>Area Coverage: {item.areaCoverage}</p>
                    <p>Other Features: {item.otherFeatures}</p>
                    <button
                      onClick={() =>
                        handleSelectPlan(item._id, item.subscriptionDuration, item.price)
                      }
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Select Plan
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubscriptionPlans;

