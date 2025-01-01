import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/auth", 
    withCredentials: true,
  });

  export const registerUser = (userInfo) => API.post("/register", userInfo);
  export const loginUser=(userInfo)=>API.post("/login",userInfo);
  export const authUser=()=>API.get('/auth')
  export const verifyOtp=(otp)=>API.post('/verifyOtp',otp)
  export const logOut=()=>API.post('/logout');
  