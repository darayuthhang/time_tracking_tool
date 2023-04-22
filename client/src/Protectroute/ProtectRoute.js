import React from 'react';
import { Navigate } from "react-router-dom";
import Cookie from '../uti/Cookie';
const ProtectedRoute = ({ children }) => {
    const accessToken = Cookie.getUser()?.accessToken;
    if (!accessToken || JSON.stringify(accessToken) === "{}") {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default ProtectedRoute;
