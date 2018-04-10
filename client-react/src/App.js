import React, { Component } from 'react';

import './styles/App.css';
import './styles/proto.css';

import ChatPage from './pages/chat-page';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <ChatPage />
            </div>
        );
    }
}
