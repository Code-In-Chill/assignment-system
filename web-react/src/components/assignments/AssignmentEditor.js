import React, {useEffect, useState} from 'react';
import ajax, {METHOD_GET, METHOD_PUT} from "../../services/fetchService";
import {useNavigate, useParams} from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";

const AssignmentEditor = () => {

    const params = useParams()
    const navigate = useNavigate()
    const assignmentsId = params.id;

    const [token] = useLocalStorage("", "token")
    const [assignment, setAssignment] = useState(null)

    function updateAssignment(prop, value) {
        setAssignment((prevAssignment) => ({
            ...prevAssignment, // Tạo bản sao của assignments hiện tại
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
        <div className="assignment-view-wrapper">
            {assignment ? (
                <div className="assignment-view">
                    <h1>Editing Assignment</h1>

                    <div className="field">
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            value={assignment.title || ""}
                            onChange={(e) => updateAssignment("title", e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="description">Description:</label>
                        <input
                            id="description"
                            value={assignment.description || ""}
                            onChange={(e) => updateAssignment("description", e.target.value)}
                        />
                    </div>

                    <hr/>

                    <div className="field">
                        <label>Github Repository:</label>
                        <div className="field-row">
                            <input
                                type="url"
                                id="githubUrl"
                                placeholder="Github URL"
                                value={assignment.githubUrl || ""}
                                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                            />
                            <input
                                type="text"
                                id="branch"
                                placeholder="Branch"
                                value={assignment.branch || ""}
                                onChange={(e) => updateAssignment("branch", e.target.value)}
                            />
                            <button
                                onClick={() => window.open(`${assignment.githubUrl}`, "_blank")}
                                disabled={!assignment.githubUrl}
                            >
                                Open
                            </button>
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="codeReviewVideoUrl">Code Review Video URL:</label>
                        <input
                            type="url"
                            id="codeReviewVideoUrl"
                            value={assignment.codeReviewVideoUrl || ""}
                            onChange={(e) => updateAssignment("codeReviewVideoUrl", e.target.value)}
                        />
                        <button
                            onClick={() => window.open(assignment.codeReviewVideoUrl, "_blank")}
                            disabled={!assignment.codeReviewVideoUrl}
                        >
                            Open
                        </button>
                    </div>

                    <hr/>

                    <div className="btn-row">
                        <button className="btn" onClick={save}>Save Changes</button>
                        <button className="btn" onClick={save}>Cancel Editing</button>
                    </div>
                    <button onClick={() => (window.location.href = "/dashboard")}>
                        Back to Dashboard
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AssignmentEditor;