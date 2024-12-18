import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";

const AssignmentView = () => {

    const params = useParams()
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
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json")

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(assignment)
        };

        fetch(`http://localhost:9789/api/assignments/${assignmentsId}`, requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    return Promise.reject();
                }
            })
            .then(assignmentData => {
                setAssignment(assignmentData)
                alert("Updated successfully")
            })
            .catch(() => {
                alert("Error on update!!!")
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

        fetch(`http://localhost:9789/api/assignments/${assignmentsId}`, requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    return Promise.reject();
                }
            })
            .then(assignmentData => {
                setAssignment(assignmentData)
            })
            .catch(() => {
                alert("No resource found!!!")
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
                        Github URL:
                        <input type="url" id={"githubUrl"} value={assignment["githubUrl"] || ""}
                               onChange={(e) => updateAssignment("githubUrl", e.target.value)}/>
                        <input type="text" id={"branch"} value={assignment["branch"] || ""}
                               onChange={(e) => updateAssignment("branch", e.target.value)}/>
                    </h3>
                    <h3>
                        Code Review Video URL:
                        <input type="url" id={"codeReviewVideoUrl"} value={assignment["codeReviewVideoUrl"] || ""}
                               onChange={(e) => updateAssignment("codeReviewVideoUrl", e.target.value)}/>
                    </h3>

                    <button onClick={save}>Submit Assignment</button>
                </>
            ) : (
                <>
                </>
            )}
        </div>
    );
};

export default AssignmentView;