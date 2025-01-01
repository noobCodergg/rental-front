import React from "react";

function CommonInput({ attributes, value, onChange }) {
  return (
    <div className="mb-4">
      <input
        type={attributes.type}
        name={attributes.name}
        placeholder={attributes.placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default CommonInput;

