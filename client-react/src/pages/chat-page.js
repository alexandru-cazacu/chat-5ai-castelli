import React from 'react';

import Header from '../components/header';
import ChatsList from '../components/chats-list';
import CreateChatPanel from './create-chat-panel';
import Chat from '../components/chat';

import '../styles/chat-page.css';

import AuthService from '../utils/auth-service';
import withAuth from '../components/with-auth';
const Auth = new AuthService();

class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateChatPanel: false,
            chatid: -1
        };

        this.handleOpenCreateChatPanel = this.handleOpenCreateChatPanel.bind(this);
        this.handleCloseCreateChatPanel = this.handleCloseCreateChatPanel.bind(this);
        this.handleSuccessfullyCreateChat = this.handleSuccessfullyCreateChat.bind(this);
        this.handleUnsuccessfullyCreateChat = this.handleUnsuccessfullyCreateChat.bind(this);
        this.handleOpenChat = this.handleOpenChat.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleOpenCreateChatPanel() {
        this.setState({ showCreateChatPanel: true });
    }

    handleCloseCreateChatPanel() {
        this.setState({ showCreateChatPanel: false });
    }

    handleSuccessfullyCreateChat() {
        this.setState({ showCreateChatPanel: false });
    }

    handleUnsuccessfullyCreateChat() {

    }

    handleOpenChat(chatid) {
        this.setState({ chatid: chatid });
    }

    handleLogout() {
        Auth.logout();
        this.props.history.replace('/sign-in');
    }

    render() {
        return (
            <div className="App">
                <Header
                    onOpenCreateChatPanel={this.handleOpenCreateChatPanel}
                    onLogout={this.handleLogout}
                />
                <div className='fixed-body'>
                    <div className="wrapper shadow">
                        <ChatsList onOpenChat={this.handleOpenChat} />
                        {this.state.showCreateChatPanel &&
                            <CreateChatPanel
                                onCloseCreateChatPanel={this.handleCloseCreateChatPanel}
                                onSuccessfullyCreateChat={this.handleSuccessfullyCreateChat}
                                onUnsuccessfullyCreateChat={this.handleUnsuccessfullyCreateChat}
                            />}
                        <Chat chatid={this.state.chatid} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(ChatPage);
