import React from 'react';

import './styles/App.css';
import './styles/proto.css';

import HomePage from './pages/home-page';
import SignInPage from './pages/sign-in-page';
import SignUpPage from './pages/sign-up-page';
import ChatPage from './pages/chat-page';
import NotFoundPage from './pages/not-found-page';


import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/sign-in" component={SignInPage} />
                        <Route exact path="/sign-up" component={SignUpPage} />
                        <Route exact path="/chat" component={ChatPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
