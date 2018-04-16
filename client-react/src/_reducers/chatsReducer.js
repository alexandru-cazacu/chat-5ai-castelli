import { chatOps } from "../_actionTypes";

const initialState = {
    chatsList: [],
    errorMessage: "",
    loading: false
};

export default function chatsReducer(state = initialState, action) {

    switch (action.type) {
    case chatOps.GET_CHATS_REQUESTED:
        return Object.assign({}, state, {
            loading: true
        });
    case chatOps.GET_CHATS_RECEIVED:
        return Object.assign({}, state, {
            chatsList: action.payload,
            loading: false
        });
    case chatOps.GET_CHATS_FAILED:
        return Object.assign({}, state, {
            errorMessage: "Check your Connection and reload the page",
            loading: false
        });
    default:
        return state;
    }
}