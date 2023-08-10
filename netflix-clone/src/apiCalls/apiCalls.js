import axios from "axios";
import {LoginStart, LoginFail, LoginSuccess} from "../authContext/authActions"
import { useEffect } from "react";


export const LoginCall = async(userCredentials, dispatch)=>{
  dispatch(LoginStart())
  try{
    const res = await axios.post("http://localhost:5000/api/auth/login", userCredentials);
    dispatch(LoginSuccess(res.data))
    console.log(res.data)
  }
  catch(err){
    dispatch(LoginFail(err))
  }

}

