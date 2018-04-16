import { userAuthOps } from "../_actionTypes";

const initialState = {
    loading: false,
    areCredentialsCorrect: false,
    errorMessage: ""
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
    case userAuthOps.SIGNIN_USER_REQUESTED:
        return Object.assign({}, state, {
            loading: true,
            errorMessage: ""
        });
    case userAuthOps.SIGNIN_USER_RECEIVED:
        return Object.assign({}, state, {
            loading: false,
            areCredentialsCorrect: true
        });
    case userAuthOps.SIGNIN_USER_FAILED:
        return Object.assign({}, state, {
            loading: false,
            areCredentialsCorrect: false,
            errorMessage: action.payload.name === "TypeError" ? "Check your Connection and try again" : "Check your Credentials and try again"
        });
    default:
        return state;
    }
}