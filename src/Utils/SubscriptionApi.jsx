import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/subscription", 
    withCredentials: true,
  });

  export const postSubscription=(data)=>API.post('/postsubscription',{data})
  export const getSubscription=()=>API.get('/getsubscription')
  export const updateUserSubscription=(userId, subscriptionId, subscriptionCreated)=>API.put('/updatesubscription',{userId,subscriptionId,subscriptionCreated})
  export const validation=(userId)=>API.get(`/validation/${userId}`)
  export const getAvailableDriver=(userId)=>API.get(`/getavailabledriver/${userId}`)
  export const postIncome=(price)=>API.post('/postincome',{price})
  export const updatesubscription=(id,updates)=>API.put(`/update/${id}`,{updates})
 