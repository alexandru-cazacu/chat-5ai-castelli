import React from 'react';
import '../styles/error-message.css';

export default class ErrorMessage extends React.Component {
    render() {
        if (this.props.show)
            return (
                <div className="error">
                    <i className="material-icons">{this.props.icon || 'error_outline'}</i>
                    <p>{this.props.message}</p>
                </div>
            );
        else
            return null;
    }
}
