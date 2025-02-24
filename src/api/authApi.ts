import { Axios } from "axios"
import axiosClient from "./axiosClient"
import { appInfor } from "../constants/appInfor"

class AuthApi {
    HandleAuthentication = async (
        url : string,
        data?:any,
        method?: "get" | "post"| "put"| "delete"
    )=>{
      return await axiosClient(`${appInfor.BASE_URL}/auth${url}`,{
       method:  method ?? "get",
       data,
      })
    }

}
 const authenticationApi = new AuthApi()
 export default authenticationApi;