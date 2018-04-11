import React from 'react';
import Message from './message';
import '../styles/messages-list.css';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import ErrorMessage from './error-message';

export default class MessagesList extends React.Component {

    render() {

        // if (this.props.messages === undefined)
        //     return null;

        var messages = this.props.messages.map((message) => {
            return <Message message={message.content} />;
        });

        return (
            <div className="message-area-container">
                <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                    <div className="message-area">
                        {messages}
                        <ErrorMessage
                            show={this.props.messages.length === 0}
                            message="There are no messages in this chat yet. Be the first one to greet your friends."
                        />
                    </div>
                </CustomScroll>
            </div>
        );
    }
}
