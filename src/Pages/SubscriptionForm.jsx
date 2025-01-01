import React, { useState } from "react";
import { postSubscription } from "../Utils/SubscriptionApi";

function SubscriptionForm() {
  const [formData, setFormData] = useState({
    subscriptionName: "",
    subscriptionDuration: "",
    rideAvailabilityFrom: "",
    rideAvailabilityTo: "",
    areaCoverage: "",
    price: "",
    otherFeatures: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response=await postSubscription(formData)
        
    }catch(error){
        console.log("Error submititng data")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Subscription
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subscription Name */}
          <div>
            <label
              htmlFor="subscriptionName"
              className="block text-sm font-medium text-gray-600"
            >
              Subscription Name
            </label>
            <input
              type="text"
              id="subscriptionName"
              name="subscriptionName"
              value={formData.subscriptionName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subscription name"
            />
          </div>

          {/* Subscription Duration */}
          <div>
            <label
              htmlFor="subscriptionDuration"
              className="block text-sm font-medium text-gray-600"
            >
              Subscription Duration
            </label>
            <input
              type="text"
              id="subscriptionDuration"
              name="subscriptionDuration"
              value={formData.subscriptionDuration}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1 month, 6 months"
              required
            />
          </div>

          {/* Ride Availability From Time */}
          <div>
            <label
              htmlFor="rideAvailabilityFrom"
              className="block text-sm font-medium text-gray-600"
            >
              Ride Availability - From Time
            </label>
            <input
              type="time"
              id="rideAvailabilityFrom"
              name="rideAvailabilityFrom"
              value={formData.rideAvailabilityFrom}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Ride Availability To Time */}
          <div>
            <label
              htmlFor="rideAvailabilityTo"
              className="block text-sm font-medium text-gray-600"
            >
              Ride Availability - To Time
            </label>
            <input
              type="time"
              id="rideAvailabilityTo"
              name="rideAvailabilityTo"
              value={formData.rideAvailabilityTo}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Area Coverage */}
          <div>
            <label
              htmlFor="areaCoverage"
              className="block text-sm font-medium text-gray-600"
            >
              Area Coverage
            </label>
            <input
              type="text"
              id="areaCoverage"
              name="areaCoverage"
              value={formData.areaCoverage}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., City, State, or Region"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price in USD"
              required
            />
          </div>

          {/* Other Features */}
          <div>
            <label
              htmlFor="otherFeatures"
              className="block text-sm font-medium text-gray-600"
            >
              Other Features
            </label>
            <textarea
              id="otherFeatures"
              name="otherFeatures"
              value={formData.otherFeatures}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="List other features"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionForm;
