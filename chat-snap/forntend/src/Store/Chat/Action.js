import axios from 'axios';
import {
    FETCH_CHAT_HISTORY,
    SEND_MESSAGE,
    ADD_MESSAGE_TO_HISTORY,
} from './actionTypes';

// Action Creators
export const fetchChatHistory = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/chat/${userId}`);
        dispatch({ type: FETCH_CHAT_HISTORY, payload: response.data });
    } catch (error) {
        console.error('Failed to fetch chat history', error);
    }
};

export const sendMessage = (userId, message) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/chat/${userId}`, { message });
        dispatch({ type: SEND_MESSAGE, payload: response.data });
        // Add the sent message to chat history without refetching
        dispatch(addMessageToHistory(response.data));
    } catch (error) {
        console.error('Failed to send message', error);
    }
};

export const addMessageToHistory = (message) => {
    return { type: ADD_MESSAGE_TO_HISTORY, payload: message };
};
