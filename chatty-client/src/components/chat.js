import React, { Component } from "react";
import "../styles/messages-list.css";
import {
    CHATTY_API_GET_MESSAGES,
    CHATTY_API_CREATE_MESSAGE,
    CHATTY_API_GET_USER
} from "../utils/api-requests";
import InputField from "./input-field";
import "react-custom-scroll/dist/customScroll.css";
import MessagesList from "./messages-list";
import moment from "moment";

import SockJS from "sockjs-client";
import Stomp from "@stomp/stompjs";

var stompClient = null;

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            currentUser: "",
            chatName: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.tick = this.tick.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props)
            this.renderMessages(nextProps.chatid);
    }

    componentDidMount() {
        this.renderMessages();
        this.interval = setInterval(this.tick, 100000);

        CHATTY_API_GET_USER()
            .then((response) => {
                this.setState({ currentUser: response.data.username });
            })
            .catch();

        var wsocket = new SockJS("http://localhost:8080/ws-chat/");
        stompClient = Stomp.over(wsocket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe("/topic/getMessages", function (greeting) {
                console.log(greeting);
            });
        });
    }

    renderMessages(chatid) {
        if (chatid === undefined)
            chatid = this.props.chatid;

        CHATTY_API_GET_MESSAGES(chatid)
            .then((response) => this.setState({ messages: response.data }))
            .catch();
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        if (e.key === "Enter") {
            var message = {
                content: this.state.value,
                type: "Text",
                username: this.state.currentUser
            };

            CHATTY_API_CREATE_MESSAGE(message, this.props.chatid)
                .then(() => this.renderMessages())
                .catch();

            stompClient.send("/app/sendMessages", {}, JSON.stringify({"name": "name"}));
        }
    }

    tick() {
        this.renderMessages();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        var messages = this.props.messages;

        if (messages !== undefined) {
            var prevDate = moment("", "YYYY-MM-DD");
            for (var i = 0; i < messages.length; i++) {
                var currDate = moment(messages[i].timestamp, "YYYY-MM-DD");
                var diffDays = currDate.diff(prevDate, "days");

                if (diffDays !== 0) {
                    messages.splice(i, 0, {
                        content: currDate.format("DD MMM"),
                        type: "System",
                    });
                    i++;
                }

                prevDate = currDate;
            }
        }

        if (this.props.chatid !== -1)
            return (
                <div className="messages-list">
                    <div className="header chat">
                        <div className="title">{this.props.chatName}</div>
                        <div className="nav">
                            <div className="item">
                                <i className="material-icons">more_vert</i>
                            </div>
                        </div>
                    </div>
                    <MessagesList messages={this.props.messages} currentUser={this.state.currentUser} />
                    <div className="input-area">
                        <InputField
                            placeholder='Type a message'
                            onChange={this.handleChange}
                            onKeyPress={this.handleSubmit}
                        />
                    </div>
                </div>
            );
        else
            return null;
    }
}
