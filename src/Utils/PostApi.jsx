import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/post", 
    withCredentials: true,
  });

  export const createProperty=(formData)=>API.post('/createproperty',formData)
  export const getAllProperties=()=>API.get('/getallproperties')
  export const getPropertyById=(id)=>API.get(`/getpropertybyid/${id}`)
  export const getPropertyByUserID = (userId) =>API.get(`/getpropertybyuserid/${userId}`)
  export const updateProperty=(id,formData)=>API.put(`/updateproperty/${id}`,formData)
  export const deleteProperty=(id)=>API.delete(`/deleteproperty/${id}`)
  export const updatePropertyStatus=(propertyid)=>API.put(`updatepropertystatus/${propertyid}`,true)

