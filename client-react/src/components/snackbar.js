import React from 'react';
import '../styles/snackbar.css';

export default class Snackbar extends React.Component {
    render() {
        return (
            <div className="snackbar">
                <p className="text">{this.props.text}</p>
            </div>
        )
    }
}
