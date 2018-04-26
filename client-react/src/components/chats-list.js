import React from 'react';
import { getChats } from '../utils/rest-requests';
import ErrorMessage from './error-message';
import InputField from './input-field';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';

import '../styles/chats-list.css';

export default class ChatsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredChatsList: [],
            chatFilter: '',
            showError: false,
            errorMessage: ''
        };

        this.handleChatSearch = this.handleChatSearch.bind(this);
    }

    // ==================================================
    updateChatsList() {
        getChats((chatsList) => {
            var filteredChatsList = [];
            chatsList.data.forEach((chat) => {
                if (chat.name.includes(this.state.chatFilter))
                    filteredChatsList.push(chat);
            });

            if (chatsList.data.length === 0) {
                this.setState({
                    errorMessage: 'Be the first one to write to a friend.',
                    showError: true
                });
                return;
            }

            this.setState({
                filteredChatsList: filteredChatsList,
                showError: false
            });
        }, () => {
            this.setState({
                filteredChatsList: [],
                showError: true
            });
        });
    }

    // ==================================================
    handleChatSearch(e) {
        this.setState({ chatFilter: e.target.value });
        this.updateChatsList();
    }

    // ==================================================
    componentDidMount() {
        this.updateChatsList();
    }

    // ==================================================
    render() {
        const filteredChats = this.state.filteredChatsList;

        var chatList = filteredChats.map((chat) => {
            var usrs = '';
            for (var i = 0; i < chat.chatUsers.length; i++) {
                if (i !== 0) usrs += ', ';
                usrs += chat.chatUsers[i].user.username;
            }

            return (
                <div className="chat-card" key={chat.uid} onClick={() => this.props.onOpenChat(chat.id)}>
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
                <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                    <div>
                        <ErrorMessage show={this.state.showError} message={this.state.errorMessage} />
                        {chatList}
                    </div>
                </CustomScroll>
            </div>
        );
    }
}