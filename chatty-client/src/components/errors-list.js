import React from "react";
import "../styles/errors-list.css";

const ErrorsList = ({ errors }) => {
    var errorsList = [];
    errorsList = errors.map((error) => {
        return <li key={error}>{error}</li>;
    });

    if (errors[0] !== "")
        return (
            <ul className='errors-list'>
                {errorsList}
            </ul>
        );
    else
        return null;
};

export default ErrorsList;
