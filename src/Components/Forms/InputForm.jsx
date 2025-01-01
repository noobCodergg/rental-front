import React, { useState } from "react";
import CommonInput from "../Inputs/CommonInput";
import SignUpLogin from "../Buttons/SignUpLogin";
import { loginUser, registerUser } from "../../Utils/AuthApi";
import { useNavigate } from "react-router-dom";

function InputForm({ attributes, userInfo, setUserInfo, type, value }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === "Sign Up") {
      try {
        await registerUser(userInfo);
        localStorage.removeItem("role");
        navigate("/login");
      } catch (error) {
        setError(error.response?.data || "An error occurred during sign-up");
      }
    }

    if (value === "Log In") {
      try {
        await loginUser(userInfo);
        navigate("/verifyOTP");
      } catch (error) {
        setError(error.response?.data || "An error occurred during login");
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {attributes.map((item, index) => (
          <div key={index} className="space-y-2">
            <CommonInput
              attributes={item}
              value={userInfo[item.name] || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <SignUpLogin
          type={type}
          value={value}
          className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        />
      </form>
    </div>
  );
}

export default InputForm;

