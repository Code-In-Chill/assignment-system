import React, {useEffect, useState} from 'react';
import useLocalStorage from "../../utils/useLocalStorage";
import ajax, {METHOD_GET, METHOD_POST} from "../../services/fetchService";
import AssignmentCard from "../assignment-view/AssignmentCard";

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

    return (
        <div className="dashboard" style={{marginTop: "2em"}}>
            <div className="assignment-zone-wrapper">
                <div className="assignment-zone">
                    {assignments?.length ? (
                        assignments.map((as) => (
                            <AssignmentCard key={as.id} assignment={as}/>
                        ))
                    ) : (
                        <p style={{textAlign: "center", width: "100%"}}>
                            No assignments available.
                        </p>
                    )}
                </div>
            </div>

            <button className="btn-create" onClick={createAssignment}>Create Assignment</button>
        </div>
    );
};

export default Dashboard;