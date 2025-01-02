import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Context/AuthContext";
import { getUser, postSuggestion, updateRating, updateUser } from "../Utils/UserApi";
import { userContext } from "../Context/UserContext";
import { useParams } from "react-router-dom";

const TenantProfile = () => {
  const { role } = useContext(authContext);
  const { userId, myId } = useContext(userContext);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");
  const [coverPhotoPreview, setCoverPhotoPreview] = useState("");
  const [rating, setRating] = useState(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await getUser(id);
      setUserData(response.data);
      setCoverPhotoPreview(response.data.cover_photo || "");
      setProfilePhotoPreview(response.data.profile_photo || "");
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setUserData({ ...userData, [field]: base64String });
        if (field === "profile_photo") setProfilePhotoPreview(base64String);
        if (field === "cover_photo") setCoverPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = async () => {
    try {
      await updateUser(userId, userData);
      alert("Save Changes Successfully");
    } catch (err) {
      console.log("Error occurred", err);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitRating = async () => {
    const newRating = (userData.rating_score + rating) / (userData.total_rating + 1);
    const newTotalRating = userData.total_rating + 1;
    const newRatingScore = userData.rating_score + rating;

    try {
      await updateRating(id, newRating, newRatingScore, newTotalRating);
      setIsRatingSubmitted(true);
    } catch (err) {
      console.log("Error occurred", err);
    }
  };

  const handlePost = async (id) => {
    try {
      await postSuggestion(userId, id, "Reported", "rep");
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  if (!userData) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10 border border-gray-300">
      {/* Cover Photo Section */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-blue-500 to-indigo-600">
          {coverPhotoPreview && (
            <img
              src={coverPhotoPreview}
              alt="Cover"
              className="w-full h-64 object-cover"
            />
          )}
        </div>
        {role === "Tenant" && (
          <div className="absolute top-4 right-4">
            <label className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer shadow-md hover:bg-blue-50">
              Change Cover
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "cover_photo")}
              />
            </label>
          </div>
        )}

        {/* Profile Picture */}
        <div className="absolute bottom-[-40px] left-8 flex items-center">
          <div className="relative">
            <img
              src={
                profilePhotoPreview ||
                "https://via.placeholder.com/100?text=Upload+Photo"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
            />
            {role === "Tenant" && (
              <div className="absolute bottom-0 right-0">
                <label className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-semibold cursor-pointer shadow-md hover:bg-blue-50">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "profile_photo")}
                  />
                  ✏️
                </label>
              </div>
            )}
          </div>
          <div className="ml-4 mt-2">
            <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
            <p className="text-lg text-gray-600">{userData.role}</p>
          </div>
        </div>
      </div>

      {/* User Info Form */}
      <div className="p-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-8">Personal Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            {role === "Tenant" ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => handleChange(e, "name")}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ) : (
              <p className="text-gray-800">{userData.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Phone
            </label>
            {role === "Tenant" ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => handleChange(e, "phone")}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Gender
            </label>
            {role === "Tenant" ? (
              <select
                value={userData.gender}
                onChange={(e) => handleChange(e, "gender")}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-gray-800">
                {userData.gender || "Not specified"}
              </p>
            )}
          </div>

          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Religion
            </label>
            {role === "Tenant" ? (
              <input
                type="text"
                value={userData.religion}
                onChange={(e) => handleChange(e, "religion")}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ) : (
              <p className="text-gray-800">
                {userData.religion || "Not specified"}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Bio
          </label>
          {role === "Tenant" ? (
            <textarea
              value={userData.bio}
              onChange={(e) => handleChange(e, "bio")}
              rows="4"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          ) : (
            <p className="text-gray-800">
              {userData.bio || "No bio available"}
            </p>
          )}
        </div>

        {/* Account Details */}
        <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
          Account Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <p className="text-gray-800">{userData.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Rating
            </label>
            <p className="text-gray-800">{userData.rating} / 5</p>
          </div>
        </div>

        {/* Rating Section */}
        {!isRatingSubmitted && role !== "Tenant" && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Rate This User
            </h2>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Submit Rating Button */}
            <div className="mt-4">
              <button
                onClick={submitRating}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
              >
                Submit Rating
              </button>
            </div>
          </div>
        )}
      </div>
      {myId !== id && (
        <button
          onClick={() => handlePost(userData._id)}
          className="px-6 py-2 m-6 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600"
        >
          Report This User
        </button>
      )}
      {/* Save Button */}
      {role === "Tenant" && myId === id && (
        <div className="bg-gray-100 p-4 text-right">
          <button
            onClick={saveChanges}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default TenantProfile;

