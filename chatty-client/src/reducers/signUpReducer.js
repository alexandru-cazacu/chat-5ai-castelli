import { authActions } from 'action-types';

const initialState = {
    userDetails: {},
    loading: false,
    errorsList: [],
    accountCreated: false
};

export default function signUpReducer(state = initialState, action) {

    switch (action.type) {
    case authActions.SIGNUP_USER_REQUESTED:
        return Object.assign({}, state, {
            loading: true
        });
    case authActions.SIGNUP_USER_RECEIVED:
        return Object.assign({}, state, {
            loading: false,
            userDetails: action.payload.user
        });
    case authActions.SIGNUP_USER_FAILED:
        console.log(action.payload);
        return Object.assign({}, state, {
            loading: false,
            errorsList: [action.payload]
        });
    default:
        return state;
    }
}
