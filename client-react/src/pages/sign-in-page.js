import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AuthService from '../utils/auth-service';
import InputField from '../components/input-field';
import Button from '../components/button';
import ErrorsList from '../components/errors-list';
import logo from '../images/chat3.svg';
import '../styles/sign-up-page.css';

export default class SignInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorsList: []
        };

        this.Auth = new AuthService();
    }

    handleSubmit() {
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({ errorsList: ['Please fill both fields'] });
            return;
        }

        this.Auth.login(this.state.username, this.state.password)
            .then(res => {
                this.props.history.replace('/chat');
            })
            .catch(err => {
                this.setState({ errorsList: ['Please check your credentials and try again'] });
                // toast.info(err.toString(), {
                //     position: toast.POSITION.BOTTOM_CENTER
                // });
            });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/chat');
    }

    render() {
        const errorsList = this.state.errorsList.map((error) => { return <li>{error}</li>; });

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
                    <h1 className='card-title'>Sign In</h1>
                    <InputField name='username' placeholder='Username...' onChange={this.handleChange.bind(this)} />
                    <InputField name='password' placeholder='Password...' onChange={this.handleChange.bind(this)} />
                    <Button value='Sign In' onClick={this.handleSubmit.bind(this)} />
                    <ErrorsList errors={this.state.errorsList} />
                </div>
                <ToastContainer />
            </div>
        );
    }
}
