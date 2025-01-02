import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/user", 
    withCredentials: true,
  });

 export const getUser=(userId)=>API.get(`/getuser/${userId}`)
 export const updateRating = (userId, rating, ratingScore, totalRating) => {
  const data = { rating, ratingScore, totalRating };  
  return API.put(`/updaterating/${userId}`, data);  
};
export const fetchAllUsers=()=>API.get('/fetchallusers')
export const updateUser=(id,updatedData)=>API.put(`/updateuser/${id}`,updatedData)
export const updateIsAvailable=(userId)=>API.put(`/updateisavailable/${userId}`)
export const getUsers=()=>API.get('/getusers')
export const deleteUser=(userId)=>API.delete(`/deleteuser/${userId}`)
export const postSuggestion=(userId,id,content,type)=>API.post('/postsuggestion',{userId,id,content,type})
