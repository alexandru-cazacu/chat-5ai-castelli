import React, { Component } from 'react';
import './App.css';

import ChatPage from './pages/chat';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ChatPage />
            </div>
        );
    }
}

export default App;
