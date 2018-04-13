import React from 'react';
import '../styles/message.css';
import moment from 'moment';

export default class Message extends React.Component {
    render() {
        var messageTypeStyle = '';
        var messageAuthor = '';
        var messageTime = '';

        if (this.props.message.type === 'Text') {
            messageTypeStyle = 'text-message';
            messageTime = moment(this.props.message.timestamp).format('HH:mm');
            if (this.props.message.user.username === this.props.currentUser) {
                messageTypeStyle += ' self';
            }
            else {
                messageTypeStyle += ' other';
                messageAuthor = !this.props.isCompact && this.props.message.user.username;
            }
            if (this.props.isCompact)
                messageTypeStyle += ' compact';
        }
        if (this.props.message.type === 'System') {
            messageTypeStyle = 'system-message grey';
        }

        return (
            <div className='message-row'>
                <div className={messageTypeStyle}>
                    <p className="message-author">{messageAuthor}</p>
                    {this.props.message.content}
                    <p className="message-time">{messageTime}</p>
                </div>
            </div>
        );
    }
}
