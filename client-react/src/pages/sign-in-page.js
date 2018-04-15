import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AuthService from "../utils/auth-service";
import HeaderWithDrawer from "../components/header-with-drawer";
import InputField from "../components/input-field";
import Button from "../components/button";
import ErrorsList from "../components/errors-list";
import "../styles/sign-up-page.css";

export default class SignInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorsList: []
        };

        this.Auth = new AuthService();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({ errorsList: ["Please fill both fields"] });
            return;
        }

        this.Auth.login(this.state.username, this.state.password)
            .then(() => {
                this.props.history.replace("/chat");
            })
            .catch((error) => {
                if (error.name === "TypeError")
                    toast.error("Check your Connection and try again", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                else
                    this.setState({ errorsList: ["Check your credentials and try again"] });
            });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace("/chat");
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
                    <h1 className='card-title'>Sign In</h1>
                    <InputField name='username' placeholder='Username...' onChange={this.handleChange.bind(this)} />
                    <InputField name='password' type='password' placeholder='Password...' onChange={this.handleChange.bind(this)} />
                    <Button value='Sign In' onClick={this.handleSubmit.bind(this)} />
                    <ErrorsList errors={this.state.errorsList} />
                </div>
                <ToastContainer />
            </div>
        );
    }
}
