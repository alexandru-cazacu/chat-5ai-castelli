import React from 'react';
import axios from 'axios';

import './chats-list.css';

export default class ChatsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chats: [], chatFilter: '' };

        this.handleChatSearch = this.handleChatSearch.bind(this);
        this.getChatsList = this.getChatsList.bind(this);
    }

    getChatsList() {
        var responseData;
        axios.get('http://localhost:8080/users/11/chats')
            .then((response) => {
                console.log('response.data');
                console.log(response.data);
                responseData = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        console.log('responseData');
        console.log(responseData);
        return responseData;
    }

    handleChatSearch(e) {
        this.setState({ chatFilter: e.target.value });

        var chatsList = this.getChatsList();
        var filteredChatsList = [];

        for (var i = 0; i < chatsList.length; i++) {
            if (chatsList[i].name.includes(this.state.chatFilter)) {
                filteredChatsList.push(chatsList[i]);
            }
        }

        this.setState({ chats: filteredChatsList });
    }

    render() {
        var chatList = [];

        if (this.state.chats !== undefined) {
            chatList = this.state.chats.map((value) => {
                var usrs = '';
                for (var i = 0; i < value.chatUsers.length; i++) {
                    usrs += value.chatUsers[i].user.username + ', ';
                }
                usrs = usrs.substring(0, usrs.length - 2);

                return (
                    <div className="chat-card" key={value.uid}>
                        <img className="avatar" src="https://source.unsplash.com/dily" alt="Avatar" />
                        <p className="title">{value.name}</p>
                        <p className="subtitle1">{usrs}</p>
                        <p className="subtitle2">..</p>
                        <p className="status">.</p>
                    </div>
                );
            });
        }

        return (
            <div className="left-column">
                <div className="chat-card-no-hover">
                    <input
                        type="text"
                        value={this.state.chatFilter}
                        placeholder="Search..."
                        onChange={this.handleChatSearch}
                        className="input-field search" />
                </div>
                <div className="left-column-scrollable-area">
                    {chatList}
                </div>
            </div>
        );
    }
}