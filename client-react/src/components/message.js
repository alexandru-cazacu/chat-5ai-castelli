import React from 'react';
import '../styles/message.css';

export default class Message extends React.Component {
    render() {

        var rowStyle = 'row';
        if (this.props.currentUser === this.props.author)
            rowStyle += ' right';
        if (this.props.shorter)
            rowStyle += ' shorter';

        return (
            <div className={rowStyle}>
                <div className={this.props.author === '' ? 'message system' : 'message'}>
                    <p className="message-author">{this.props.visibleAuthor && this.props.author}</p>
                    {this.props.message}
                </div>
            </div>
        );

    }
}
