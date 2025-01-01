import React from "react";

function SignUpLogin({ type, value }) {
  return (
    <div className="mt-6">
      <button
        type={type}
        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {value}
      </button>
    </div>
  );
}

export default SignUpLogin;

