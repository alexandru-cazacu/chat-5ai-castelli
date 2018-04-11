import React from 'react';
import '../styles/errors-list.css';

const ErrorsList = ({errors}) => {
    const errorsList = errors.map((error) => {
        return <li key={error}>{error}</li>;
    });

    return (
        <ul className='errors-list'>
            {errorsList}
        </ul>
    );
};

export default ErrorsList;
