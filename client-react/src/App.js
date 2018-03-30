import React, { Component } from 'react';
import logo from "./logo.svg";
import './App.css';

import RegisterPage from './pages/register';
import LoginPage from './pages/login'

class App extends Component {
    render() {
        return (
            <div className="App">
                <img src={logo} className="icon" />
                <RegisterPage />
            </div>
        );
    }
}

export default App;
