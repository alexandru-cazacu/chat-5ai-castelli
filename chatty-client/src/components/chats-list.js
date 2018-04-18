import React, { Component } from "react";
import ErrorMessage from "./error-message";
import InputField from "./input-field";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css";

import store from "store";
import { getChatsList, openChat, getMessages } from "action-creators";

import "../styles/chats-list.css";

export default class ChatsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatsList: [],
            chatFilter: ""
        };

        this.handleChatSearch = this.handleChatSearch.bind(this);
    }

    handleChatSearch(e) {
        this.setState({
            chatFilter: e.target.value
        });
    }

    filterChats(filter) {
        var filteredChats = [];

        if (filter) {
            this.props.chatsList.forEach((chat) => {
                if (chat.name.toLowerCase().includes(filter.toLowerCase()))
                    filteredChats.push(chat);
            });
            return filteredChats;
        }
        return this.props.chatsList;
    }

    render() {
        var filteredChats = this.filterChats(this.state.chatFilter);
        var chatList = filteredChats.map((chat, index) => {
            var usrs = "";
            if (chat.chatUsers) chat.chatUsers.map((chatUser) =>
                usrs += chatUser.user.username
            );

            return (
                <div className={this.props.currentOpenChat === chat.id ? "chat-card active" : "chat-card"}
                    key={chat.uid}
                    onClick={() => {store.dispatch(openChat(chat.id)); store.dispatch(getMessages(this.props.currentOpenChat)); }}>
                    <img className="avatar" src="https://source.unsplash.com/daily" alt="Avatar" />
                    <p className="title">{chat.name}</p>
                    <p className="subtitle1">{usrs}</p>
                    <p className="subtitle2">..</p>
                </div>
            );
        });

        return (
            <div className="left-column" >
                <div className="chat-card-no-hover">
                    <InputField placeholder='Search...' onChange={this.handleChatSearch} />
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 64px)">
                    <div>
                        <ErrorMessage
                            show={this.props.errorMessage.message}
                            message={this.props.errorMessage}
                            icon={this.props.errorMessage.icon}
                        />
                        {chatList}
                    </div>
                </CustomScroll>
            </div>
        );
    }
}
