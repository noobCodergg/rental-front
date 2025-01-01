import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/ride", 
    withCredentials: true,
  });

  export const postRideRequest=(userName,userId,id,pending)=>API.post('/postride',{userName,userId,id,pending})
  export const updateAvailability=(id)=>API.put(`/updateavailability/${id}`)
  export const getRequest=(userId)=>API.get(`/getrequest/${userId}`)
  export const updateIsRead=(id)=>API.put(`/updateisread/${id}`)
  export const updateRideStatus=(id,data)=>API.put(`/updateridestatus/${id}`,{data})
  export const getRequestStatus=(userId)=>API.get(`/getrequeststatus/${userId}`)
  export const postSchedule=(driverId,userId,time,rideStatus)=>API.post('/posttime',{driverId,userId,time,rideStatus})
  export const getSchedule=(userId)=>API.get(`/getschedule/${userId}`)
  export const updateTimeStatus=(id)=>API.put(`/updatetimestatus/${id}`)
  export const postHistory=(driverId,userId)=>API.post('/posthistory',{driverId,userId})
  export const getRideHistory=(userId)=>API.get(`/getriderdetail/${userId}`)