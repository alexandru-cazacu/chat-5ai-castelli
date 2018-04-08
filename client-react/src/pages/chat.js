import React from 'react';
import axios from 'axios';

import './chat.css';

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chats: [] };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8080/users/11/chats'
        })
            .then((response) => {
                this.setState({ chats: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        var chatList;

        if (this.state.chats !== undefined) {
            chatList = this.state.chats.map((value) => {
                var usrs = '';
                for (var i = 0; i < value.chatUsers.length; i++) {
                    usrs += value.chatUsers[i].user.username + ', ';
                }
                usrs = usrs.substring(0, usrs.length - 2);

                var time = '';
                var lastMessage = '';

                if (value.messages.length !== 0) {
                    //time = value.messages[value.messages.length - 1].timestamp;
                    // TODO check for other content types
                    lastMessage = value.messages[value.messages.length - 1].content;
                }

                return (
                    <div className="chat-card" key={value.uid}>
                        <img className="avatar" src="https://source.unsplash.com/dily" alt="Avatar" />
                        <p className="title">{value.name}</p>
                        <p className="subtitle1">{usrs}</p>
                        <p className="subtitle2">{lastMessage}</p>
                        <p className="status">{time}</p>
                    </div>
                );
            });
        }

        return (
            <div className="wrapper">
                <div className="header">
                    <p className="title">
                        Chatty
                    </p>
                </div>
                <div className="left-column">
                    <div className="chat-card-no-hover">
                        <input type="text" placeholder="Search..." className="input-field search" />
                    </div>
                    {chatList}
                </div>
            </div>
        );
    }
}
