import React from 'react';
import './style.css';

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        if (typeof this.props.handleChange === 'function') this.props.handleChange(e);
    }
    
    handleKeyPress(e) {
        if (typeof this.props.handleKeyPress === 'function') this.props.handleKeyPress(e);
    }

    render() {
        return (
            <input
                type={!this.props.type ? 'text' : this.props.type}
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                className="input-field"
            />
        );
    }
}
