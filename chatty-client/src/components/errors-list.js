import React from "react";
import "../styles/errors-list.css";

export default function ErrorsList(errors) {
    if (errors && errors[0]) {
        var errorsList = errors.map((error) => {
            return <li key={error}>{error}</li>;
        });
        return (
            <ul className='errors-list'>
                {errorsList}
            </ul>
        );
    }
    else
        return null;
}
