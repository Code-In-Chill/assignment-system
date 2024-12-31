import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";
import ajax, {METHOD_GET, METHOD_PUT} from "../../services/fetchService";
import './AssignmentView.css';
import {getRolesArray} from "../../utils/jwt";

const AssignmentView = () => {

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

    function edit() {
        window.location.href = "/assignments/" + assignmentsId + "/edit"
    }

    function validateBeforeSubmit() {
        if (!assignment) {
            return false;
        }

        if (!assignment.title) {
            return false;
        }

        if (assignment.status === "Rated") {
            return false;
        }

        if (!assignment.githubUrl) {
            return false
        }

        if (!assignment.branch) {
            return false;
        }

        if (!assignment.codeReviewVideoUrl) {
            return false;
        }

        if (assignment.score) {
            return false;
        }

        return !(!assignment.feedback);
    }

    function validateBeforeEdit() {
        return assignment.status !== "Rated";
    }

    function validateBeforeRate() {
        const roles = getRolesArray(token);
        if (!roles.includes("admin") || !roles.includes("teacher"))
            return false;

        if (!assignment)
            return false;

        if (assignment.status === "Rated")
            return false;

        if (!assignment.score)
            return false;

        return !(!assignment.feedback);
    }

    useEffect(() => {
        ajax(`http://localhost:9789/api/assignments/${assignmentsId}`, METHOD_GET, token)
            .then(assignmentData => {
                setAssignment(assignmentData)
            })
            .catch((reason) => {
                window.location.href = "/dashboard"
            })
    }, []);

    return (
        <div className="assignment-view-wrapper">
            {assignment ? (
                <div className="assignment-view">

                    <div className="title-row">
                        <button
                            className="btn-back"
                            onClick={() => (window.location.href = "/dashboard")}
                        >
                            Back
                        </button>
                        <h1>{assignment.title}</h1>
                    </div>

                    <h2>Status: {assignment.status}</h2>

                    <div className="field">
                        <label>Description</label>
                        <input
                            disabled
                            type="text"
                            id="description"
                            placeholder="Description"
                            value={assignment.description || ""}
                            onChange={(e) => updateAssignment("description", e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label>Github Repository:</label>
                        <div className="field-row">
                            <input
                                disabled
                                type="url"
                                id="githubUrl"
                                placeholder="Github URL"
                                value={assignment.githubUrl || ""}
                                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                            />
                            <input
                                disabled
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
                            disabled
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
                        {!validateBeforeSubmit() &&
                            <button disabled className="btn-disabled" onClick={save}>Submit Assignment</button>}
                        {validateBeforeSubmit() &&
                            <button className="btn" onClick={save}>Submit Assignment</button>}
                        {!validateBeforeEdit() &&
                            <button disabled className="btn-disabled" onClick={edit}>Edit Assignment</button>}
                        {validateBeforeEdit() &&
                            <button className="btn" onClick={edit}>Edit Assignment</button>
                        }
                    </div>
                    <button className="btn-rated" onClick={() => (alert("Rated"))}>
                        Rating This Assignment
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AssignmentView;