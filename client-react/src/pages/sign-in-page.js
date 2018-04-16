import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import HeaderWithDrawer from "../components/header-with-drawer";
import InputField from "../components/input-field";
import Button from "../components/button";
import ErrorsList from "../components/errors-list";
import "../styles/sign-up-page.css";

import store from "../_store";
import { signInUser } from "../_actionCreators";

export default class SignInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorsList: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
    }
    
    componentWillMount() {
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        this.handleStoreChange();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleStoreChange() {
        if (store.getState().authReducer.areCredentialsCorrect) {
            this.props.history.replace("/chat");
        }

        this.setState({
            errorsList: [store.getState().authReducer.errorMessage]
        });
    }

    handleSubmit() {
        store.dispatch(signInUser({
            username: this.state.username,
            password: this.state.password
        }));
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
