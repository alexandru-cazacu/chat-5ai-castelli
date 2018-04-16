import { userAuthOps, chatOps } from "../_actionTypes";
import {
    CHATTY_API_SIGNUP_USER,
    CHATTY_API_GET_CHATS
} from "../utils/api-requests";

import AuthService from "../utils/auth-service";
let authService = new AuthService();

export function signInUser(userCredentials) {
    return function (dispatch) {
        dispatch({
            type: userAuthOps.SIGNIN_USER_REQUESTED,
        });
        return authService.login(userCredentials.username, userCredentials.password)
            .then((response) => {
                dispatch({
                    type: userAuthOps.SIGNIN_USER_RECEIVED,
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: userAuthOps.SIGNIN_USER_FAILED,
                    payload: error
                });
            });
    };
}

export function signUpUser(userDetails) {
    return function (dispatch) {
        dispatch({
            type: userAuthOps.SIGNUP_USER_REQUESTED,
        });
        return CHATTY_API_SIGNUP_USER(userDetails)
            .then((response) => {
                dispatch({
                    type: userAuthOps.SIGNUP_USER_RECEIVED,
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: userAuthOps.SIGNUP_USER_FAILED,
                    payload: error
                });
            });
    };
}

export function getChatsList() {
    return function (dispatch) {
        dispatch({
            type: chatOps.GET_CHATS_REQUESTED,
        });
        return CHATTY_API_GET_CHATS()
            .then((response) => {
                dispatch({
                    type: chatOps.GET_CHATS_RECEIVED,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: chatOps.GET_CHATS_FAILED,
                    payload: error.data
                });
            });
    };
}
