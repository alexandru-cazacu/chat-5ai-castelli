import React from 'react';

class LoginPage extends React.Component {
    render() {
        return (
            <div className="centeredCard">
                <h1>Login</h1>
                <ul>
                    <li><input type="text" placeholder="Username" className="inputField" /></li>
                    <li><input type="password" placeholder="Password" className="inputField" /></li>
                    <li><input type="submit" value="Login" className="customButton"/></li>
                </ul>
            </div>
        );
    }
}

export default LoginPage;
