import React, {useEffect, useState} from 'react';
import useLocalStorage from "../../utils/useLocalStorage";

const Dashboard = () => {
    const [token, setToken] = useLocalStorage("", "token");
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
                }
            })
            .then((assignment) => {
                window.location.href = `/assignments/${assignment.id}`;
            })
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

    return (
        <div className={"Dashboard"} style={{marginTop: "2em"}}>
            <button onClick={() => {
                createAssignment()
            }}>Submit New Assignment
            </button>
        </div>
    );
};

export default Dashboard;