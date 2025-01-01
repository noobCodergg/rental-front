import React, { useState } from "react";
import CommonInput from "../Components/Inputs/CommonInput";
import CommonButton from "../Components/Buttons/CommonButton";
import { verifyOtp } from "../Utils/AuthApi";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const attributes = {
    placeholder: "Enter OTP",
    type: "text",
    name: "otp",
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setOtp(value.trim());
    setError("");
  };

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6 || isNaN(otp)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      await verifyOtp({ otp });
      navigate("/");
    } catch (err) {
      setError("An error occurred during verification. Please try again.");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          OTP Verification
        </h1>
        <CommonInput attributes={attributes} onChange={handleChange} />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <CommonButton value={"Verify"} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default VerifyOTP;
