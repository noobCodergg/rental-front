import React, { useEffect } from 'react'
import { logOut } from '../Utils/AuthApi'
import { useNavigate } from 'react-router-dom';

function LogOut() {
    const navigate=useNavigate();
    
  const handleLogout=async()=>{
    try{
        await logOut();

    }catch(error){
        console.log("Error logging out");
    }
  }

  useEffect(()=>{
    handleLogout();
  },[])
  return (
    <div>
      
    </div>
  )
}

export default LogOut
