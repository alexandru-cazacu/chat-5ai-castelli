import React, { Component } from "react";
import ErrorMessage from "./error-message";
import InputField from "./input-field";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css";

import store from "../store";
import { getChatsList } from "../actions";

import { ClipLoader } from "react-spinners";

import "../styles/chats-list.css";

export default class ChatsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatsList: [],
            chatFilter: "",
            errorMessage: {
                message: "",
                icon: ""
            },
            loading: false
        };

        this.handleChatSearch = this.handleChatSearch.bind(this);
        this.updateChatsList = this.updateChatsList.bind(this);
        store.subscribe(this.updateChatsList);
    }

    componentDidMount() {
        store.dispatch(getChatsList());
    }

    updateChatsList() {
        this.setState({
            chatsList: store.getState().chatsReducer.chatsList,
            errorMessage: {
                message: store.getState().chatsReducer.errorMessage
            },
            loading: store.getState().chatsReducer.loading
        });
    }

    handleChatSearch(e) {
        this.setState({
            chatFilter: e.target.value,
            errorMessage: { message: "" }
        });
    }

    filterChats(filter) {
        var filteredChats = [];

        if (filter !== "") {
            this.state.chatsList.forEach((chat) => {
                if (chat.name.toLowerCase().includes(filter.toLowerCase()))
                    filteredChats.push(chat);
            });
            return filteredChats;
        }
        return this.state.chatsList;
    }

    render() {
        var filteredChats = this.filterChats(this.state.chatFilter);
        var chatList = filteredChats.map((chat) => {
            var usrs = "";
            for (var i = 0; i < chat.chatUsers.length; i++) {
                usrs += (i !== 0 ? ", " + chat.chatUsers[i].user.username : chat.chatUsers[i].user.username);
            }

            return (
                <div className={this.props.currentOpenChat === chat.id ? "chat-card active" : "chat-card"}
                    key={chat.uid}
                    onClick={() => this.props.onOpenChat(chat.id)}>
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
                    {this.state.loading &&
                        <div className="spinner-container">
                            <ClipLoader
                                loading={this.state.loading}
                            />
                        </div>
                    }
                    <div>
                        <ErrorMessage
                            show={this.state.errorMessage.message}
                            message={this.state.errorMessage.message}
                            icon={this.state.errorMessage.icon}
                        />
                        {chatList}
                    </div>
                </CustomScroll>
            </div>
        );
    }
}