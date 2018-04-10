import axios from 'axios';

export function getChats(responseCallback, errorCallback) {
    axios.get('http://localhost:8080/users/11/chats')
        .then((response) => responseCallback(response.data))
        .catch((error) => errorCallback());
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
        .then((response) => responseCallback(response.data))
        .catch((error) => errorCallback(error));
}

export function getUsersBySearch(searchValue, responseCallback, errorCallback) {
    axios.get('http://localhost:8080/users?searchByUsername=' + searchValue + '&mode=compact')
        .then((response) => responseCallback(response.data))
        .catch((error) => errorCallback());
}

export function getMessages(chatid, responseCallback, errorCallback) {
    axios.get('http://localhost:8080/chats/' + chatid + '/messages')
        .then((response) => responseCallback(response.data))
        .catch((error) => errorCallback());
}

export function postMessage(message, chatid, responseCallback, errorCallback) {
    console.log(message);
    axios.post('http://localhost:8080/chats/' + chatid + '/messages', message)
        .then((response) => responseCallback(response.data))
        .catch((error) => errorCallback(error));
}