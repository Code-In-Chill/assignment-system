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

    useEffect(() => {
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
