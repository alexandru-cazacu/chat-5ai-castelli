import React from 'react';
import store from 'store';
import { signOut, toggleCreateChatCard, getChats } from 'action-creators';
import { connect } from 'react-redux';

// Components
import HeaderWithDrawer from 'components/header-with-drawer';
import ChatsList from 'components/chats-list';
import CreateChatPanel from 'components/create-chat-panel';
import Chat from 'components/chat';
import withAuth from 'components/with-auth';
import './styles/chat-page.css';

class ChatPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleOpenChat = this.handleOpenChat.bind(this);
    }

    componentDidMount() {
        store.dispatch(getChats());
    }

    handleOpenChat() {

    }

    handleSignOut() {
        store.dispatch(signOut());
        this.props.history.replace('/');
    }

    render() {
        return (
            <div className="App">
                <HeaderWithDrawer
                    items={[{
                        name: 'Create Chat',
                        callback: () => store.dispatch(toggleCreateChatCard(true))
                    },
                    {
                        name: 'Sign Out',
                        callback: this.handleSignOut
                    }]}
                />
                <div className='fixed-body'>
                    <div className="wrapper shadow">
                        <ChatsList
                            chatsList={this.props.chatsList}
                            errorMessage={this.props.errorMessage}
                            loading={this.props.loading}
                            currentOpenChatID={this.props.currentOpenChatID}
                        />
                        <CreateChatPanel
                            onCloseCreateChatPanel={this.handleCloseCreateChatPanel}
                            onSuccessfullyCreateChat={this.handleSuccessfullyCreateChat}
                            onUnsuccessfullyCreateChat={this.handleUnsuccessfullyCreateChat}
                            visible={this.props.showCreateChatCard}
                        />
                        <Chat
                            user={this.props.user}
                            chatsList={this.props.chatsList}
                            messagesList={this.props.messagesList}
                            currentOpenChatID={this.props.currentOpenChatID}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chatsList: state.chatReducer.chatsList,
        showCreateChatCard: state.chatReducer.showCreateChatCard,
        errorMessage: state.chatReducer.errorMessage,
        loading: state.chatReducer.loading,
        currentOpenChatID: state.chatReducer.currentOpenChatID,
        messagesList: state.messageReducer.messagesList,
        user: state.authReducer.user
    };
};

export default withAuth(connect(
    mapStateToProps
)(ChatPage));
