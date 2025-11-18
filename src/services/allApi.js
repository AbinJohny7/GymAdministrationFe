import axios from "axios";
import axiosConfig from "./axiosConfig";
import { Baseurl } from "./baseUrl";

export const createClient= async(reqBody)=>{
    return await axiosConfig('post',`${Baseurl}/gym`,reqBody)
}
export const getClient=async () => {
    return await axiosConfig('get',`${Baseurl}/gym`,"")
}

export const deleteClient=async (id) => {
    return await axiosConfig('delete',`${Baseurl}/gym/${id}`,{})
}
export const updateClient = async (id, reqBody) => {
    return await axiosConfig('put', `${Baseurl}/gym/${id}`, reqBody)
}