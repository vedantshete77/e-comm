import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";  

const PrivateCommponent=()=>{
    const auth=localStorage.getItem('user');
    return auth?<Outlet />:<Navigate to="/signup" />
}

export default PrivateCommponent