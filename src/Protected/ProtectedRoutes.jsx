import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authUser } from "../Utils/AuthApi";
import { userContext } from "../Context/UserContext";

const ProtectedRoutes = ({ children, roles }) => {
  const { setIsAuthenticated, setRole } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(true); 
  const [redirectPath, setRedirectPath] = useState(null); 
  const [isAuthorized, setIsAuthorized] = useState(false); 
  const navigate = useNavigate();
  const { setUserId,setUserName,setMyId } = useContext(userContext);
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await authUser();

        setIsAuthenticated(response.data.success);
        setRole(response.data.role);
        setUserId(response.data.id);
        setMyId(response.data.id)
        setUserName(response.data.name)
        if (!response.data.success) {
          setRedirectPath("/login"); 
          return;
        }

        if (!roles.includes(response.data.role)) {
          setIsAuthenticated(false);
          setRedirectPath("/unauthorized"); 
          return;
        }

        setIsAuthorized(true); 
      } catch (error) {
        console.error("Error during authentication:", error);
        setRedirectPath("/login");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchAuth();
  }, [setIsAuthenticated, setRole, roles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (redirectPath) {
    navigate(redirectPath); 
    return null; 
  }

 
  return isAuthorized ? children : null;
};

export default ProtectedRoutes;
