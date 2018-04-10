import React from 'react';
import '../styles/message.css';

export default class Message extends React.Component {
    render() {
        return (
            <div className="row">
                <img className="avatar" src="https://source.unsplash.com/daily" />
                <p className="message">{this.props.message}</p>
            </div>
        );
    }
}
