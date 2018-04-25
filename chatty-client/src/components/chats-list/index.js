import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import { openChat, getMessages } from 'action-creators';

// Components
import ErrorMessage from 'components/error-message';
import InputField from 'components/common/input-field';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import './style.css';

export default class ChatsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatsList: [],
            chatFilter: ''
        };

        this.handleChatSearch = this.handleChatSearch.bind(this);
    }

    handleChatSearch(e) {
        this.setState({ chatFilter: e.target.value });
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
            var usrs = '';
            if (chat.chatUsers) chat.chatUsers.map((chatUser) =>
                usrs += chatUser.user.username
            );

            return (
                <div className='chat-card'
                    key={chat.id}
                    onClick={() => store.dispatch(getMessages(chat.id))}>
                    <img className="avatar" src="https://source.unsplash.com/daily" alt="Avatar" />
                    <p className="title">{chat.name}</p>
                    <p className="subtitle1">{usrs}</p>
                    <p className="subtitle2">..</p>
                </div>
            );
        });

        return (
            <div className="chats-list-container" >
                <div className="chats-list-search">
                    <InputField placeholder='Search...' handleChange={this.handleChatSearch} />
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 64px)">
                    <div>
                        <ErrorMessage message={this.props.chatsListErrorMessage} />
                        {chatList}
                    </div>
                </CustomScroll>
            </div>
        );
    }
}

ChatsList.propTypes = {
    chatsList: PropTypes.array.isRequired,
    chatsListErrorMessage: PropTypes.array.isRequired,
    currentOpenChatID: PropTypes.number.isRequired
};
