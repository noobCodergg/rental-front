import React, { createContext, useState } from "react";

export const userContext = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState();
  const [userName,setUserName]=useState();
  const [myId,setMyId]=useState()
  return (
    <div>
      <userContext.Provider value={{ userId, setUserId,userName,setUserName,myId,setMyId }}>
        {children}
      </userContext.Provider>
    </div>
  );
};

export default UserContext;
