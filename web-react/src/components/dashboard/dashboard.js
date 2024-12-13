import React from 'react';
import useLocalStorage from "../../utils/useLocalStorage";

const Dashboard = () => {
    const [token, setToken] = useLocalStorage("", "token")

    return (
        <div className={"Dashboard"}>
            {token}
        </div>
    );
};

export default Dashboard;