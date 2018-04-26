import React from 'react';
import { Link } from 'react-router-dom';
import InputField from 'components/common/input-field';
import Button from 'components/common/button';
import store from 'store';
import { signUp } from 'action-creators';
import { connect } from 'react-redux';
import ErrorsList from 'components/errors-list';
import PageHeader from 'components/page-header';
import './styles/sign-up-page.css';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('jwtToken')) {
            this.props.history.replace('/chat');
        }
    }

    componentWillUpdate() {
        if (localStorage.getItem('jwtToken')) {
            this.props.history.replace('/chat');
        }
    }

    handleSubmit() {
        store.dispatch(signUp(this.state));
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <PageHeader items={[
                    <Link to="/" className="item">Home</Link>,
                    <Link to="/sign-in" className="item">Sign In</Link>,
                    <Link to="/sign-up" className="item">Sign Up</Link>
                ]} />

                <div className="centered-card">
                    <h1 className='title'>Sign Up</h1>
                    <InputField name='username' placeholder='Username...' handleChange={this.handleChange} />
                    <InputField name='password' type='password' placeholder='Password...' handleChange={this.handleChange} />
                    <Button label={this.props.loading ? 'Signing Up...' : 'Sign Up'} handleClick={this.handleSubmit} />
                    <ErrorsList errorsList={this.props.errorsList} />
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        errorsList: state.signUpReducer.errorsList,
        loading: state.signUpReducer.loading,
        signInLoading: state.authReducer.loading // Used to update view when you autosignin after signup
    };
};

export default connect(
    mapStateToProps
)(SignUpPage);
