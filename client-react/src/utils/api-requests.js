import axios from "axios";
import AuthService from "./auth-service";
const Auth = new AuthService();

// const HOST = "http://localhost:8080";
const HOST = "http://192.168.43.240:8080";

/* ==================================================
AUTHENTICATION
================================================== */

export function CHATTY_API_SIGNUP_USER(user) {
    return axios({
        method: "POST",
        url: HOST + "/signup",
        headers: {
            Authorization: Auth.getToken()
        },
        data: user
    });
}

export function CHATTY_API_SIGNIN_USER(user) {
    return axios({
        method: "POST",
        url: HOST + "/login",
        headers: {
            Authorization: Auth.getToken()
        },
        data: user
    });
}

/* ==================================================
USERS
================================================== */

export function CHATTY_API_SEARCH_USERS(searchByUsername, mode) {
    return axios({
        method: "GET",
        url: HOST + "/search?searchByUsername=" + searchByUsername + "&mode=" + mode,
        headers: {
            Authorization: Auth.getToken()
        }
    });
}

export function CHATTY_API_GET_USER() {
    return axios({
        method: "GET",
        url: HOST + "/users",
        headers: {
            Authorization: Auth.getToken()
        }
    });
}

export function CHATTY_API_UPDATE_USER(user) {
    return axios({
        method: "PUT",
        url: HOST + "/users",
        headers: {
            Authorization: Auth.getToken()
        },
        data: user
    });
}

export function CHATTY_API_DELETE_USER() {
    return axios({
        method: "GET",
        url: HOST + "/users",
        headers: {
            Authorization: Auth.getToken()
        }
    });
}

/* ==================================================
CHATS
================================================== */

export function CHATTY_API_CREATE_CHAT(chatName, usersList) {
    if (chatName === "") {
        // TODO HANDLE ERROR
        return;
    }
    if (usersList.length === 0) {
        // TODO HANDLE ERROR
        return;
    }

    // TODO check if only current user is added in invited people.

    return axios({
        method: "POST",
        url: HOST + "/users/chats",
        headers: {
            Authorization: Auth.getToken()
        },
        data: {
            chatName: chatName,
            users: usersList
        }
    });
}

export function CHATTY_API_GET_CHATS() {
    return axios({
        method: "GET",
        url: HOST + "/users/chats",
        headers: {
            Authorization: Auth.getToken()
        }
    });
}

export function CHATTY_API_GET_CHAT(chatId) {
    return axios({
        method: "GET",
        url: HOST + "/chats/" + chatId,
        headers: {
            Authorization: Auth.getToken()
        }
    });
}

/* ==================================================
MESSAGES
================================================== */

export function CHATTY_API_CREATE_MESSAGE(message, chatId) {
    return axios({
        method: "POST",
        url: HOST + "/chats/" + chatId + "/messages",
        headers: {
            Authorization: Auth.getToken()
        },
        data: message
    });
}

export function CHATTY_API_GET_MESSAGES(chatId) {
    return axios({
        method: "GET",
        url: HOST + "/chats/" + chatId + "/messages",
        headers: {
            Authorization: Auth.getToken()
        }
    });
}