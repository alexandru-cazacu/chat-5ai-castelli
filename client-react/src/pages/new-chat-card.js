import React from 'react';
import axios from 'axios';
import Subtract from 'array-subtract';

import close from '../close.svg';

export default class NewChatCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invitedPeople: [],
            suggestedPeople: [],
            currentPerson: '',
            chatName: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChatCreation = this.handleChatCreation.bind(this);
    }

    handleChatCreation() {
        axios.post('http://localhost:8080/users/11/chats', {
            chatName: this.state.chatName,
            users: this.state.invitedPeople
        })
            .then((response) => {
                console.log(response);
                this.props.onCloseCreateChatPanel();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSubmit(e) {
        if (e.key === 'Enter' && this.state.suggestedPeople.length > 0) {
            var invPeople = this.state.invitedPeople;
            invPeople.push(this.state.suggestedPeople[0]);

            this.setState({
                invitedPeople: invPeople,
                suggestedPeople: [],
                currentPerson: ''
            });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.name === 'chatName')
            return;

        axios.get('http://localhost:8080/users?searchByUsername=' + e.target.value + '&mode=compact')
            .then((response) => {

                var subtract = new Subtract((itemA, itemB) => { return itemA.username === itemB.username; });

                response.data = subtract.sub(response.data, this.state.invitedPeople);
                this.setState({ suggestedPeople: response.data });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        var suggestedPeople = [];
        if (this.state.suggestedPeople !== undefined) {
            suggestedPeople = this.state.suggestedPeople.map((value) => {
                return <li key={value.username}>{value.username}</li>;
            });
        }

        var invitedPeople = [];
        if (this.state.suggestedPeople !== undefined) {
            invitedPeople = this.state.invitedPeople.map((value) => {
                return <div key={value.username} className="line">

                    <div className="col-5">{value.username}</div>
                    <div className="col-5"><input type="checkbox" /> Admin</div>
                    <div className="circle-button">
                        <img src={close} alt="Close create chat panel"/>
                    </div>
                </div>;
            });
        }

        return (
            <div className="floating-card-container">
                <div className="floating-card">
                    <img src={close} className="close-button-img" onClick={this.props.onCloseCreateChatPanel} alt="Remove user from list" />
                    <h1>New Chat</h1>
                    <div className="space"></div>

                    <input
                        type="text"
                        name="chatName"
                        placeholder="Chat name..."
                        value={this.state.chatName}
                        onChange={this.handleChange}
                        className="input-field col-6 first" />

                    <div className="suggestions-list-container col-6 last">

                        <input
                            type="text"
                            name="currentPerson"
                            placeholder="Add a person..."
                            value={this.state.currentPerson}
                            onChange={this.handleChange}
                            onKeyPress={this.handleSubmit}
                            className="input-field" />

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
