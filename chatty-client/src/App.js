import React from "react";

import "./styles/App.css";
import "./styles/proto.css";

// Pages
import HomePage from "./pages/home-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import ChatPage from "./pages/chat-page";
import NotFoundPage from "./pages/not-found-page";

// Redux + Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
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
            </Provider>
        );
    }
}
