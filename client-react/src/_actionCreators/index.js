import {
    USER_LOGIN_REQUESTED,
    USER_LOGIN_RECEIVED,
    USER_LOGIN_FAILED
} from "../_actionTypes";
import { CHATTY_API_SIGNUP_USER } from "../utils/api-requests";

function userLogin() {
    return function (dispatch) {
        dispatch({
            type: USER_LOGIN_REQUESTED,
        });
        return CHATTY_API_SIGNUP_USER.then(response => json(), error => dispatch({
            type: USER_LOGIN_FAILED,
            payload: error
        })).then(userDetails => dispatch({
            type: USER_LOGIN_RECEIVED,
            payload: userDetails
        }));
    };
}