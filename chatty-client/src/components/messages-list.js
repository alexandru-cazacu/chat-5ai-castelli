import React from "react";
import Message from "./message";
import "../styles/messages-list.css";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css";
import ErrorMessage from "./error-message";
import moment from "moment";

export default class MessagesList extends React.Component {
    render() {
        var lastUser = "";
        var lastTime = "";
        var messages = this.props.messages && this.props.messages.map((message, index) => {
            var isCompact = message.user && message.user.username === lastUser;
            var currUser = message.user && message.user.username;
            var showTime = !(currUser === lastUser &&  moment(message.timestamp).format("HH:mm") === moment(lastTime).format("HH:mm"));
            lastUser = message.user && message.user.username;
            lastTime = message.timestamp;
            return <Message
                key={index}
                message={message}
                currentUser={this.props.currentUser}
                isCompact={isCompact}
                showTime={showTime}
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
