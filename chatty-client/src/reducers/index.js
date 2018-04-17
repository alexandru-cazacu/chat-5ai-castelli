import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatsReducer from "./chatsReducer";
import signUpReducer from "./signUpReducer";

const rootReducer = combineReducers({
    chatsReducer,
    authReducer,
    signUpReducer
});

export default rootReducer;