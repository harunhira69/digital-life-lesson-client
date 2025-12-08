import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL:'http://localhost:3000',

})


const useAxiosSecue = () => {
    const navigate = useNavigate();

    const {user,handleSignOut} = useAuth();
useEffect(()=>{
     const reqInterceptor=   axiosSecure.interceptors.request.use((config)=>{
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;

    })
    const resInterceptor =axiosSecure.interceptors.response.use((response)=>{


        return response;
    },(error)=>{
        const statusCode = error.response?.status;
        if(statusCode===401 || statusCode===403){
          handleSignOut().then(()=>{
               navigate('/login');
          })
    
        }
        console.log(error)
        return Promise.reject(error);


    }
)
    return ()=>{
        axiosSecure.interceptors.request.eject(reqInterceptor);
        axiosSecure.interceptors.response.eject(resInterceptor);
    }
},[user,handleSignOut,navigate])



    return axiosSecure
};

export default useAxiosSecue;