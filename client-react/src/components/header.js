import React from 'react';

import '../styles/header.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="wrapper">
                    <div className="title">Chatty</div>
                    <div className="nav">
                        <div className="item" onClick={this.props.onOpenCreateChatPanel}>
                            <i className="material-icons">add</i>
                            <p className="text">New Chat</p>
                        </div>
                        <div className="item">
                            <i className="material-icons">account_circle</i>
                            <p className="text">Account</p>
                        </div>
                        <div className="item" onClick={this.props.onLogout}>
                            <i className="material-icons">exit_to_app</i>
                            <p className="text">Log out</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}