import React from 'react';
import useLocalStorage from "../../utils/useLocalStorage";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {

    const [token, setToken] = useLocalStorage("", "token");

    return token ? children : <Navigate to={"/login"}/>;
};

export default PrivateRoute;