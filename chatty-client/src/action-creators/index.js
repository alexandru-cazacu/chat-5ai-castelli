import { authActions, chatActions, messageActions } from 'action-types';
import {
    CHATTY_API_SIGNUP_USER,
    CHATTY_API_SIGNIN_USER,
    CHATTY_API_GET_CHATS,
    CHATTY_API_GET_MESSAGES,
    CHATTY_API_CREATE_MESSAGE
} from 'utils/api-requests';

import setAuthorizationToken from 'utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

export function signIn(userCredentials) {
    return function (dispatch) {
        dispatch({
            type: authActions.SIGNIN_USER_REQUESTED,
            payload: userCredentials
        });
        return CHATTY_API_SIGNIN_USER(userCredentials)
            .then((response) => {
                var token = response.data.token;
                localStorage.removeItem('jwtToken');
                localStorage.setItem('jwtToken', token);
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
    console.log(userDetails);
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
                console.log(error.response);
                var errorMessage = '';
                if (error.response.data.status === 409)
                    errorMessage = error.response.data.message;
                else
                    errorMessage = 'Check your details and try again';
                dispatch({
                    type: authActions.SIGNUP_USER_FAILED,
                    payload: errorMessage
                });
            });
    };
}

export function signOut() {
    localStorage.removeItem('jwtToken');
    return {
        type: authActions.SIGNOUT_USER,
    };
}

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

export function openChat(chatId) {
    return {
        type: chatActions.OPEN_CHAT,
        payload: chatId
    };
}

export function toggleCreateChatCard(isVisible) {
    return {
        type: chatActions.TOGGLE_CREATE_CHAT_CARD,
        payload: isVisible
    };
}

export function sendMessage(message, chatId) {
    return function (dispatch) {
        dispatch({
            type: messageActions.SEND_MESSAGE_REQUESTED,
        });
        return CHATTY_API_CREATE_MESSAGE(message, chatId)
            .then((response) => {
                dispatch({
                    type: messageActions.SEND_MESSAGE_RECEIVED,
                });
            })
            .catch((error) => {
                dispatch({
                    type: messageActions.SEND_MESSAGE_FAILED,
                    payload: error
                });
            });
    };
}

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
                dispatch({
                    type: chatActions.OPEN_CHAT,
                    payload: chatId
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
