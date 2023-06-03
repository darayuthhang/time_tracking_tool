import React from 'react';
import { redirect, Navigate } from "react-router-dom";
import ReactEndPoint from '../constant/ReactEndPoint';
import Cookie from '../uti/Cookie';

const ProtectedRoute = ({ children }) => {
    const accessToken = Cookie.getUser()?.accessToken;

    if (!accessToken || JSON.stringify(accessToken) === "{}") {
        return <Navigate to="/" replace={true}/>
    }
    return children;
};
export default ProtectedRoute;
