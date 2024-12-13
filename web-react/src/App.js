import './App.css';
import {useEffect} from "react";
import useLocalStorage from "./utils/useLocalStorage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import PrivateRoute from "./components/private-route/PrivateRoute";

function App() {

    const [token, setToken] = useLocalStorage("", "token")

    // useEffect(() => {
    //     if (!token) {
    //         const myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //
    //         const urlencoded = new URLSearchParams();
    //         urlencoded.append("grant_type", "password");
    //         urlencoded.append("client_id", "assignment-system");
    //         urlencoded.append("username", "root_assignment");
    //         urlencoded.append("password", "root");
    //         urlencoded.append("client_secret", "JYEaO2wRAwIwilxrNwhFjiBYTMlQKcHR");
    //
    //         const requestOptions = {
    //             method: "POST",
    //             headers: myHeaders,
    //             body: urlencoded,
    //             redirect: "follow"
    //         };
    //
    //         fetch("http://localhost:8080/realms/assignment/protocol/openid-connect/token", requestOptions)
    //             .then((response) => Promise.all([response.ok, response.json()]))
    //             .then(([succes, result]) => {
    //                 if (succes) {
    //                     setToken(result.access_token);
    //                 }
    //             })
    //     }
    // }, []);

    useEffect(() => {
        console.log(`Token is : ${token}`)
    }, [token]);

    return (
        <Routes>
            <Route path={"dashboard"} element={
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
            }/>
            <Route path={"login"} element={<Login/>}/>
            <Route path={"/"} element={<Homepage/>}/>
        </Routes>
    );
}

export default App;
