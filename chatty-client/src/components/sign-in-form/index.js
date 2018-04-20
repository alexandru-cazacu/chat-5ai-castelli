import React from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'action-creators';
import store from 'store';
import InputField from 'components/common/input-field';
import Button from 'components/common/button';
import ErrorsList from 'components/errors-list';
import './style.css';

export default class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit() {
        store.dispatch(signIn({
            username: this.state.username,
            password: this.state.password
        }));
    }

    render() {
        console.log(this.props.errorsList);
        return (
            <div className="centered-card">
                <h1 className='card-title'>Sign In</h1>
                <InputField
                    name='username'
                    placeholder='Username...'
                    handleChange={this.handleChange}
                />
                <InputField
                    name='password'
                    type='password'
                    placeholder='Password...'
                    handleChange={this.handleChange}
                />
                <Button
                    label={this.props.loading ? 'Signing In...' : 'Sign In'}
                    handleClick={this.handleSubmit}
                />
                <ErrorsList errorsList={this.props.errorsList} />
            </div >
        );
    }
}

SignInForm.propTypes = {
    loading: PropTypes.bool.isRequired,
    errorsList: PropTypes.array.isRequired
};
