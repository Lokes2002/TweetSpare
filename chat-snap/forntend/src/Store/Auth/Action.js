import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
  FIND_USER_BY_ID_REQUEST,
  FIND_USER_BY_ID_SUCCESS,
  FIND_USER_BY_ID_FAILURE,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILURE,
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOWING_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  LOGOUT,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
} from "./ActionType";

const API_BASE_URL = "http://localhost:5000";

const getAuthHeaders = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
};

// LOGIN
export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const { jwt, success, message } = res.data;

    if (!success && message === "Email not verified") {
      dispatch({ type: LOGIN_USER_FAILURE, payload: "Email not verified" });
      return Promise.reject("Email not verified");
    }

    localStorage.setItem("jwt", jwt);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: { jwt } });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// REGISTER
export const registerUser = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.response?.data?.message });
  }
};

// VERIFY EMAIL
export const verifyEmail = (token) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_EMAIL_REQUEST });
    const response = await axios.get(`${API_BASE_URL}/auth/verify?token=${token}`);
    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: response.data.message });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_FAILURE,
      payload: error.response?.data?.message || "Verification failed",
    });
  }
};

// PROFILE & UPDATE
export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: getAuthHeaders(),
    });
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_PROFILE_FAILURE });
  }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}/api/users/update`, reqData, {
      headers: getAuthHeaders(),
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE });
  }
};

// FOLLOW / UNFOLLOW
export const followUserAction = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}/api/users/${userId}/follow`, {}, {
      headers: getAuthHeaders(),
    });
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FOLLOW_USER_FAILURE });
  }
};

export const unfollowUserAction = (userId) => async (dispatch) => {
  try {
    await axios.put(`${API_BASE_URL}/api/users/${userId}/unfollow`, {}, {
      headers: getAuthHeaders(),
    });
    dispatch({ type: UNFOLLOW_USER_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};

// FIND USER BY ID
export const findUserById = (userId) => async (dispatch) => {
  dispatch({ type: FIND_USER_BY_ID_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
      headers: getAuthHeaders(),
    });
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_USER_BY_ID_FAILURE });
  }
};

// FOLLOWERS & FOLLOWING
export const getFollowers = (userId) => async (dispatch) => {
  dispatch({ type: GET_FOLLOWERS_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}/followers`, {
      headers: getAuthHeaders(),
    });
    dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_FOLLOWERS_FAILURE });
  }
};

export const getFollowing = (userId) => async (dispatch) => {
  dispatch({ type: GET_FOLLOWING_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}/following`, {
      headers: getAuthHeaders(),
    });
    dispatch({ type: GET_FOLLOWING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_FOLLOWING_FAILURE });
  }
};

// GOOGLE LOGIN
export const loginWithGoogle = (token) => async (dispatch) => {
  dispatch({ type: GOOGLE_LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/google`, { token });
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      const decoded = jwtDecode(data.jwt);
      localStorage.setItem("userId", decoded.userId);
    }
    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GOOGLE_LOGIN_FAILURE, payload: error.response?.data?.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userId");
  dispatch({ type: LOGOUT });
};
