import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/admin", 
    withCredentials: true,
  });

  export const getSubscriptionEarning=()=>API.get('/earningsubs')
  export const getRentalEarning=()=>API.get('/earningrental')
  export const getRentalEarningUser=(userId)=>API.get(`/earningrentaluser/${userId}`)
  export const getSugg=()=>API.get('/getsugg')

