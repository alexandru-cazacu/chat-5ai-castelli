import { chatActions } from "action-types";

const initialState = {
    chatsList: [],
    errorMessage: "",
    loading: false,
    showCreateChatCard: false,
    currentOpenChat: undefined
};

export default function chatReducer(state = initialState, action) {

    switch (action.type) {
    case chatActions.GET_CHATS_REQUESTED:
        return Object.assign({}, state, {
            loading: true,
            chatsList: []
        });
    case chatActions.GET_CHATS_RECEIVED:
        return Object.assign({}, state, {
            chatsList: action.payload.data,
            errorMessage: action.payload.data.length === 0 ? "Be the first one to write to a friend" : "",
            loading: false,
        });
    case chatActions.GET_CHATS_FAILED:
        return Object.assign({}, state, {
            errorMessage: "Check your Connection and reload the page",
            loading: false
        });
    case chatActions.TOGGLE_CREATE_CHAT_CARD:
        return Object.assign({}, state, {
            showCreateChatCard: action.payload
        });
    case chatActions.OPEN_CHAT:
        return Object.assign({}, state, {
            currentOpenChatID: action.payload
        });
    default:
        return state;
    }
}
