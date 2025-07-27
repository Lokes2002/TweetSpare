import {
    SUBSCRIBE_USER_REQUEST,
    SUBSCRIBE_USER_SUCCESS,
    SUBSCRIBE_USER_FAILURE, 
    FIND_TWEET_BY_ID_FAILURE, 
    FIND_TWEET_BY_ID_REQUEST, 
    FIND_TWEET_BY_ID_SUCCESS, 
    GET_ALL_TWEETS_SUCCESS, 
    GET_USERS_TWEET_SUCCESS, 
    LIKE_TWEET_FAILURE, 
    LIKE_TWEET_REQUEST, 
    LIKE_TWEET_SUCCESS, 
    REPLY_TWEET_SUCCESS, 
    RTWEET_FAILURE, 
    RTWEET_REQUEST, 
    RTWEET_SUCCESS, 
    TWEET_CREATE_FAILURE, 
    TWEET_CREATE_REQUEST, 
    TWEET_CREATE_SUCCESS, 
    TWEET_DELETE_FAILURE, 
    TWEET_DELETE_REQUEST, 
    TWEET_DELETE_SUCCESS, 
    USER_LIKE_TWEET_FAILURE, 
    USER_LIKE_TWEET_REQUEST, 
    USER_LIKE_TWEET_SUCCESS, 
    FETCH_COMMENTS_SUCCESS,
    ADD_COMMENT_SUCCESS
} from "./ActionType";

const initialState = {
    loading: false,
    data: null,
    error: null,
    twits: [],
    twit: null,
    like: null,
    retwit: null,
    subscription: null,
    subscriptionLoading: false,
    subscriptionError: null
};

export const twitReducer = (state = initialState, action) => {
    switch (action.type) {
        case TWEET_CREATE_REQUEST:
        case TWEET_DELETE_REQUEST:
        case USER_LIKE_TWEET_REQUEST:
        case LIKE_TWEET_REQUEST:
        case RTWEET_REQUEST:
        case FIND_TWEET_BY_ID_REQUEST:
        case SUBSCRIBE_USER_REQUEST:
            return { ...state, loading: true, error: null, subscriptionLoading: action.type === SUBSCRIBE_USER_REQUEST };

        case TWEET_CREATE_FAILURE:
        case TWEET_DELETE_FAILURE:
        case USER_LIKE_TWEET_FAILURE:
        case LIKE_TWEET_FAILURE:
        case RTWEET_FAILURE:
        case FIND_TWEET_BY_ID_FAILURE:
        case SUBSCRIBE_USER_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload, 
                subscriptionLoading: action.type === SUBSCRIBE_USER_FAILURE ? false : state.subscriptionLoading,
                subscriptionError: action.type === SUBSCRIBE_USER_FAILURE ? action.payload : state.subscriptionError
            };

        case TWEET_CREATE_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null, 
                twits: [action.payload, ...state.twits] 
            };

        case GET_ALL_TWEETS_SUCCESS:
        case GET_USERS_TWEET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                twits: action.payload,
            };

        case USER_LIKE_TWEET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                likedTwits: action.payload,
            };

        case LIKE_TWEET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                like: action.payload,
            };

        case TWEET_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                twits: state.twits.filter((twit) => twit.id !== action.payload),
            };

        case RTWEET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                retwit: action.payload,
            };

        case FIND_TWEET_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                twit: action.payload,
            };

        case REPLY_TWEET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                twit: {
                    ...state.twit,
                    replyTwits: [action.payload, ...state.twit.replyTwits]
                },
            };

        case SUBSCRIBE_USER_SUCCESS:
            return {
                ...state,
                subscriptionLoading: false,
                subscription: action.payload,
                subscriptionError: null
            };
            case FETCH_COMMENTS_SUCCESS:
                return {
                    ...state,
                    [action.payload.tweetId]: action.payload.comments,
                };
            case ADD_COMMENT_SUCCESS:
                return {
                    ...state,
                    [action.payload.tweetId]: [
                        ...(state[action.payload.tweetId] || []),
                        action.payload.comment,
                    ],
                };

        default:
            return state;
    }
};
