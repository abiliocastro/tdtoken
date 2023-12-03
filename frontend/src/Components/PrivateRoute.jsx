import { useState } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }){
    const [logged, setLogged] = useState(localStorage.getItem("userId"))

    return logged ? children : <Navigate to="/" />
}

export default PrivateRoute;