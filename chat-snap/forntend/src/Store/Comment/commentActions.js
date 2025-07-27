// src/Store/Comment/commentActions.js
import api from "../../config/api";


export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";

export const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS";
export const LIKE_COMMENT_SUCCESS = "LIKE_COMMENT_SUCCESS";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";

// ✅ Fetch paginated comments
export const fetchComments = (twitId, page = 0, size = 5) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });
  try {
    const res = await api.get(`/comments/${twitId}?page=${page}&size=${size}`);
    dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      payload: {
        comments: res.data.content,
        last: res.data.last,
      },
    });
  } catch (err) {
    dispatch({
      type: FETCH_COMMENTS_FAILURE,
      payload: err.message,
    });
  }
};

// ✅ Post comment
export const postComment = (twitId, content) => async (dispatch) => {
  try {
    const res = await api.post(`/comments/${twitId}`, content, {
      headers: { "Content-Type": "text/plain" },
    });
    dispatch({
      type: POST_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error("Post comment error:", err);
  }
};

// ✅ Like comment
export const likeComment = (commentId) => async (dispatch) => {
  try {
    await api.post(`/comments/like/${commentId}`);
    dispatch({
      type: LIKE_COMMENT_SUCCESS,
      payload: commentId,
    });
  } catch (err) {
    console.error("Like comment error:", err);
  }
};

// ✅ Delete comment
export const deleteComment = (commentId) => async (dispatch) => {
  try {
    await api.delete(`/comments/${commentId}`);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: commentId,
    });
  } catch (err) {
    console.error("Delete comment error:", err);
  }
};
