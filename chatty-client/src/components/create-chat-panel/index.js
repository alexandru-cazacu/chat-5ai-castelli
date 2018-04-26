import React from 'react';
import Subtract from 'array-subtract';
import PersonInGroupList from 'components/person-in-group-list';
import {
    CHATTY_API_CREATE_CHAT,
    CHATTY_API_SEARCH_USERS,
    CHATTY_API_GET_USER
} from 'utils/api-requests';
import SuggestionsList from 'components/suggestions-list';
import ButtonGroup from 'components/button-group';
import store from 'store';
import { toggleCreateChatCard } from 'action-creators';
import ErrorsList from 'components/errors-list';
import close from 'images/close.svg';
import './style.css';

export default class CreateChatPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invitedPeople: [],
            suggestedPeople: [],
            searchedPerson: '',
            chatName: '',
            errorMessage: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChatCreation = this.handleChatCreation.bind(this);
        this.handleRemoveUser = this.handleRemoveUser.bind(this);
    }

    handleChatCreation() {
        var errorMessages = [];
        if (!this.state.chatName) {
            errorMessages.push('Chose a Chat name');
        }
        if (this.state.invitedPeople.length === 0) {
            errorMessages.push('Add at least one person');
        }
        if (errorMessages.length !== 0) {
            this.setState({ errorMessage: errorMessages });
            return;
        }

        CHATTY_API_CREATE_CHAT(this.state.chatName, this.state.invitedPeople)
            .then(() => store.dispatch(toggleCreateChatCard(false)))
            .catch((error) => console.log(error));
    }

    handleRemoveUser(username) {
        var invitedPeople = this.state.invitedPeople;
        var newInvitedPeople = [];

        for (var i = 0; i < invitedPeople.length; i++) {
            if (invitedPeople[i].username !== username) {
                newInvitedPeople.push(invitedPeople[i]);
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

        CHATTY_API_SEARCH_USERS(e.target.value, 'compact')
            .then((result) => {
                var subtract = new Subtract((itemA, itemB) => { return itemA.username === itemB.username; });
                result = subtract.sub(result.data, this.state.invitedPeople);
                this.setState({ suggestedPeople: result });
            })
            .catch();
    }

    render() {
        var invitedPeople = this.state.invitedPeople.map((value) =>
            <PersonInGroupList
                key={value.username}
                username={value.username}
                onRemoveUser={this.handleRemoveUser}
            />
        );

        if (this.props.visible)
            return (
                <div className="floating-card-container">
                    <div className="floating-card">
                        <img src={close} className="close-button-img" onClick={() => store.dispatch(toggleCreateChatCard(false))} alt="Close panel" />
                        <h1>New Chat</h1>
                        <div className="space"></div>

                        <div className="half-padded-left">
                            <input
                                type="text"
                                name="chatName"
                                placeholder="Chat name..."
                                value={this.state.chatName}
                                onChange={this.handleChange}
                                className="input-field"
                            />
                        </div>

                        <div className="half-padded-right">
                            <div className="suggestions-list-container">
                                <input
                                    type="text"
                                    name="searchedPerson"
                                    placeholder="Add a person..."
                                    value={this.state.searchedPerson}
                                    onChange={this.handleChange}
                                    onKeyPress={this.handleSubmit}
                                    className="input-field"
                                />
                            </div>

                            <SuggestionsList suggestions={this.state.suggestedPeople} />
                        </div>
                        <div className="space"></div>
                        <h3>Invited people</h3>
                        <div className="space"></div>
                        <div>{invitedPeople}</div>

                        <ButtonGroup
                            buttons={[
                                {
                                    label: 'Cancel',
                                    onClick: () => store.dispatch(toggleCreateChatCard(false))
                                },
                                {
                                    label: 'Confirm',
                                    onClick: this.handleChatCreation
                                }
                            ]} />
                        <ErrorsList errorsList={this.state.errorMessage} />
                    </div>
                </div>
            );
        else
            return null;
    }
}
