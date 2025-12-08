import React from 'react';


import { Navigate, useLocation } from 'react-router';
import useAuth from '../hook/useAuth';
import LoadingSpinner from '../Component/LoadingSpinner/LoadingSpinner';

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    console.log(location)
    const {user,loading} = useAuth();
    if(loading) return <LoadingSpinner></LoadingSpinner>

    if(!user){
        return <Navigate state={location.pathname} to='/login'>Login</Navigate>
    }
   return children;
};

export default PrivateRoutes;
