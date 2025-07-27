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
  ADD_COMMENT_SUCCESS,
  GET_TWITS_REQUEST,
  GET_TWITS_SUCCESS,
  GET_TWITS_FAILURE
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  twits: [],
  twit: null,
  likedTwits: [],
  subscription: null,
  subscriptionLoading: false,
  subscriptionError: null,
  comments: {}, // 🔧 centralized comments object { [tweetId]: [commentList] }
};

export const twitReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔁 Loading States
    case TWEET_CREATE_REQUEST:
    case TWEET_DELETE_REQUEST:
    case USER_LIKE_TWEET_REQUEST:
    case LIKE_TWEET_REQUEST:
    case RTWEET_REQUEST:
    case FIND_TWEET_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case SUBSCRIBE_USER_REQUEST:
      return { ...state, subscriptionLoading: true, subscriptionError: null };

    // ❌ Failures
    case TWEET_CREATE_FAILURE:
    case TWEET_DELETE_FAILURE:
    case USER_LIKE_TWEET_FAILURE:
    case LIKE_TWEET_FAILURE:
    case RTWEET_FAILURE:
    case FIND_TWEET_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SUBSCRIBE_USER_FAILURE:
      return {
        ...state,
        subscriptionLoading: false,
        subscriptionError: action.payload,
      };

    // ✅ Success Cases
    case TWEET_CREATE_SUCCESS:
      return { ...state, loading: false };

    case GET_ALL_TWEETS_SUCCESS:
    case GET_USERS_TWEET_SUCCESS:
      return { ...state, loading: false, twits: action.payload };

    case GET_TWITS_SUCCESS:
      const newTweets = action.payload;
      const uniqueTweets = [
        ...state.twits,
        ...newTweets.filter((twit) => !state.twits.some((t) => t.id === twit.id)),
      ];
      return { ...state, loading: false, twits: uniqueTweets };

    case FIND_TWEET_BY_ID_SUCCESS:
      return { ...state, loading: false, twit: action.payload };

    case USER_LIKE_TWEET_SUCCESS:
      return { ...state, loading: false, likedTwits: action.payload };

    case LIKE_TWEET_SUCCESS:
      return { ...state, loading: false }; // optional: you can update like count manually if needed

    case TWEET_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        twits: state.twits.filter((twit) => twit.id !== action.payload),
      };

    case RTWEET_SUCCESS:
      return { ...state, loading: false }; // optionally update twit.retwitUsersId

    case REPLY_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        twit: {
          ...state.twit,
          replyTwits: [action.payload, ...(state.twit?.replyTwits || [])],
        },
      };

    case SUBSCRIBE_USER_SUCCESS:
      return {
        ...state,
        subscription: action.payload,
        subscriptionLoading: false,
      };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.tweetId]: action.payload.comments,
        },
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.tweetId]: [
            ...(state.comments[action.payload.tweetId] || []),
            action.payload.comment,
          ],
        },
      };

    case GET_TWITS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
