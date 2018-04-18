import { authActions, chatActions, messageActions } from "action-types";
import {
    CHATTY_API_SIGNUP_USER,
    CHATTY_API_SIGNIN_USER,
    CHATTY_API_GET_CHATS,
    CHATTY_API_GET_MESSAGES
} from "utils/api-requests";

import setAuthorizationToken from "utils/setAuthorizationToken";
import jwt from "jsonwebtoken";

/**
 * Sets token in local storage given username & password.
 * 
 * @param {*} userCredentials Username & password
 */
export function signIn(userCredentials) {
    return function (dispatch) {
        dispatch({
            type: authActions.SIGNIN_USER_REQUESTED,
        });
        return CHATTY_API_SIGNIN_USER(userCredentials)
            .then((response) => {
                var token = response.data.token;
                localStorage.removeItem("jwtToken");
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                var user = jwt.decode(token);

                dispatch({
                    type: authActions.SIGNIN_USER_RECEIVED,
                    payload: user
                });
            })
            .catch((error) => {
                dispatch({
                    type: authActions.SIGNIN_USER_FAILED,
                    payload: error
                });
            });
    };
}

export function signUp(userDetails) {
    return function (dispatch) {
        dispatch({
            type: authActions.SIGNUP_USER_REQUESTED,
        });
        return CHATTY_API_SIGNUP_USER(userDetails)
            .then((response) => {
                dispatch({
                    type: authActions.SIGNUP_USER_RECEIVED,
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: authActions.SIGNUP_USER_FAILED,
                    payload: error
                });
            });
    };
}

/**
 * Removes token from local storage.
 */
export function signOut() {
    localStorage.removeItem("jwtToken");
    return {
        type: authActions.SIGNOUT_USER,
    };
}

/**
 * Gets chats list based on current token in local storage.
 */
export function getChats() {
    return function (dispatch) {
        dispatch({
            type: chatActions.GET_CHATS_REQUESTED,
        });
        return CHATTY_API_GET_CHATS()
            .then((response) => {
                dispatch({
                    type: chatActions.GET_CHATS_RECEIVED,
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: chatActions.GET_CHATS_FAILED,
                    payload: error
                });
            });
    };
}

export function createChat() {

}

export function openChat(id) {
    return {
        type: chatActions.OPEN_CHAT,
        payload: id
    };
}

export function toggleCreateChatCard(isVisible) {
    return {
        type: chatActions.TOGGLE_CREATE_CHAT_CARD,
        payload: isVisible
    };
}

export function sendMessage() {

}

/**
 * Gets messages list given chat ID.
 * 
 * @param {*} chatId Chat ID
 */
export function getMessages(chatId) {
    return function (dispatch) {
        dispatch({
            type: messageActions.GET_MESSAGES_REQUESTED,
        });
        return CHATTY_API_GET_MESSAGES(chatId)
            .then((response) => {
                dispatch({
                    type: messageActions.GET_MESSAGES_RECEIVED,
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: messageActions.GET_MESSAGES_FAILED,
                    payload: error
                });
            });
    };
}
