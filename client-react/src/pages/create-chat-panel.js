import React from 'react';
import axios from 'axios';
import Subtract from 'array-subtract';

import PersonInGroupList from '../components/personInGroupList';
import { postChat, getUsersBySearch } from '../utils/rest-requests';

import close from '../images/close.svg';

import '../styles/create-chat-panel.css';

export default class CreateChatPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invitedPeople: [],
            suggestedPeople: [],
            searchedPerson: '',
            chatName: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChatCreation = this.handleChatCreation.bind(this);
        this.handleRemoveUser = this.handleRemoveUser.bind(this);
    }

    handleChatCreation() {

    }

    handleRemoveUser(username) {
        console.log(username);
        var invitedPeople = this.state.invitedPeople;
        console.log(invitedPeople);
        var newInvitedPeople = [];

        for (var i = 0; i < invitedPeople.length; i++) {
            if (invitedPeople[i].username !== username) {
                newInvitedPeople.push(invitedPeople[i]);
                console.log(username);
            }
        }

        this.setState({ invitedPeople: newInvitedPeople });
    }

    handleSubmit(e) {
        if (e.key === 'Enter' && this.state.suggestedPeople.length > 0) {
            var invPeople = this.state.invitedPeople;
            invPeople.push(this.state.suggestedPeople[0]);

            this.setState({
                invitedPeople: invPeople,
                suggestedPeople: [],
                searchedPerson: ''
            });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.name === 'chatName') return;

        getUsersBySearch(e.target.value, (data) => {
            var subtract = new Subtract((itemA, itemB) => { return itemA.username === itemB.username; });
            data = subtract.sub(data, this.state.invitedPeople);
            this.setState({ suggestedPeople: data });
        }, () => {

        });
    }

    render() {
        var suggestedPeople = this.state.suggestedPeople.map((value) =>
            <li key={value.username}>{value.username}</li>
        );

        var invitedPeople = this.state.invitedPeople.map((value) =>
            <PersonInGroupList
                key={value.username}
                username={value.username}
                onRemoveUser={this.handleRemoveUser}
            />
        );

        return (
            <div className="floating-card-container">
                <div className="floating-card">
                    <img src={close} className="close-button-img" onClick={this.props.onCloseCreateChatPanel} alt="Close panel" />
                    <h1>New Chat</h1>
                    <div className="space"></div>

                    <input
                        type="text"
                        name="chatName"
                        placeholder="Chat name..."
                        value={this.state.chatName}
                        onChange={this.handleChange}
                        className="input-field col-6 first"
                    />

                    <div className="suggestions-list-container col-6 last">
                        <input
                            type="text"
                            name="searchedPerson"
                            placeholder="Add a person..."
                            value={this.state.searchedPerson}
                            onChange={this.handleChange}
                            onKeyPress={this.handleSubmit}
                            className="input-field"
                        />

                        <ul className="suggestions-list">{suggestedPeople}</ul>
                    </div>
                    <div className="space"></div>
                    <h3>Invited</h3>
                    <div className="space"></div>
                    <div>{invitedPeople}</div>
                    <div className="button-container">
                        <button className="button" onClick={this.props.onCloseCreateChatPanel}>Cancel</button>
                        <div className="space-v"></div>
                        <button className="button" onClick={this.handleChatCreation}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }
}
