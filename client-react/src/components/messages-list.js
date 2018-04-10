import React from 'react';
import Message from './message';
import '../styles/messages-list.css';
import { getMessages, postMessage } from '../utils/rest-requests';
import InputField from './input-field';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';

export default class MessagesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            value: ''
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
            console.log(response);
            this.setState({ messages: response });
        }, () => {

        });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        if (e.key === 'Enter') {
            console.log('state');
            console.log(this.state.value);

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
        var messages = this.state.messages.map((message) => {
            return <Message message={message.content} />;
        });
        return (
            <div className="messages-list">
                <div className="header chat">
                    <div className="title">Chat title</div>
                    <div className="nav">
                        <i className="material-icons">more_vert</i>
                    </div>
                </div>
                <div className="message-area-container">
                    <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                        <div className="message-area">
                            {messages}
                        </div>
                    </CustomScroll>
                </div>
                <div className="input-area">
                    <InputField
                        placeholder='Type a message'
                        onChange={this.handleChange}
                        onKeyPress={this.handleSubmit}
                    />
                </div>
            </div>
        );
    }
}
