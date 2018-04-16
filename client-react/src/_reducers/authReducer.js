import { userAuthOps } from "../_actionTypes";

const initialState = {
    userName: "",
    userToken: ""
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
    case userAuthOps.USER_LOGIN_REQUESTER:
        return Object.assign({}, state, {
            userToken: ""
        });
    case userAuthOps.USER_LOGIN_RECEIVED:
        return Object.assign({}, state, {
            userToken: ""
        });
    case userAuthOps.USER_LOGIN_FAILED:
        return Object.assign({}, state, {
            userToken: ""
        });
    default:
        return state;
    }
}