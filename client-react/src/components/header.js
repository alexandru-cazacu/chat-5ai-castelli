import React from 'react';

import '../styles/header.css';

export default class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <div className="wrapper">
                    <div className="title">Chatty</div>
                    <div className="nav">
                        <i className="material-icons" onClick={this.props.onOpenCreateChatPanel}>add</i>
                        <i className="material-icons">account_circle</i>
                    </div>
                </div>
            </div>
        );
    }
}