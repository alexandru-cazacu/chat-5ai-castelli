import React, { Component } from 'react';
import './App.css';
import './proto.css';

import ChatPage from './pages/chat';
import NewChatCard from './pages/new-chat-card';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateGroupPanel: false
        };

        this.handleCreateGroup = this.handleCreateGroup.bind(this);
        this.handleCloseGroup = this.handleCloseGroup.bind(this);
    }

    handleCreateGroup() {
        this.setState({ showCreateGroupPanel: true });

        console.log('Opened');
    }

    handleCloseGroup() {
        this.setState({ showCreateGroupPanel: false });

        console.log('Closed');
    }

    render() {
        return (
            <div className="App">
                <ChatPage />
                <button onClick={this.handleCreateGroup}>new Group</button>
                {this.state.showCreateGroupPanel && <NewChatCard onCloseCreateChatPanel={this.handleCloseGroup} />}
            </div>
        );
    }
}

export default App;
