import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/chat", 
    withCredentials: true,
  });

export const postChat=(chat)=>API.post('/postchat',chat)
export const getChat=(id,userId)=>API.get(`/getchat/${id}/${userId}`)
export const getUser=(userId)=>API.get(`/getuser/${userId}`)
export const getUsersNames=(userIds)=>API.post('/getusername',{userIds})
export const markMessagesAsRead=(roomId)=>API.put(`/markmessagesasread/${roomId}`)
export const getChatHistory=(userId)=>API.get(`/getchathistory/${userId}`)