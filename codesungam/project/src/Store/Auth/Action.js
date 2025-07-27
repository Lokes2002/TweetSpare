import {
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_SUCCESS,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGOUT,
    FIND_USER_BY_ID_REQUEST,
    FIND_USER_BY_ID_SUCCESS,
    FIND_USER_BY_ID_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    TWEET_CREATE_REQUEST,
    TWEET_CREATE_SUCCESS,
    TWEET_CREATE_FAILURE,
    GET_FOLLOWING_REQUEST,
    GET_FOLLOWING_SUCCESS,
    GET_FOLLOWING_FAILURE,
    GET_FOLLOWERS_REQUEST,
    GET_FOLLOWERS_SUCCESS,
    GET_FOLLOWERS_FAILURE,
} from "./ActionType";

import api, { API_BASE_URL } from "../../config/api";
import axios from "axios";

const getAuthHeaders = () => {
    const jwt = localStorage.getItem("jwt");
    return jwt ? { "Authorization": `Bearer ${jwt}` } : {};
};

export const loginUser = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: LOGIN_USER_FAILURE });
    }
};

export const registerUser = (registerData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: REGISTER_USER_FAILURE });
    }
};

export const getUserProfile = () => async (dispatch) => {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: getAuthHeaders()
        });
        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_USER_PROFILE_FAILURE });
    }
};

export const findUserById = (userId) => async (dispatch) => {
    dispatch({ type: FIND_USER_BY_ID_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}`, { headers: getAuthHeaders() });
        dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: FIND_USER_BY_ID_FAILURE });
    }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const { data } = await axios.put(`${API_BASE_URL}/api/users/update`, reqData, { headers: getAuthHeaders() });
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: UPDATE_USER_FAILURE });
    }
};

export const followUserAction = (userId) => async (dispatch) => {
    dispatch({ type: FOLLOW_USER_REQUEST });
    try {
        const { data } = await axios.put(`${API_BASE_URL}/api/users/${userId}/follow`, {}, { headers: getAuthHeaders() });
        dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: FOLLOW_USER_FAILURE });
    }
};

export const unfollowUserAction = (userId) => async (dispatch) => {
    dispatch({ type: UNFOLLOW_USER_REQUEST });
    try {
        const { data } = await axios.put(`${API_BASE_URL}/api/users/${userId}/unfollow`, {}, { headers: getAuthHeaders() });
        dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: UNFOLLOW_USER_FAILURE });
    }
};



export const getFollowers = (userId) => async (dispatch) => {
    dispatch({ type: GET_FOLLOWERS_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}/followers`, { headers: getAuthHeaders() });
        dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_FOLLOWERS_FAILURE });
    }
};

export const getFollowing = (userId) => async (dispatch) => {
    dispatch({ type: GET_FOLLOWING_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}/following`, { headers: getAuthHeaders() });
        dispatch({ type: GET_FOLLOWING_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_FOLLOWING_FAILURE });
    }
};


export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
};
