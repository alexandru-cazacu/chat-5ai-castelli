import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    ));

export default store;
