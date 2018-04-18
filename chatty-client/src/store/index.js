import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import setAuthorizationToken from "../utils/setAuthorizationToken";

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    ));

setAuthorizationToken(localStorage.jwtToken);

export default store;
