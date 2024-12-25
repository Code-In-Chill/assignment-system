import React, {useEffect, useState} from 'react';
import useLocalStorage from "../../utils/useLocalStorage";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [token, setToken] = useLocalStorage("", "token");
    const [idToken, setIdToken] = useLocalStorage("", "idToken");
    const [assignments, setAssignments] = useState(null);

    function createAssignment() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        fetch("http://localhost:9789/api/assignments/create", {
            headers: myHeaders,
            method: "post",
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject("You don't have permission to create an assignment");
                }
            })
            .then((assignment) => {
                window.location.href = `/assignments/${assignment.id}`;
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/realms/Assignment/protocol/openid-connect/userinfo", requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    setToken("")
                    window.location.href = "login";
                } else {
                    console.log("valid token")
                }
            })
    }, []);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:9789/api/assignments", requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    return Promise.reject();
                }
            })
            .then(assignmentsData => {
                setAssignments(assignmentsData)
            })
            .catch(() => {
                alert("No resource found!!!")
            })
    }, []);

    function handleLogout() {
        const redirectUri = "http://localhost:3000/callback?logout=true";
        window.location.href = `http://localhost:8080/realms/Assignment/protocol/openid-connect/logout?`+
            `id_token_hint=${encodeURI(idToken)}`+
            `&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;
    }

    return (
        <div className={"Dashboard"} style={{marginTop: "2em"}}>
            {assignments ? assignments.map((assignment) =>
                <div key={assignment.id}>
                    <Link to={`/assignments/${assignment.id}`}>
                        Assignment id: {assignment.id}
                    </Link>
                </div>) : <></>}
            <button onClick={createAssignment}>
                Submit New Assignment
            </button>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;