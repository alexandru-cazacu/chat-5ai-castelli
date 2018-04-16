import React, { Component } from "react";
import { CHATTY_API_GET_CHATS } from "../utils/api-requests";
import ErrorMessage from "./error-message";
import InputField from "./input-field";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css";

import store from "../_store";
import { getChatsList } from "../_actionCreators";

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
            }
        };

        this.handleChatSearch = this.handleChatSearch.bind(this);
    }

    componentDidMount() {
        store.dispatch(getChatsList());
    }

    updateChatsList() {
        CHATTY_API_GET_CHATS()
            .then((chatsList) => {
                if (chatsList.data.length === 0) {
                    this.setState({
                        chatsList: [],
                        errorMessage: {
                            message: "Be the first one to write to a friend.",
                            icon: "tag_faces"
                        }
                    });
                    return;
                }

                this.setState({
                    chatsList: chatsList.data,
                    errorMessage: {},
                });
            })
            .catch((error) => {
                this.setState({
                    chatsList: [],
                    errorMessage: { message: "Please check your Connection." }
                });
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