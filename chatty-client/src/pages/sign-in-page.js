import React from 'react';
import { Link } from 'react-router-dom';
import { signIn } from 'action-creators';
import { connect } from 'react-redux';
import store from 'store';

// Components
import HeaderWithDrawer from 'components/header-with-drawer';
import InputField from 'components/common/input-field';
import Button from 'components/common/button';
import ErrorsList from 'components/errors-list';
import SignInForm from 'components/sign-in-form';
import PageSpinner from 'components/common/page-spinner';

class SignInPage extends React.Component {
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

    render() {
        return (
            <div>
                <PageSpinner visible={this.props.loading} />
                <HeaderWithDrawer links={[
                    <Link to="/" className="text">Home</Link>,
                    <Link to="/sign-in" className="text">Sign In</Link>,
                    <Link to="/sign-up" className="text">Sign Up</Link>
                ]} />

                <SignInForm loading={this.props.loading} errorsList={this.props.errorsList} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorsList: state.authReducer.errorsList,
        loading: state.authReducer.loading
    };
};

export default connect(
    mapStateToProps
)(SignInPage);
