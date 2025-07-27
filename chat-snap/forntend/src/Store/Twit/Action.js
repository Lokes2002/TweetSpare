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

    GET_TWITS_REQUEST,
    GET_TWITS_SUCCESS,
    GET_TWITS_FAILURE,
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


export const findTwitsByLikeContainUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/twits/user/${userId}/likes`);
        dispatch({ type: USER_LIKE_TWEET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LIKE_TWEET_FAILURE, payload: error.message });
    }
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

// Delete tweet
export const deleteTweet = (twitId) => async (dispatch) => {
  await requestHandler(dispatch, {
    SUCCESS: TWEET_DELETE_SUCCESS,
    FAILURE: TWEET_DELETE_FAILURE,
  }, () => api.delete(`/api/twits/${twitId}`));
};

// Like tweet
export const likeTweet = (twitId) => async (dispatch) => {
  await requestHandler(dispatch, {
    SUCCESS: LIKE_TWEET_SUCCESS,
    FAILURE: LIKE_TWEET_FAILURE,
  }, () => api.post(`/api/${twitId}/likes`));
};

// Get liked tweets of user
export const findLikedTweetsByUserId = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/twits/user/${userId}/likes`);
    dispatch({ type: USER_LIKE_TWEET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIKE_TWEET_FAILURE, payload: error.message });
  }
};

// Increment tweet view count
export const incrementTweetView = (twitId) => async () => {
  try {
    await api.put(`/api/twits/${twitId}/increment-view`);
  } catch (error) {
    console.error("Error incrementing view:", error.message);
  }
};

// Get paginated tweets
export const getPaginatedTweets = (page = 0, size = 10) => async (dispatch) => {
  try {
    dispatch({ type: GET_TWITS_REQUEST });
    const { data } = await api.get(`/api/twits/paginated?page=${page}&size=${size}`);
    dispatch({ type: GET_TWITS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TWITS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

