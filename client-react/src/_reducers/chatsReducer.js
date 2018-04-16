import { chatOps } from "../_actionTypes";

const initialState = {
    chatsList: [],
    errorMessage: ""
};

export default function chatsReducer(state = initialState, action) {

    switch (action.type) {
    case chatOps.GET_CHATS_LIST_REQUESTED:
        return Object.assign({}, state, {
            chatsList: []
        });
    case chatOps.GET_CHATS_LIST_RECEIVED:
        return Object.assign({}, state, {
            chatsList: action.payload
        });
    case chatOps.GET_CHATS_LIST_FAILED:
        return Object.assign({}, state, {
            chatsList: [],
            errorMessage: "Unable to retrieve chats list"
        });
    default:
        return state;
    }
}