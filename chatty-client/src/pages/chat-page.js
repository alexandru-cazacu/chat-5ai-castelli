import React from 'react';
import store from 'store';
import { signOut, toggleCreateChatCard, getChats, getUserDetails } from 'action-creators';
import { connect } from 'react-redux';

// Components
import PageHeader from 'components/page-header';
import ChatsList from 'components/chats-list';
import CreateChatPanel from 'components/create-chat-panel';
import ChatContainer from 'components/chat-container';
import withAuth from 'components/with-auth';
import './styles/chat-page.css';

class ChatPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleOpenChat = this.handleOpenChat.bind(this);
    }

    componentDidMount() {
        store.dispatch(getUserDetails());
        store.dispatch(getChats());
        setInterval(function () {
            store.dispatch(getChats());
        }, 50000);
    }

    handleOpenChat() {

    }

    handleSignOut() {
        store.dispatch(signOut());
        this.props.history.replace('/');
    }

    render() {
        return (
            <div className="grid-wrapper">
                <PageHeader
                    items={[{
                        label: 'Create Chat',
                        onClick: () => store.dispatch(toggleCreateChatCard(true))
                    },
                    {
                        label: 'Sign Out',
                        onClick: this.handleSignOut
                    }]}
                />
                <ChatsList
                    chatsList={this.props.chatsList}
                    errorMessage={this.props.chatsListErrorMessage}
                    loading={this.props.chatsListLoading}
                    currentOpenChatId={this.props.currentOpenChatId}
                />
                <CreateChatPanel
                    onCloseCreateChatPanel={this.handleCloseCreateChatPanel}
                    onSuccessfullyCreateChat={this.handleSuccessfullyCreateChat}
                    onUnsuccessfullyCreateChat={this.handleUnsuccessfullyCreateChat}
                    visible={this.props.showCreateChatCard}
                />
                <ChatContainer
                    currentUser={this.props.userDetails}
                    chatsList={this.props.chatsList}
                    messagesList={this.props.messagesList}
                    currentOpenChatId={this.props.currentOpenChatId}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chatsList: state.chatReducer.chatsList,
        showCreateChatCard: state.chatReducer.showCreateChatCard,
        chatsListErrorMessage: state.chatReducer.errorMessage,
        chatsListLoading: state.chatReducer.loading,
        currentOpenChatId: state.chatReducer.currentOpenChatID,
        userDetails: state.authReducer.userDetails,
        messagesList: state.messageReducer.messagesList
    };
};

export default withAuth(connect(
    mapStateToProps
)(ChatPage));
