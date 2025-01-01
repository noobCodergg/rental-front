import React, { useState } from "react";
import InputForm from "../Components/Forms/InputForm";
import { Link } from "react-router-dom";

function Registration() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: localStorage.getItem("role"),
    phone: "",
    profile_photo: "",
    cover_photo: "",
    gender: "",
    religion: "",
    bio: "",
    rating:0,
    rating_score:0,
    total_rating:0,
    subscriptionId:"",
    subscriptionCreated:"",
    nid:""
  });

  const attributes = [
    {
      placeholder: "Name",
      type: "text",
      name: "name",
    },
    {
      placeholder: "Email",
      type: "email",
      name: "email",
    },

    {
      placeholder: "Nid",
      type: "text",
      name: "nid",
    },
    {
      placeholder: "Phone Number",
      type: "text",
      name: "phone",
    },
    {
      placeholder: "Password",
      type: "password",
      name: "password",
    },
    {
      placeholder: "Confirm Password",
      type: "password",
      name: "confirm_password",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register as {userInfo.role || "User"}
        </h2>
        <InputForm
          attributes={attributes}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          type={"submit"}
          value={"Sign Up"}
          className="space-y-4"
        />
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;

