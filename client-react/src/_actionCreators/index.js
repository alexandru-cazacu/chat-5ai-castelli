import { userAuthOps, chatOps } from "../_actionTypes";
import { CHATTY_API_SIGNIN_USER, CHATTY_API_GET_CHATS } from "../utils/api-requests";

export function getUserToken(userCredentials) {
    return function (dispatch) {
        dispatch({
            type: userAuthOps.USER_SIGNIN_REQUESTED,
        });
        return CHATTY_API_SIGNIN_USER(userCredentials)
            .then((response) => {
                dispatch({
                    type: userAuthOps.USER_SIGNIN_RECEIVED,
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: userAuthOps.USER_SIGNIN_FAILED,
                    payload: error
                });
            });
    };
}

export function getChatsList() {
    return function (dispatch) {
        dispatch({
            type: chatOps.GET_CHATS_LIST_REQUESTED,
        });
        return CHATTY_API_GET_CHATS()
            .then((response) => {
                dispatch({
                    type: chatOps.GET_CHATS_LIST_RECEIVED,
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: chatOps.GET_CHATS_LIST_FAILED,
                    payload: error
                });
            });
    };
}