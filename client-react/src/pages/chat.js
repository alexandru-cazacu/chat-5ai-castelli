import React from 'react';

import Header from '../components/header';
import ChatsList from '../components/chats-list';

import './chat.css';

export default class ChatPage extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="wrapper">
                    <ChatsList />
                </div>
            </div>
        );
    }
}
