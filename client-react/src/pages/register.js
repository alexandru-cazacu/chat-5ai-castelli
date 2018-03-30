import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css'

import logo from "../logo.svg";

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            sex: '',
            mail: '',
            username: '',
            password: '',
            confirmPassword: '',
            date: undefined,

            invalidFirstName: '',
            invalidLastName: '',
            invalidSex: '',
            invalidMail: '',
            invalidUsername: '',
            invalidPassword: '',
            invalidConfirmPassword: '',
            invalidDate: '',

            errors: [],
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    onChange(e) {
        this.setState({ 
            [e.target.name]: e.target.value
        });
    }

    handleDayChange(day) {
        this.setState({ date: day });
    }

    onSubmit(e) {
        var err = [];

        this.setState({
            invalidFirstName: '',
            invalidLastName: '',
            invalidSex: '',
            invalidMail: '',
            invalidUsername: '',
            invalidPassword: '',
            invalidConfirmPassword: '',
            invalidDate: '',
        });


        if (this.state.firstName < 1 || this.state.firstName > 20) {
            this.setState({invalidFirstName: "error"});
            err.push("Invalid first name");
        }

        if (this.state.lastName < 1 || this.state.lastName > 20) {
            this.setState({invalidLastName: "error"});
            err.push("Invalid last name");
        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.state.mail).toLowerCase())) {
            this.setState({invalidMail: "error"});
            err.push("An account with that email already exists");
        }
        
        if (this.state.username === "") {
            this.setState({invalidUsername: "error"});
            err.push("Username can't be empty");
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({invalidPassword: "error"});
            this.setState({invalidConfirmPassword: "error"});
            err.push("Passwords doesn't match");
        }
        
        if (this.state.password.length < 8 || this.state.password.length > 20) {
            this.setState({invalidPassword: "error"});
            err.push("Password must be 8-20 characters");
        }

        this.setState({errors: err});

        // else {
            axios({
                method:'post',
                url:'http://localhost:8080/chatty/users/',
                data: {
                    name: this.state.firstName,
                    lastname: this.state.lastName,
                    sex: this.state.sex,
                    birthday: this.state.year + "-" + this.state.month + "-" + this.state.day,
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
        // }
    }

    render() {

        const {date} = this.state;

        return (
            <div>
                <div className="centeredCard">
                    <img src={logo} className="icon" alt="" />
                    <h1>Sign Up</h1>
                    <input type="text" name="firstName" placeholder="First Name" className={"inputField half " + this.state.invalidFirstName} onChange={this.onChange} />
                    <input type="text" name="lastName" placeholder="Last Name" className={"inputField half " + this.state.invalidLastName} onChange={this.onChange} />
                    <DayPickerInput onDayChange={day => console.log(day)} />
                    <select name="sex" className="inputField half" onChange={this.onChange} >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <input type="text" name="mail" placeholder="Email" className={"inputField " + this.state.invalidMail} onChange={this.onChange} />
                    <input type="text" name="username" placeholder="Username" className={"inputField " + this.state.invalidUsername} onChange={this.onChange} />
                    <input type="password" name="password" placeholder="Password" className={"inputField half " + this.state.invalidPassword} onChange={this.onChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className={"inputField half " + this.state.invalidConfirmPassword} onChange={this.onChange} />
                    <button className="customButton" onClick={this.onSubmit}>Sign Up</button>

                    <ul className="register-errors">
                        {this.state.errors.map((value) => <li>{value}</li>)}
                        {/* <li>Username is already taken</li>
                        <li>An account with that name already exists</li>
                        <li>All fields must be filled</li>
                        <li>Password must be 8-20 characters</li>
                        <li>Passwords doesn't match</li>
                        <li>Date isn't valid</li>
                        <li>Are you sure you inserted a valid date?</li> */}
                    </ul>
                </div>
            </div>
        );
    }
}
