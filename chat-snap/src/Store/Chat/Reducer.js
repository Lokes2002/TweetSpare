import {
    FETCH_CHAT_HISTORY,
    ADD_MESSAGE_TO_HISTORY,
} from './actionTypes';

const initialState = {
    chatHistory: []
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHAT_HISTORY:
            return { ...state, chatHistory: action.payload };
        case ADD_MESSAGE_TO_HISTORY:
            return { ...state, chatHistory: [...state.chatHistory, action.payload] };
        default:
            return state;
    }
};

export default Reducer;
