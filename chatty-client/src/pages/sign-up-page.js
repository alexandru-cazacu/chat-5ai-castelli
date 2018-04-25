import React from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import InputField from 'components/common/input-field';
import Button from 'components/common/button';
import Select from 'components/select';
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
            name: '',
            surname: '',
            birthday: undefined,
            sex: '',
            mail: '',
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
                <PageHeader links={[
                    <Link to="/" className="text">Home</Link>,
                    <Link to="/sign-in" className="text">Sign In</Link>,
                    <Link to="/sign-up" className="text">Sign Up</Link>
                ]} />

                <div className="centered-card">
                    <h1 className='title'>Sign Up</h1>

                    <div className="half-padded-left">
                        <InputField name='name' placeholder='Name...' handleChange={this.handleChange} />
                    </div>
                    <div className="half-padded-right">
                        <InputField name='surname' placeholder='Surname...' handleChange={this.handleChange} />
                    </div>
                    <div className="half-padded-left">
                        <InputField name='birthday' type='date' placeholder='Birthday...' handleChange={this.handleChange} />
                    </div>
                    <div className="half-padded-right">
                        <Select name='sex' placeholder='Sex...' options={['Male', 'Female', 'Other']} onChange={this.handleChange} />
                    </div>
                    <InputField name='mail' placeholder='Mail...' handleChange={this.handleChange} />
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
