import React from 'react';

import Header from '../components/header';
import ChatsList from '../components/chats-list';
import CreateChatPanel from './create-chat-panel';
import MessagesList from '../components/messages-list';

import '../styles/chat.css';

export default class ChatPage extends React.Component {

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
    }

    handleOpenCreateChatPanel() {
        this.setState({ showCreateChatPanel: true });
    }

    handleCloseCreateChatPanel() {
        this.setState({ showCreateChatPanel: false });
    }

    handleSuccessfullyCreateChat() {
        console.log('Created successfully');
        this.setState({ showCreateChatPanel: false });
    }

    handleUnsuccessfullyCreateChat() {
        console.log('Created unsuccessfully');
    }

    handleOpenChat(chatid) {
        console.log(chatid);
        this.setState({ chatid: chatid });
    }

    render() {
        return (
            <div className="App">
                <Header onOpenCreateChatPanel={this.handleOpenCreateChatPanel} />
                <div className='fixed-body'>
                    <div className="wrapper shadow">
                        <ChatsList onOpenChat={this.handleOpenChat} />
                        {this.state.showCreateChatPanel &&
                            <CreateChatPanel
                                onCloseCreateChatPanel={this.handleCloseCreateChatPanel}
                                onSuccessfullyCreateChat={this.handleSuccessfullyCreateChat}
                                onUnsuccessfullyCreateChat={this.handleUnsuccessfullyCreateChat}
                            />}
                        <MessagesList chatid={this.state.chatid} />
                    </div>
                </div>
            </div>
        );
    }
}
