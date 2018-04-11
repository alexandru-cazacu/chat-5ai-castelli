import React from 'react';
import InputField from '../components/input-field';
import Button from '../components/button';
import Select from '../components/select';
import ErrorsList from '../components/errors-list';
import AuthService from '../utils/auth-service';
import logo from '../images/chat3.svg';
import '../styles/sign-up-page.css';
import { Link } from 'react-router-dom';

export default class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            username: '',
            birthday: undefined,
            sex: '',
            password: '',
            errorsList: []
        };

        this.Auth = new AuthService();
    }

    handleSubmit() {
        var errors = [];
        if (this.state.username.length === 0 || this.state.password.length === 0)
            errors.push('Please fill both fields');

        this.setState({ errorsList: errors });

        // TODO implement user Sign Up

    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/chat');
    }

    render() {
        return (
            <div>
                <div className="header">
                    <div className="wrapper">
                        <div className="title">Chatty</div>
                        <div className="nav">
                            <div className="item">
                                <i className="material-icons">home</i>
                                <Link to="/" className="text">Home</Link>
                            </div>
                            <div className="item">
                                <i className="material-icons">account_circle</i>
                                <Link to="/sign-in" className="text">Sign In</Link>
                            </div>
                            <div className="item">
                                <i className="material-icons">account_circle</i>
                                <Link to="/sign-up" className="text">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='logo-container'>
                    <img src={logo} className="main-logo" alt="Main Logo" />
                    <p className="main-title">Chatty</p>
                </div>
                <div className="centered-card">
                    <h1 className='title'>Sign Up</h1>

                    <InputField name='mail' placeholder='Mail...' onChange={this.handleChange.bind(this)} />
                    <InputField name='username' placeholder='Username...' onChange={this.handleChange.bind(this)} />
                    <InputField name='birthday' type='date' placeholder='Birthday...' onChange={this.handleChange.bind(this)} />
                    <Select placeholder='Sex...' options={['Male', 'Female', 'Other']} onChange={this.handleChange.bind(this)} />
                    <InputField name='password' type='password' placeholder='Password...' onChange={this.handleChange.bind(this)} />
                    <Button value='Sign In' onClick={this.handleSubmit.bind(this)} />
                    <ErrorsList errors={this.state.errorsList} />
                </div>
            </div>
        );
    }
}
