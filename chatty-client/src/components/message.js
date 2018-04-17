import React from 'react';
import '../styles/message.css';
import moment from 'moment';

export default class Message extends React.Component {
    render() {
        var messageTypeStyle = '';
        var messageAuthor = '';
        var messageTime = '';
        var messageAuthorStyle = 'message-author';

        if (this.props.message.type === 'Text') {
            messageTypeStyle = 'message text';
            messageTime = moment(this.props.message.timestamp).format('HH:mm');

            if (this.props.message.user) {
                if (this.props.message.user.username === this.props.currentUser) {
                    messageTypeStyle += ' self';
                }
                else {
                    messageTypeStyle += ' other';
                    messageAuthor = !this.props.isCompact && this.props.message.user.username;
                }
            }
            else {
                messageAuthor = 'Anonymous';
                messageTypeStyle += ' other';
                messageAuthorStyle += ' del';
            }
        }

        if (this.props.message.type === 'System') {
            messageTypeStyle = 'message system grey';
        }

        if (this.props.isCompact)
            messageTypeStyle += ' compact';

        return (
            <div className='message-row' >
                <div className={messageTypeStyle}>
                    <p className={messageAuthorStyle}>{messageAuthor}</p>
                    {this.props.message.content}
                    {this.props.showTime && <p className="message-time">{messageTime}</p>}
                </div>
            </div>
        );
    }
}

