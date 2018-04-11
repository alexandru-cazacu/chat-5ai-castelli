import axios from 'axios';
import AuthService from './auth-service';
const Auth = new AuthService();

export function signUpUser(user, responseCallback, errorCallback) {
    axios({
        method: 'POST',
        url: 'http://localhost:8080/signup',
        headers: {
            Authorization: Auth.getToken()
        },
        data: user
    })
        .then((response) => { console.log(response); responseCallback(response); })
        .catch((error) => { console.log(error); errorCallback(error); });
}

export function getChats(responseCallback, errorCallback) {

    axios({
        method: 'GET',
        url: 'http://localhost:8080/users/chats',
        headers: {
            Authorization: Auth.getToken()
        }
    })
        .then((response) => { console.log(response); responseCallback(response); })
        .catch((error) => { console.log(error); errorCallback(error); });
}

export function postChat(chatName, users, responseCallback, errorCallback) {
    if (chatName === '') {
        errorCallback('Please select a chat name and try again');
        return;
    }
    if (users.length === 0) {
        errorCallback('Please add at least one user and try again');
        return;
    }
    // TODO check if only current user is added in invited people.

    axios.post('http://localhost:8080/users/11/chats', {
        chatName: chatName,
        users: users
    })
        .then((response) => { console.log(response); responseCallback(response); })
        .catch((error) => { console.log(error); errorCallback(error); });
}

export function getUsersBySearch(searchValue, responseCallback, errorCallback) {
    axios.get('http://localhost:8080/users?searchByUsername=' + searchValue + '&mode=compact')
        .then((response) => { console.log(response); responseCallback(response); })
        .catch((error) => { console.log(error); errorCallback(error); });
}

export function getMessages(chatid, responseCallback, errorCallback) {
    axios.get('http://localhost:8080/chats/' + chatid + '/messages')
        .then((response) => { console.log(response); responseCallback(response); })
        .catch((error) => { console.log(error); errorCallback(error); });
}

export function postMessage(message, chatid, responseCallback, errorCallback) {
    console.log(message);
    axios.post('http://localhost:8080/chats/' + chatid + '/messages', message)
        .then((response) => { console.log(response); responseCallback(response); })
        .catch((error) => { console.log(error); errorCallback(error); });
}