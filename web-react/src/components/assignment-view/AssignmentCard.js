import React from 'react';
import './AssignmentCard.css';
import {Link} from "react-router-dom";

const AssignmentCard = ({assignment = assignment}) => {

    function viewAssignment() {
        window.location.href = `/assignments/${assignment.id}`;
    }

    return (
        <div className="card">
            <span className="title">{assignment.title}</span>
            <span className="desc">Assignment Description is very long that can't display normally</span>
            <div className="buttons">
                <Link target={"_blank"} rel="noopener noreferrer"
                      to={`${assignment.githubUrl}/tree/${assignment.branch}`} className="button">
                    <div className="button-text github">
                        <span>View source code on</span>
                        <span>Github</span>
                    </div>
                </Link>
                <Link target={"_blank"} rel="noopener noreferrer" to={assignment.codeReviewVideoUrl} className="button">
                    <div className="button-text youtube">
                        <span>View video review on</span>
                        <span>Youtube</span>
                    </div>
                </Link>
            </div>
            <div className="buttons">
                <Link to={`/assignments/${assignment.id}`} className="info">
                    <div className="button-text-info">
                        <span>Assignment Info</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AssignmentCard;