import React from 'react';

export default class Select extends React.Component {
    render() {
        const options = this.props.options.map((option) => <option key={option}>{option}</option>);

        return (
            <select
                name={this.props.name}
                className='input-field'
                onChange={(e) => this.props.onChange(e)}>
                <option value="" disabled selected>{this.props.placeholder}</option>
                {options}
            </select>
        );
    }
}
