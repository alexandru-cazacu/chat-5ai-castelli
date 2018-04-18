import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import signUpReducer from "./signUpReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
    chatReducer,
    authReducer,
    signUpReducer,
    messageReducer
});

export default rootReducer;