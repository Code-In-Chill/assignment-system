import React, {useEffect, useState} from 'react';
import useLocalStorage from "../../utils/useLocalStorage";
import {Link} from "react-router-dom";
import ajax, {METHOD_GET, METHOD_POST} from "../../services/fetchService";

const Dashboard = () => {
    const [token, setToken] = useLocalStorage("", "token");
    const [idToken, setIdToken] = useLocalStorage("", "idToken");
    const [assignments, setAssignments] = useState(null);

    function createAssignment() {
        ajax("http://localhost:9789/api/assignments/create", METHOD_POST, token)
            .then((assignment) => {
                window.location.href = `/assignments/${assignment.id}`;
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        ajax("http://localhost:8080/realms/Assignment/protocol/openid-connect/userinfo", METHOD_GET, token)
            .catch((response) => {
                setToken("")
                setIdToken("")
                window.location.href = "login";
            })
    }, []);

    useEffect(() => {
        ajax("http://localhost:9789/api/assignments", METHOD_GET, token)
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