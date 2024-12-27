import React from 'react';
import "./Homepage.css";
import {Link} from "react-router-dom";

const Homepage = () => {
    return (
        <div className={"Homepage"}>
            <div className="polygon">
                <h1>Welcome to Assignment System</h1>
                <h3>This is a system for managing assignments of students.</h3>
                <h3><Link to={"/dashboard"}>Click here to go to the dashboard</Link></h3>
            </div>
        </div>
    );
};

export default Homepage;