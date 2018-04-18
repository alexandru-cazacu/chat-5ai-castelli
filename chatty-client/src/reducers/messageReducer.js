import { messageActions } from "action-types";

const initialState = {
    messagesList: [],
    loading: false,
    errorMessage: ""
};

export default function messageReducer(state = initialState, action) {

    switch (action.type) {
    case messageActions.GET_MESSAGES_REQUESTED:
        return Object.assign({}, state, {
            loading: true
        });
    case messageActions.GET_MESSAGES_RECEIVED:
        return Object.assign({}, state, {
            messagesList: action.payload.data,
            loading: false,
        });
    case messageActions.GET_MESSAGES_FAILED:
        return Object.assign({}, state, {
            errorMessage: "Check your Connection and reload the page",
            loading: false
        });
    default:
        return state;
    }
}