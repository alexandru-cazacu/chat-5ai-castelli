import React from 'react';
import Message from './message';
import '../styles/messages-list.css';
import { getMessages, postMessage } from '../utils/rest-requests';
import InputField from './input-field';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import Button from './button';
import ErrorMessage from './error-message';
import MessagesList from './messages-list';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            messages: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props)
            this.renderMessages(nextProps.chatid);
    }

    renderMessages(chatid) {
        getMessages(chatid, (response) => {
            this.setState({ messages: response });
        }, () => {

        });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        if (e.key === 'Enter') {
            var message = {
                content: this.state.value,
                type: 'Text',
                username: 'alex'
            };

            postMessage(message, 41, (response) => {

            }, () => {

            });
        }
    }

    render() {
        if (this.props.chatid !== -1)
            return (
                <div className="messages-list">
                    <div className="header chat">
                        <div className="title">Chat title</div>
                        <div className="nav">
                            <div className="item">
                                <i className="material-icons">more_vert</i>
                            </div>
                        </div>
                    </div>
                    <MessagesList messages={this.state.messages} />
                    <div className="input-area">
                        <InputField
                            placeholder='Type a message'
                            onChange={this.handleChange}
                            onKeyPress={this.handleSubmit}
                        />
                    </div>
                </div>
            );
        else
            return null;
    }
}
