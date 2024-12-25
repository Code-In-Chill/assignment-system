import './App.css';
import {useEffect} from "react";
import useLocalStorage from "./utils/useLocalStorage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Homepage from "./components/homepage/Homepage";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AssignmentView from "./components/assignment-view/AssignmentView";
import Callback from "./components/callback/Callback";
import AssignmentSystem from "./components/AssignmentSystem";
import AssignmentCard from "./components/assignment-view/AssignmentCard";

function App() {

    const [token] = useLocalStorage("", "token")

    useEffect(() => {
    }, [token]);

    return (
        <AssignmentSystem>
            <Routes>
                <Route path={"dashboard"} element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                }/>
                <Route path={`/assignments/:id`} element={
                    <PrivateRoute>
                        <AssignmentView/>
                    </PrivateRoute>
                }>

                </Route>
                <Route path={"card"} element={<AssignmentCard/>}/>
                <Route path={"callback"} element={<Callback/>}/>
                <Route path={"/"} element={<Homepage/>}/>
            </Routes>
        </AssignmentSystem>
    );
}

export default App;
