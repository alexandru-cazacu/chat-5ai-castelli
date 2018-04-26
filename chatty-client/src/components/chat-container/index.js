import React, { Component } from 'react';
import moment from 'moment';
// import SockJS from 'sockjs-client';
// import Stomp from '@stomp/stompjs';
import store from 'store';
import { sendMessage } from 'action-creators';
import PropTypes from 'prop-types';

// Components
import InputField from 'components/common/input-field';
import MessagesList from 'components/messages-list';
import 'react-custom-scroll/dist/customScroll.css';
import './style.css';


// var stompClient = null;

export default class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // var wsocket = new SockJS('http://localhost:8080/ws-chat/');
        // stompClient = Stomp.over(wsocket);
        // stompClient.connect({}, function (frame) {
        //     stompClient.subscribe('/topic/getMessages', function (greeting) {
        //         console.log(greeting);
        //     });
        // });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        if (e.key === 'Enter') {
            var message = {
                content: this.state.value,
                type: 'Text',
                username: this.props.currentUser.data.username
            };

            store.dispatch(sendMessage(message, this.props.currentOpenChatId));
            // stompClient.send('/app/sendMessages', {}, JSON.stringify({ 'name': 'name' }));
        }
    }

    render() {
        // var messages = this.props.messagesList;
        var messages = JSON.parse(JSON.stringify(this.props.messagesList));
        var prevDate = moment('', 'YYYY-MM-DD');
        var i = 0;
        messages.forEach((message) => {
            var currentDate = moment(message.timestamp, 'YYYY-MM-DD');
            var differenceInDays = currentDate.diff(prevDate, 'days');
            var differenceInMonths = currentDate.diff(prevDate, 'months');
            if (differenceInDays !== 0 && differenceInMonths !== 0) {
                messages.splice(i, 0, {
                    content: currentDate.format('DD MMM YYYY'),
                    type: 'System',
                });
            }
            i++;
            prevDate = currentDate;
        });
        var currentOpenChatName = '';
        var usersInChat = '';

        // Gets chat title and users list to display in header.
        this.props.chatsList.forEach((chat) => {
            if (chat.id === this.props.currentOpenChatId) {
                currentOpenChatName = chat.name;
                chat.chatUsers.forEach((userUser) => {
                    usersInChat += userUser.user.username + ', ';
                });
            }
        });
        usersInChat = usersInChat.slice(0, -2);

        if (this.props.currentOpenChatId)
            return (
                <div className="chat-container">
                    <div className="chat-container-header">
                        <p className="chat-title">{currentOpenChatName}</p>
                        <p className="users-list">{usersInChat}</p>
                    </div>
                    <MessagesList
                        messages={messages}
                        currentUser={this.props.currentUser}
                    />
                    <div className="input-area">
                        <InputField
                            placeholder='Type a message...'
                            handleChange={this.handleChange}
                            handleKeyPress={this.handleSubmit}
                            resetOnSubmit={true}
                        />
                    </div>
                </div>
            );
        else
            return (
                <div className="chat-container"></div>
            );
    }
}

ChatContainer.propTypes = {
    currentOpenChatId: PropTypes.number,
    messagesList: PropTypes.array,
    chatsList: PropTypes.array,
    currentUser: PropTypes.object,
};
