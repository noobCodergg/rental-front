import React from "react";
import { Link } from "react-router-dom";

function RegLanding() {
  const attributes = [
    { header: "Land Lord" },
    { header: "Tenant" },
    { header: "Driver" },
  ];

  const handleClick = (role) => {
    localStorage.setItem("role", role);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Choose Your Role
      </h1>
      <div className="grid grid-cols-1 gap-6 w-64">
        {attributes.map((item, index) => (
          <div key={index}>
            <Link
              to="/registration"
              onClick={() => handleClick(item.header)}
              className="block text-center bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              {item.header}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegLanding;
