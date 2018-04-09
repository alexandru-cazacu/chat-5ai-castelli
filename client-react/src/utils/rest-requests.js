import axios from 'axios';

export function getChats(responseCallback, errorCallback) {
    axios.get('http://localhost:8080/users/11/chats')
        .then((response) => responseCallback(response.data))
        .catch((error) => errorCallback());
}

export function postChat(chatName, users, responseCallback, errorCallback) {
    axios.post('http://localhost:8080/users/11/chats', {
        chatName: chatName,
        users: users
    })
        .then((response) => responseCallback(response.data))
        .catch((error) => errorCallback());
}

export function getUsersBySearch(searchValue, responseCallback, errorCallback) {
    axios.get('http://localhost:8080/users?searchByUsername=' + searchValue + '&mode=compact')
        .then((response) => responseCallback(response.data))
        .catch((error) => errorCallback());
}