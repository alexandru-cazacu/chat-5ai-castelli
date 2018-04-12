import React from 'react';
import '../styles/message.css';

export default class Message extends React.Component {
    render() {
        return (
            <div className={this.props.currentUser === this.props.author ? 'row right' : 'row'}>
                <div className="message">
                    <p className="message-author">{this.props.visibleAuthor && this.props.author}</p>
                    {this.props.message}
                </div>
            </div>
        );

    }
}
