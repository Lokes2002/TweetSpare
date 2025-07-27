import {
    GET_FOLLOWERS_REQUEST,
    GET_FOLLOWERS_SUCCESS,
    GET_FOLLOWERS_FAILURE,
    GET_FOLLOWING_REQUEST,
    GET_FOLLOWING_SUCCESS,
    GET_FOLLOWING_FAILURE,
    FIND_USER_BY_ID_SUCCESS,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWING_SUCCESS,
} from "./ActionType";

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
    updateUser: false,
    findUser: null,
    followers: [],
    following: [],
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWERS_REQUEST:
        case GET_FOLLOWING_REQUEST:
            return { ...state, loading: true };

        case GET_FOLLOWERS_SUCCESS:
            return { ...state, loading: false, followers: action.payload };

        case GET_FOLLOWING_SUCCESS:
            return { ...state, loading: false, following: action.payload };

        case GET_FOLLOWERS_FAILURE:
        case GET_FOLLOWING_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_PROFILE_REQUEST:
        case UPDATE_USER_REQUEST:
        case FOLLOW_USER_REQUEST:
            return { ...state, loading: true, error: null, updateUser: false };

        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload.jwt, user: null };

        case GET_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload };

        case UPDATE_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload, updateUser: true };

        case FIND_USER_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, findUser: action.payload };

        case FOLLOW_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: { ...state.user, following: (state.user.following || 0) + 1 } };

        case FETCH_FOLLOWERS_SUCCESS:
            return { ...state, loading: false, error: null, followers: action.payload };

        case FETCH_FOLLOWING_SUCCESS:
            return { ...state, loading: false, error: null, following: action.payload };


        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
        case GET_USER_PROFILE_FAILURE:
        case UPDATE_USER_FAILURE:
        case FOLLOW_USER_FAILURE:
            return { ...state, loading: false, error: action.payload, updateUser: false };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};

export default authReducer;
