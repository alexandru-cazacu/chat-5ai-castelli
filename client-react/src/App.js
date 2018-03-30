import React, { Component } from 'react';
import './App.css';

import RegisterPage from './pages/register';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
    (state = []) => state,
    applyMiddleware(thunk)
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <RegisterPage />
                </div>
            </Provider>
        );
    }
}

export default App;
