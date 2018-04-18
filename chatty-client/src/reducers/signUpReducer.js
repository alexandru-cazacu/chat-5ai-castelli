import { authActions } from "action-types";

const initialState = {
    userDetails: {},
    loading: false
};

export default function signUpReducer(state = initialState, action) {

    switch (action.type) {
    case authActions.SIGNUP_USER_REQUESTED:
        return Object.assign({}, state, {
            loading: true,
        });
    case authActions.SIGNUP_USER_RECEIVED:
        return Object.assign({}, state, {
            loading: false,
            userDetails: action.payload.user,
        });
    case authActions.SIGNUP_USER_FAILED:
        console.log(action.payload);
        return Object.assign({}, state, {
            loading: false,
            errorMessage: action.payload.name === "TypeError" ||
            action.payload.name === "Error" ? 
                "Check your Connection and try again" 
                : "Check your Details and try again"
        });
    default:
        return state;
    }
}