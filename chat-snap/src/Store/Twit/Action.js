import axios from 'axios';

import api from "../../config/api";
import {
    FIND_TWEET_BY_ID_FAILURE,
    FIND_TWEET_BY_ID_SUCCESS,
    GET_ALL_TWEETS_FAILURE,
    GET_ALL_TWEETS_SUCCESS,
    GET_USERS_TWEET_FAILURE,
    GET_USERS_TWEET_SUCCESS,
    REPLY_TWEET_FAILURE,
    REPLY_TWEET_SUCCESS,
    RTWEET_FAILURE,
    RTWEET_SUCCESS,
    TWEET_CREATE_FAILURE,
    TWEET_CREATE_SUCCESS,
    TWEET_DELETE_FAILURE,
    TWEET_DELETE_SUCCESS,
    USER_LIKE_TWEET_FAILURE,
    USER_LIKE_TWEET_SUCCESS,
    SUBSCRIBE_USER_REQUEST,
    SUBSCRIBE_USER_SUCCESS,
    SUBSCRIBE_USER_FAILURE,
    LIKE_TWEET_SUCCESS,
    LIKE_TWEET_FAILURE,
    FETCH_COMMENTS_SUCCESS,
    ADD_COMMENT_SUCCESS
} from "./ActionType";

// Reusable request handler
const requestHandler = async (dispatch, actionType, apiCall) => {
    try {
        const { data } = await apiCall();
        dispatch({ type: actionType.SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.FAILURE, payload: error.message });
    }
};

// Action creators

export const getAllTweets = () => async (dispatch) => {
    await requestHandler(dispatch, {
        SUCCESS: GET_ALL_TWEETS_SUCCESS,
        FAILURE: GET_ALL_TWEETS_FAILURE,
    }, () => api.get("/api/twits/"));
};

export const getUsersTweet = (userId) => async (dispatch) => {
    await requestHandler(dispatch, {
        SUCCESS: GET_USERS_TWEET_SUCCESS,
        FAILURE: GET_USERS_TWEET_FAILURE,
    }, () => api.get(`/api/twits/user/${userId}`));
};

export const findTwitsById = (twitId) => async (dispatch) => {
    await requestHandler(dispatch, {
        SUCCESS: FIND_TWEET_BY_ID_SUCCESS,
        FAILURE: FIND_TWEET_BY_ID_FAILURE,
    }, () => api.get(`/api/twits/${twitId}`));
};

export const createTweet = (tweetData) => async (dispatch) => {
    await requestHandler(dispatch, {
        SUCCESS: TWEET_CREATE_SUCCESS,
        FAILURE: TWEET_CREATE_FAILURE,
    }, () => api.post(`/api/twits/create`, tweetData));
};

export const createTweetReply = (tweetData) => async (dispatch) => {
    await requestHandler(dispatch, {
        SUCCESS: REPLY_TWEET_SUCCESS,
        FAILURE: REPLY_TWEET_FAILURE,
    }, () => api.post(`/api/twits/reply`, tweetData));
};

export const createReTweet = (twitId) => async (dispatch) => {
    await requestHandler(dispatch, {
        SUCCESS: RTWEET_SUCCESS,
        FAILURE: RTWEET_FAILURE,
    }, () => api.put(`/api/twits/${twitId}/retwit`));
};

export const deleteTweet = (twitId) => async (dispatch) => {
    await requestHandler(dispatch, {
        SUCCESS: TWEET_DELETE_SUCCESS,
        FAILURE: TWEET_DELETE_FAILURE,
    }, () => api.delete(`/api/twits/${twitId}`));
};

export const subscribeUser = (subscriptionData) => async (dispatch) => {
    dispatch({ type: SUBSCRIBE_USER_REQUEST });
    try {
        const { data } = await axios.post('/api/subscription', subscriptionData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        dispatch({ type: SUBSCRIBE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SUBSCRIBE_USER_FAILURE, payload: error.message });
    }
};

// Consolidated likeTweet action creator using axios
export const likeTweet = (twitId) => async (dispatch) => {
    await requestHandler(dispatch, {
        SUCCESS: LIKE_TWEET_SUCCESS,
        FAILURE: LIKE_TWEET_FAILURE,
    }, () => api.post(`/api/${twitId}/likes`));
};

// Assuming you have a like-related action
export const findLikedTweetsByUserId = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/twits/user/${userId}/likes`);
        dispatch({ type: USER_LIKE_TWEET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LIKE_TWEET_FAILURE, payload: error.message });
    }
};
export const findTwitsByLikeContainUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/twits/user/${userId}/likes`);
        dispatch({ type: USER_LIKE_TWEET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LIKE_TWEET_FAILURE, payload: error.message });
    }
};

export const fetchCommentsSuccess = (tweetId, comments) => ({
    type: FETCH_COMMENTS_SUCCESS,
    payload: { tweetId, comments },
});

export const addCommentSuccess = (tweetId, comment) => ({
    type: ADD_COMMENT_SUCCESS,
    payload: { tweetId, comment },
});

// Async Thunks
export const fetchComments = (tweetId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/tweets/${tweetId}/comments`);
        const data = await response.json();
        dispatch(fetchCommentsSuccess(tweetId, data));
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};

export const addComment = (tweetId, comment) => async (dispatch) => {
    try {
        const response = await fetch(`/api/tweets/${tweetId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: comment }),
        });
        const data = await response.json();
        dispatch(addCommentSuccess(tweetId, data));
    } catch (error) {
        console.error('Error adding comment:', error);
    }
};