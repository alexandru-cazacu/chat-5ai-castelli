import React from 'react';
import '../styles/input-field.css';

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        if (typeof this.props.onChange === 'function')
            this.props.onChange(e);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({ value: '' });
        }
        if (typeof this.props.onKeyPress === 'function')
            this.props.onKeyPress(e);
    }

    render() {
        return (
            <input
                type={this.props.type === undefined ? 'text' : this.props.type}
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
