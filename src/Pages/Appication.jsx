import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../Context/UserContext";
import { postApplication } from "../Utils/ApplicationApi";

function Application() {
  const { landlordid, propertyid,propertyname } = useParams();
  const {userId,userName} =useContext(userContext)
  const [applicationBody, setApplicationBody] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      userId,
      landlordid,
      propertyid,
      applicationBody,
      applicationStatus,
      userName,
      propertyname
    };

    try{
        const response=await postApplication(applicationData)
        alert("Application Submitted SuccessfullY")
    }catch(err){
        console.log("Error occured")
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Apply for Property
      </h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            My ID
          </label>
          <input
            type="text"
            value={userId}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Landlord ID
          </label>
          <input
            type="text"
            value={landlordid}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Property ID
          </label>
          <input
            type="text"
            value={propertyid}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Application Body
          </label>
          <textarea
            value={applicationBody}
            onChange={(e) => setApplicationBody(e.target.value)}
            placeholder="Write your application here..."
            rows="6"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-all duration-200"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default Application;
