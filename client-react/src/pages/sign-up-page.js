import React from 'react';
import InputField from '../components/input-field';
import Button from '../components/button';
import Select from '../components/select';
import ErrorsList from '../components/errors-list';
import AuthService from '../utils/auth-service';
import '../styles/sign-up-page.css';
import { Link } from 'react-router-dom';
import { signUpUser } from '../utils/rest-requests';

export default class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            birthday: undefined,
            sex: '',
            mail: '',
            username: '',
            password: '',
            errorsList: []
        };

        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        var errors = [];
        if (this.state.username.length === 0 || this.state.password.length === 0)
            errors.push('Please fill both fields');

        this.setState({ errorsList: errors });

        // TODO validate input

        console.log(this.state);

        signUpUser(this.state, () => {

        }, () => {

        });

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

                <div className="centered-card">
                    <h1 className='title'>Sign Up</h1>

                    <InputField name='name' placeholder='Name...' onChange={this.handleChange} />
                    <InputField name='surname' placeholder='Surname...' onChange={this.handleChange} />
                    <InputField name='birthday' type='date' placeholder='Birthday...' onChange={this.handleChange} />
                    <Select name='sex' placeholder='Sex...' options={['Male', 'Female', 'Other']} onChange={this.handleChange} />
                    <InputField name='mail' placeholder='Mail...' onChange={this.handleChange} />
                    <InputField name='username' placeholder='Username...' onChange={this.handleChange} />
                    <InputField name='password' type='password' placeholder='Password...' onChange={this.handleChange} />
                    <Button value='Sign In' onClick={this.handleSubmit} />
                    <ErrorsList errors={this.state.errorsList} />
                </div>
            </div>
        );
    }
}
