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
        var messages = this.props.messagesList;

        if (this.props.currentOpenChatID) {
            var prevDate = moment('', 'YYYY-MM-DD');
            for (var i = 0; i < messages.length; i++) {
                var currDate = moment(messages[i].timestamp, 'YYYY-MM-DD');
                var diffDays = currDate.diff(prevDate, 'days');

                if (diffDays !== 0) {
                    messages.splice(i, 0, {
                        content: currDate.format('DD MMM'),
                        type: 'System',
                    });
                    i++;
                }

                prevDate = currDate;
            }
        }

        if (this.props.currentOpenChatId)
            return (
                <div className="chat-container">
                    <div className="chat-container-header">
                        <h3 className="title">{this.props.currentOpenChatId}</h3>
                    </div>
                    <MessagesList
                        messages={this.props.messagesList}
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
    currentOpenChatId: PropTypes.object,
    messagesList: PropTypes.array,
    chatsList: PropTypes.array,
    currentUser: PropTypes.object,
};
