import * as actionTypes from "./actionTypes";
import axios from "../../axios_db";

export const bookmarkStart = () => ({ type: actionTypes.BOOKMARK_START });

export const bookmarkSuccess = (data) => ({
  type: actionTypes.BOOKMARK_SUCCESS,
  data,
});

export const bookmarkError = (error) => ({
  type: actionTypes.BOOKMARK_FAIL,
  error,
});

export const addToBookmark = (idWebinar, token) => {
  return (dispatch) => {
    dispatch(bookmarkStart());

    const data = {
      webinar: idWebinar,
    };

    axios
      .post("/api/bookmark", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(bookmarkSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(bookmarkError(error));
      });
  };
};

export const fetchBookmarkStart = () => ({
  type: actionTypes.FETCH_BOOKMARK_START,
});

export const fetchBookmarkSuccess = (data) => ({
  type: actionTypes.FETCH_BOOKMARK_SUCCESS,
  data,
});

export const fetchBookmarkError = (error) => ({
  type: actionTypes.FETCH_BOOKMARK_FAIL,
  error,
});

export const readAllBookmark = (token) => {
  return (dispatch) => {
    dispatch(fetchBookmarkStart());

    axios
      .get("/api/bookmark", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(fetchBookmarkSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchBookmarkError(error));
      });
  };
};

export const bookmarkDelete = (data) => ({
  type: actionTypes.BOOKMARK_DELETE,
  data,
});

export const deleteBookmark = (id, token) => {
  return (dispatch) => {
    dispatch(bookmarkStart());

    axios
      .delete(`/api/bookmark/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(bookmarkDelete(response.data.data));
      })
      .catch((error) => {
        dispatch(bookmarkError(error));
      });
  };
};
