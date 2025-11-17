import axios from "axios";
import axiosConfig from "./axiosConfig";

export const createClient= async(reqBody)=>{
    return await axiosConfig('post','http://localhost:3000/gym',reqBody)
}
export const getClient=async () => {
    return await axiosConfig('get','http://localhost:3000/gym',"")
}

export const deleteClient=async (id) => {
    return await axiosConfig('delete',`http://localhost:3000/gym/${id}`,{})
}
export const updateClient = async (id, reqBody) => {
    return await axiosConfig('put', `http://localhost:3000/gym/${id}`, reqBody)
}