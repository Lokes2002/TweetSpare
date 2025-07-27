// src/Store/Comment/commentReducer.js
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  POST_COMMENT_SUCCESS,
  LIKE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
} from "./commentActions";

const initialState = {
  comments: [],
  loading: false,
  error: null,
  last: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, ...action.payload.comments],
        last: action.payload.last,
      };

    case FETCH_COMMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };

    case LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id === action.payload
            ? { ...c, likedBy: [...c.likedBy, "you"] } // adjust logic as needed
            : c
        ),
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };

    default:
      return state;
  }
};

export default commentReducer;
