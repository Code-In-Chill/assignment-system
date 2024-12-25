import React from 'react';
import Header from "./header/Header";

const AssignmentSystem = ({children}) => {
    return (
        <>
            <Header/>

            {children}
        </>
    );
};

export default AssignmentSystem;