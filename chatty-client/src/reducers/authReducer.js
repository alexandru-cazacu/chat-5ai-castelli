import { authActions } from 'action-types';

const initialState = {
    loading: false,
    areCredentialsCorrect: false,
    errorsList: [],
    userDetails: {}
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
    case authActions.SIGNIN_USER_REQUESTED:
        return Object.assign({}, state, {
            loading: true,
            areCredentialsCorrect: false,
            userDetails: {}
        });
    case authActions.SIGNIN_USER_RECEIVED:
        return Object.assign({}, state, {
            loading: false,
            areCredentialsCorrect: true
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
            userDetails: {}
        });
    case authActions.GET_USER_REQUESTED:
        return Object.assign({}, state, {
            userDetails: {}
        });
    case authActions.GET_USER_RECEIVED:
        return Object.assign({}, state, {
            userDetails: action.payload
        });
    case authActions.GET_USER_FAILED:
        return Object.assign({}, state, {
            userDetails: {},
            errorsList: ['Check your Connection and try again']
        });
    default:
        return state;
    }
}