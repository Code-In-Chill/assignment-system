import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";
import ajax, {METHOD_GET, METHOD_PUT} from "../../services/fetchService";

const AssignmentView = () => {

    const params = useParams()
    const navigate = useNavigate()
    const assignmentsId = params.id;

    const [token] = useLocalStorage("", "token")
    const [assignment, setAssignment] = useState(null)

    function updateAssignment(prop, value) {
        setAssignment((prevAssignment) => ({
            ...prevAssignment, // Tạo bản sao của assignment hiện tại
            [prop]: value, // Cập nhật thuộc tính
        }));
    }

    function save() {
        ajax(`http://localhost:9789/api/assignments/${assignmentsId}`, METHOD_PUT, token, assignment)
            .then(assignmentData => {
                setAssignment(assignmentData)
                window.location.href = "/assignments/" + assignmentsId
            })
            .catch((reason) => {
                alert("Error on update!!!\nReason: " + reason)
                window.location.href = "/assignments/" + assignmentsId
            })
    }

    useEffect(() => {
        ajax(`http://localhost:9789/api/assignments/${assignmentsId}`, METHOD_GET, token)
            .then(assignmentData => {
                setAssignment(assignmentData)
            })
            .catch((reason) => {
                alert("No resource found!!!\nReason: " + reason)
                window.location.href = "/dashboard"
            })
    }, []);

    return (
        <div>
            <h1>Assignment {assignmentsId}</h1>

            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>
                        Github URL: <input type="url" id={"githubUrl"} value={assignment.githubUrl || ""}
                                           onChange={(e) => updateAssignment("githubUrl", e.target.value)}/>
                        Branch: <input type="text" id={"branch"} value={assignment.branch || ""}
                                       onChange={(e) => updateAssignment("branch", e.target.value)}/>
                    </h3>
                    <h3>
                        Code Review Video URL: <input type="url" id={"codeReviewVideoUrl"}
                                                      value={assignment.codeReviewVideoUrl || ""}
                                                      onChange={(e) => updateAssignment("codeReviewVideoUrl", e.target.value)}/>
                    </h3>

                    <button onClick={save}>Submit Assignment</button>
                    <button onClick={() => window.location.href = "/dashboard"}>Back to Dashboard</button>
                </>
            ) : (
                <>
                </>
            )}
        </div>
    );
};

export default AssignmentView;