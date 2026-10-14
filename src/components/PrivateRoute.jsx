import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ publicPage = false, adminOnly = false }) {
  
    const {user} = useSelector((state)=> state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN")
    console.log(user);
    console.log(isAdmin);
    console.log("Hello")

    if(publicPage){
        return user ? <Navigate to="/"/> : <Outlet />
    }

    if(adminOnly){
        if(!isAdmin){
            return <Navigate to="/"/>
        } 
        return <Outlet />
    }


  
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute