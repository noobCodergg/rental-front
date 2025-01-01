import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/application", 
    withCredentials: true,
  });

  export const postApplication =(applicationData)=>API.post('/postapplication',{applicationData})
  export const getMyApplications=(userId)=>API.get(`/getmyapplication/${userId}`)
  export const getApplications=(userId)=>API.get(`/getapplication/${userId}`)
  export const updateApplication=(applicationId,update)=>API.put(`updateapplication/${applicationId}`,{update})

