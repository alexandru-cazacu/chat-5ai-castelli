import {
    USER_LOGIN_REQUESTER,
    USER_LOGIN_RECEIVED,
    USER_LOGIN_FAILED,
} from "../_actionTypes";

const initialState = {
    userName: "",
    userToken: ""
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
    case USER_LOGIN_REQUESTER:
        state = Object.assign({}, state, {
            status: "waiting"
        });
        break;
    case USER_LOGIN_RECEIVED:
        return Object.assign({}, state, {
            visibilityFilter: action.filter
        });
    case USER_LOGIN_FAILED:
        state = Object.assign({}, state, {
            status: "failed",
            error: action.payload
        });
        break;
    default:
        return state;
    }
}