import { thunkMiddleware } from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../_reducers";

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware, logger));

const logger = store => next => action => {
    console.log("Azione corrente: ", action);
    let result = next(action);
    console.log("Stato successivo: ", store.getState());
    return result;
};

export default store;