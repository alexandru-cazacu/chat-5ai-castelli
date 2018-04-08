import React from 'react';
import axios from 'axios';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import logo from '../logo.svg';

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthday: undefined,
            sex: '',
            mail: '',
            username: '',
            password: '',
            confirmPassword: '',

            invalidFirstName: '',
            invalidLastName: '',
            invalidBirthday: '',
            invalidSex: '',
            invalidMail: '',
            invalidUsername: '',
            invalidPassword: '',
            invalidConfirmPassword: '',

            errors: [],
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log([e.target.name] + '-' + e.target.value);
    }

    isMailValid(mail) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(mail).toLowerCase())) {
            return false;
        }
        return true;
    }

    isDateValid(date) {
        if (date === undefined)
            return false;
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!date.match(regEx))
            return false;  // Invalid format
        var d = new Date(date);
        if (!d.getTime() && d.getTime() !== 0)
            return false; // Invalid date
        return true;
    }

    validateInput() {
        var errorsList = [];

        this.setState({
            invalidFirstName: '',
            invalidLastName: '',
            invalidBirthday: '',
            invalidSex: '',
            invalidMail: '',
            invalidUsername: '',
            invalidPassword: '',
            invalidConfirmPassword: '',
        });

        // First Name
        if (this.state.firstName.length < 4) {
            this.setState({ invalidFirstName: 'error' });
            errorsList[0] = 'First Name is too short';
        }
        if (this.state.firstName.length > 20) {
            this.setState({ invalidFirstName: 'error' });
            errorsList[0] = 'First Name is too long';
        }
        if (this.state.firstName === '') {
            this.setState({ invalidFirstName: 'error' });
            errorsList[0] = 'First Name can\'t be blank';
        }

        // Last name
        if (this.state.lastName.length < 4) {
            this.setState({ invalidLastName: 'error' });
            errorsList[1] = 'Last Name is too short';
        }
        if (this.state.lastName.length > 20) {
            this.setState({ invalidLastName: 'error' });
            errorsList[1] = 'Last Name is too long';
        }
        if (this.state.lastName === '') {
            this.setState({ invalidLastName: 'error' });
            errorsList[1] = 'Last Name can\'t be blank';
        }

        // Birthday
        if (this.state.birthday === '') {
            this.setState({ invalidBirthday: 'error' });
            errorsList[2] = 'Birtday can\'t be blank';
        }
        if (!this.isDateValid(this.state.birthday)) {
            this.setState({ invalidBirthday: 'error' });
            errorsList[2] = 'Invalid date';
        }

        // Sex
        if (this.state.sex === '') {
            this.setState({ invalidSex: 'error' });
            errorsList[3] = 'Sex can\'t be blank';
        }

        // Email
        if (!this.isMailValid(this.state.mail)) {
            this.setState({ invalidMail: 'error' });
            errorsList[4] = 'Email is invalid';
        }

        // Username
        if (this.state.username === '') {
            this.setState({ invalidUsername: 'error' });
            errorsList[5] = 'Username can\'t be blank';
        }
        if (this.state.username.length < 1 || this.state.username.length > 20) {
            this.setState({ invalidUsername: 'error' });
            errorsList[5] = 'Username must be 1-20 characters';
        }

        // Password        
        if (this.state.password.length < 8 || this.state.password.length > 20) {
            this.setState({ invalidPassword: 'error' });
            errorsList[8] = 'Password must be 8-20 characters';
        }
        if (this.state.password === '') {
            this.setState({ invalidPassword: 'error' });
            errorsList[8] = 'Password can\'t be blank';
        }

        if (this.state.confirmPassword.length < 8 || this.state.confirmPassword.length > 20) {
            this.setState({ invalidConfirmPassword: 'error' });
            errorsList[9] = 'Confirmation Password must be 8-20 characters';
        }
        if (this.state.confirmPassword === '') {
            this.setState({ invalidConfirmPassword: 'error' });
            errorsList[9] = 'Confirmation Password can\'t be blank';
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ invalidConfirmPassword: 'error' });
            errorsList[9] = 'Confirmation Password doesn\'t match';
        }

        this.setState({ errors: errorsList });

        if (errorsList.length === 0)
            return true;
        return false;
    }

    onSubmit(e) {
        if (this.validateInput()) {
            console.log('Performing POST request.');
            axios({
                method: 'post',
                url: 'http://localhost:8080/chatty/users/',
                data: {
                    name: this.state.firstName,
                    lastname: this.state.lastName,
                    sex: this.state.sex,
                    birthday: this.state.birthday,
                    mail: this.state.mail,
                    username: this.state.username,
                    password: this.state.password,
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div>
                <img src={logo} className="main-logo" alt="Main Logo" />
                <p className="main-title">Chatty</p>
                <div className="centered-card">
                    <h1>Sign Up</h1>

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className={'input-field half ' + this.state.invalidFirstName}
                        onChange={this.onChange} />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className={'input-field half ' + this.state.invalidLastName}
                        onChange={this.onChange} />

                    <input
                        type="date"
                        name="birthday"
                        className={'input-field half ' + this.state.invalidBirthday}
                        onChange={this.onChange} />

                    <select
                        name="sex"
                        className={'input-field half ' + this.state.invalidSex}
                        onChange={this.onChange}>
                        <option value="" disabled selected>Sex</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <input
                        type="email"
                        name="mail"
                        placeholder="Email"
                        className={'input-field ' + this.state.invalidMail}
                        onChange={this.onChange} />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className={'input-field ' + this.state.invalidUsername}
                        onChange={this.onChange} />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={'input-field half ' + this.state.invalidPassword}
                        onChange={this.onChange} />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className={'input-field half ' + this.state.invalidConfirmPassword}
                        onChange={this.onChange} />

                    <button
                        className="custom-button"
                        onClick={this.onSubmit}>Sign Up
                    </button>

                    <ul className="errors-list">
                        {this.state.errors.map((value) => <li key={value[0]}>{value}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}
