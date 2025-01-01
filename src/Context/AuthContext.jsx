import React, { createContext, useState } from "react";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(); 
  const [role, setRole] = useState(); 

  return (
    <authContext.Provider value={{ setIsAuthenticated,isAuthenticated,setRole,role}}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

