import React from "react";
import AuthService from "../utils/auth-service";
import { Link } from "react-router-dom";
import InputField from "../components/input-field";
import Button from "../components/button";
import Select from "../components/select";
import ErrorsList from "../components/errors-list";
import HeaderWithDrawer from "../components/header-with-drawer";
import "../styles/sign-up-page.css";

import { ClipLoader } from "react-spinners";

import store from "../store";
import { signUpUser } from "../actions";

export default class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            birthday: undefined,
            sex: "",
            mail: "",
            username: "",
            password: "",
            errorsList: [],
            loading: false
        };

        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {

        if (this.Auth.loggedIn())
            this.props.history.replace("/chat");

        store.subscribe(() => {
            this.setState({
                errorsList: [store.getState().signUpReducer.errorMessage],
                loading: store.getState().signUpReducer.loading
            });
        });
    }

    handleSubmit() {
        store.dispatch(signUpUser(this.state));
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <HeaderWithDrawer items={[
                    <Link to="/" className="text">Home</Link>,
                    <Link to="/sign-in" className="text">Sign In</Link>,
                    <Link to="/sign-up" className="text">Sign Up</Link>
                ]} />

                <div className="centered-card">
                    <h1 className='title'>Sign Up</h1>

                    <InputField name='name' placeholder='Name...' onChange={this.handleChange} />
                    <InputField name='surname' placeholder='Surname...' onChange={this.handleChange} />
                    <InputField name='birthday' type='date' placeholder='Birthday...' onChange={this.handleChange} />
                    <Select name='sex' placeholder='Sex...' options={["Male", "Female", "Other"]} onChange={this.handleChange} />
                    <InputField name='mail' placeholder='Mail...' onChange={this.handleChange} />
                    <InputField name='username' placeholder='Username...' onChange={this.handleChange} />
                    <InputField name='password' type='password' placeholder='Password...' onChange={this.handleChange} />
                    <Button value='Sign In' onClick={this.handleSubmit} />
                    <ErrorsList errors={this.state.errorsList} />
                    {this.state.loading &&
                        <div className="spinner-container">
                            <ClipLoader
                                loading={this.state.loading}
                            />
                        </div>
                    }
                </div>
            </div >
        );
    }
}
