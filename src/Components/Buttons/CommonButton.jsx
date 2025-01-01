import React from "react";

function CommonButton({ value, onClick }) {
  return (
    <div className="mt-4">
      <button
        onClick={onClick}
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {value}
      </button>
    </div>
  );
}

export default CommonButton;

