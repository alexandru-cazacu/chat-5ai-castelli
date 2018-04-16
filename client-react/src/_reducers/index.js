import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatsReducer from "./chatsReducer";

const rootReducer = combineReducers({
    authReducer,
    chatsReducer
});

export default rootReducer;