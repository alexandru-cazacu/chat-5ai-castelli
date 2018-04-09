import React from 'react';

import Header from '../components/header';
import ChatsList from '../components/chats-list';
import CreateChatPanel from './create-chat-panel';
import Snackbar from '../components/snackbar';

import '../styles/chat.css';

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateChatPanel: false
        };

        this.handleOpenCreateChatPanel = this.handleOpenCreateChatPanel.bind(this);
        this.handleCloseCreateChatPanel = this.handleCloseCreateChatPanel.bind(this);
        this.handleSuccessfullyCreatedGroup = this.handleSuccessfullyCreatedGroup.bind(this);
        this.handleUnsuccessfullyCreatedChat = this.handleUnsuccessfullyCreatedChat.bind(this);
    }

    handleOpenCreateChatPanel() {
        this.setState({ showCreateChatPanel: true });
    }

    handleCloseCreateChatPanel() {
        this.setState({ showCreateChatPanel: false });
    }

    handleSuccessfullyCreatedGroup() {
        console.log('Created successfully');
    }

    handleUnsuccessfullyCreatedChat() {
        console.log('Created unsuccessfully');
    }

    render() {
        return (
            <div className="App">
                <Header onOpenCreateChatPanel={this.handleOpenCreateChatPanel} />
                <div className="wrapper">
                    <ChatsList />
                    {this.state.showCreateChatPanel &&
                        <CreateChatPanel
                            onCloseCreateChatPanel={this.handleCloseCreateChatPanel}
                            onSuccessfullyCreatedGroup={this.handleSuccessfullyCreatedGroup}
                            onUnsuccessfullyCreatedChat={this.handleUnsuccessfullyCreatedChat}
                        />}
                    <Snackbar text='Please check your Internet connection.' />
                </div>
            </div>
        );
    }
}
