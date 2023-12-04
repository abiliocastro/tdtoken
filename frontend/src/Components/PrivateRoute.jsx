import React from 'react'
import { Navigate, Outlet} from "react-router-dom";
import api from '../Api.js'

function PrivateRoute(){
    function checkSession(){
        const localStorageToken = localStorage.getItem("userId")
        console.log(localStorageToken)
        if(!localStorageToken){
            return false
        }

        return api.post('/checkSession', {
            "userId": localStorageToken
        },
        { 
            withCredentials: true
        }
        ).then(response => {
            if(response.status == 200){
                return true;
            }
        }).catch((error) => {
            console.log(error)
            return true
        })
    }
    
    return checkSession() ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute;