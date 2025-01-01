import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../Utils/PostApi";
import { authContext } from "../Context/AuthContext";
import { userContext } from "../Context/UserContext";

function PropertyDetail() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [editableDetail, setEditableDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [llid, setllid] = useState();
  const { id } = useParams();
  const { role } = useContext(authContext);
  const { userId, myId } = useContext(userContext);

  const fetchPropertyDetails = useCallback(async () => {
    try {
      const response = await getPropertyById(id);
      setDetail(response?.data?.data);
      setEditableDetail(response?.data?.data);
      setMainImage(response?.data?.data?.images[0]);
      setllid(response?.data?.data.landlord_id);
    } catch (err) {
      console.error("Error fetching property details:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchPropertyDetails();
  }, [fetchPropertyDetails]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (field, value) => {
    setEditableDetail((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProperty(id, editableDetail);
      fetchPropertyDetails();
      setIsEditing(false);
      navigate(`/propertydetails/${id}`);
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Failed to update property details. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProperty(id);
      alert("Property deleted successfully.");
      navigate("/myproperties");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property. Please try again.");
    }
  };

  if (!detail) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading property details...
      </div>
    );
  }

  const handleClick = () => {
    navigate(`/chat/${llid}/${userId}`);
  };

  const handleApply = (llid, id) => {
    navigate(`/application/${llid}/${id}/${detail.propertyName}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Welcome Section */}
      <div className="bg-blue-100 rounded-lg p-6 text-center">
        <h1 className="text-5xl font-bold text-blue-900">
          {isEditing ? (
            <input
              type="text"
              value={editableDetail.propertyName}
              onChange={(e) =>
                handleInputChange("propertyName", e.target.value)
              }
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ) : (
            `Welcome to ${detail.propertyName}`
          )}
        </h1>
        <p className="text-lg text-blue-700 mt-4">
          Discover your next dream home in{" "}
          {isEditing ? (
            <input
              type="text"
              value={editableDetail.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ) : (
            detail.location
          )}{" "}
          with all the modern amenities you need.
        </p>
      </div>

      {/* Header Section */}
      <div className="lg:flex lg:items-center lg:space-x-8 mt-8">
        <div className="lg:w-1/2">
          <img
            src={mainImage}
            alt={detail.propertyName}
            className="rounded-xl shadow-xl w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {isEditing ? (
              <input
                type="text"
                value={editableDetail.propertyName}
                onChange={(e) =>
                  handleInputChange("propertyName", e.target.value)
                }
                className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ) : (
              detail.propertyName
            )}
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            {isEditing ? (
              <input
                type="text"
                value={editableDetail.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ) : (
              detail.location
            )}
          </p>
          <div className="mt-4 flex items-center">
            <span className="text-3xl font-semibold text-gray-900">
              {isEditing ? (
                <input
                  type="number"
                  value={editableDetail.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                `$${detail.price}`
              )}
            </span>
            <span className="text-lg text-gray-500 ml-2">/month</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12 bg-gray-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800">Description</h2>
        <p className="text-lg text-gray-700 mt-4">
          {isEditing ? (
            <textarea
              value={editableDetail.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              rows="5"
            />
          ) : (
            detail.description
          )}
        </p>
      </div>

      {/* Property Details Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            Property Details
          </h2>
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong className="font-semibold">Size:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editableDetail.propertySize}
                  onChange={(e) =>
                    handleInputChange("propertySize", e.target.value)
                  }
                  className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                `${detail.propertySize} sq ft`
              )}
            </li>
            <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong className="font-semibold">Rooms:</strong>{" "}
              {isEditing ? (
                <input
                  type="number"
                  value={editableDetail.roomNumber}
                  onChange={(e) =>
                    handleInputChange("roomNumber", e.target.value)
                  }
                  className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                `${detail.roomNumber} rooms`
              )}
            </li>
            <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong className="font-semibold">Category:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editableDetail.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                detail.category
              )}
            </li>
          </ul>
        </div>

        {/* Image Gallery Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            Image Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {detail.images.map((image, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer"
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Landlord Information */}
      <div className="mt-12 bg-gray-50 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-800">
          Landlord Information
        </h2>
        <div className="mt-4 space-y-2 text-lg text-gray-700">
          <p className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <strong className="font-semibold">Landlord ID:</strong>{" "}
            {detail.landlord_id}
          </p>
          <button
            onClick={() => navigate(`/myaccount/${detail.landlord_id}`)}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            View Landlord Profile
          </button>
        </div>
      </div>

      {/* Buttons for Editing and Contact */}
      {(role === "Land Lord" && myId === detail.landlord_id) && (
        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white text-lg font-semibold rounded-full shadow hover:bg-green-600 focus:outline-none transition-all duration-300"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="px-6 py-2 bg-red-500 text-white text-lg font-semibold rounded-full shadow hover:bg-red-600 focus:outline-none transition-all duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditToggle}
                className="px-6 py-2 bg-yellow-500 text-white text-lg font-semibold rounded-full shadow hover:bg-yellow-600 focus:outline-none transition-all duration-300"
              >
                Edit Details
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white text-lg font-semibold rounded-full shadow hover:bg-red-600 focus:outline-none transition-all duration-300"
              >
                Delete Property
              </button>
            </>
          )}
        </div>
      )}

      {/* Contact Button for non-Land Lord */}
      {role !== "Land Lord" && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleClick}
            className="px-8 py-3 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none transition-all duration-300"
          >
            Contact Landlord
          </button>

          <button
            onClick={() => handleApply(llid, id)}
            className="px-8 py-3 bg-green-600 text-white text-xl font-semibold rounded-full shadow-md hover:bg-green-700 focus:outline-none transition-all duration-300"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
