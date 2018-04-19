import React from "react";
import ReactDOM from "react-dom";

// Redux + Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

// Components
import FullPageSpinner from "components/full-page-spinner";

// Pages
import HomePage from "./pages/home-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import ChatPage from "./pages/chat-page";
import NotFoundPage from "./pages/not-found-page";

// Styles
import "./styles/App.css";
import "./styles/proto.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
        store.subscribe(this.handleStoreUpdate);
    }

    handleStoreUpdate() {
        this.setState({
            loading: store.getState().chatReducer.loading || store.getState().authReducer.loading
        });
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <FullPageSpinner isVisible={this.state.loading} />
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


ReactDOM.render(<App />, document.getElementById("root"));
