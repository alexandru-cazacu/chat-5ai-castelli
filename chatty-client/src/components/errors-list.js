import React from 'react';
import PropTypes from 'prop-types';
import '../styles/errors-list.css';

export default class ErrorsList extends React.Component {
    render() {
        if (this.props.errorsList.length === 0) {
            return null;
        }
        else {
            var errors = this.props.errorsList.map((error, index) => {
                return <li key={index}>{error}</li>;
            });
            return (
                <ul className='errors-list'>
                    {errors}
                </ul>
            );
        }
    }
}

ErrorsList.propTypes = {
    errorsList: PropTypes.array.isRequired
};
