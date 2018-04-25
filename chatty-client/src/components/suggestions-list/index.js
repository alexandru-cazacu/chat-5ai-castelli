import React from 'react';
import './style.css';

export default class SuggestionsList extends React.Component {
    render() {
        var suggestions = this.props.suggestions.map((suggestion) =>
            <li key={suggestion.username}>{suggestion.username}</li>
        );
        return (
            <div>
                <ul className="suggestions-list">{suggestions}</ul>
            </div>
        );
    }
}
