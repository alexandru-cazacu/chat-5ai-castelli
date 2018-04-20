import { authActions } from 'action-types';

const initialState = {
    loading: false,
    areCredentialsCorrect: false,
    errorsList: [],
    user: {}
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
    case authActions.SIGNIN_USER_REQUESTED:
        return Object.assign({}, state, {
            loading: true,
            areCredentialsCorrect: false,
            user: {}
        });
    case authActions.SIGNIN_USER_RECEIVED:
        return Object.assign({}, state, {
            loading: false,
            areCredentialsCorrect: true,
            user: action.payload
        });
    case authActions.SIGNIN_USER_FAILED:
        return Object.assign({}, state, {
            loading: false,
            errorsList: ['Wrong username or password']
        });
    case authActions.SIGNOUT_USER:
        return Object.assign({}, state, {
            loading: false,
            areCredentialsCorrect: false,
            errorsList: [],
            user: {}
        });
    default:
        return state;
    }
}