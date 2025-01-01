import React, { useContext, useEffect, useState } from "react";
import InputForm from "../Components/Forms/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

function Login() {
  const { isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();

  const fetchAuth = async () => {
    if (isAuthenticated) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAuth();
  }, [isAuthenticated]);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const attributes = [
    {
      placeholder: "Email",
      type: "email",
      name: "email",
    },
    {
      placeholder: "Password",
      type: "password",
      name: "password",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log In
        </h2>
        <InputForm
          attributes={attributes}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          type={"submit"}
          value={"Log In"}
        />
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/reglanding"
            className="text-blue-500 hover:underline font-semibold"
          >
            Create a new account here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
