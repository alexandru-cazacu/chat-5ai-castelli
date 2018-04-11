import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/chat3.svg';
import '../styles/sign-up-page.css';
import '../styles/home-page.css';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: ['friendship', 'culture', 'neat', 'educational', 'love', 'lovely', 'fantastic', 'smooth', 'deep', 'tense'],
            colors: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#7f8c8d', '#d35400']
        };
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
                <div className='logo-container'>
                    <img src={logo} className="main-logo" alt="Main Logo" />
                    <p className="main-title">Chatty</p>
                </div>
                <div className="centered-card clean">
                    <div className='home-message'>Chatty is <div className='home-message color' style={{ color: this.state.colors[Math.floor((Math.random() * 9))] }}>
                        {this.state.messages[Math.floor((Math.random() * 9))]}.
                    </div>
                    </div>
                    <div className='left-card-home'>
                        <Link to="/sign-in" className="button">Sign In</Link>
                    </div>
                    <div className='right-card-home'>
                        <Link to="/sign-up" className="button">Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}
