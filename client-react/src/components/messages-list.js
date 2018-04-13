import React from 'react';
import Message from './message';
import '../styles/messages-list.css';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import ErrorMessage from './error-message';

export default class MessagesList extends React.Component {
    render() {
        var lastUser = '';
        var messages = this.props.messages && this.props.messages.map((message) => {
            var isCompact = message.user && message.user.username === lastUser;
            lastUser = message.user && message.user.username;
            return <Message
                key={message.id}
                message={message}
                currentUser={this.props.currentUser}
                isCompact={isCompact}
            />;
        });

        return (
            <div className="message-area-container">
                <CustomScroll heightRelativeToParent="calc(100% - 56px)" keepAtBottom={true}>
                    <div className="message-area">
                        {messages}
                        <ErrorMessage
                            show={this.props.messages.length === 0}
                            message="There are no messages in this chat yet. Be the first one to greet your friends."
                            icon='tag_faces'
                        />
                    </div>
                </CustomScroll>
            </div>
        );
    }
}
