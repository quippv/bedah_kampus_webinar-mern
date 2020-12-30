import * as actionTypes from "./actionTypes";
import axios from "../../axios_db";

export const fetchWebinarStart = () => ({
  type: actionTypes.FETCH_WEBINAR_START,
});

export const fetchWebinarSuccess = (data) => ({
  type: actionTypes.FETCH_WEBINAR_SUCCESS,
  data,
});

export const fetchWebinarFail = (error) => ({
  type: actionTypes.FETCH_WEBINAR_FAIL,
  error,
});

export const readAllWebinar = () => {
  return (dispatch) => {
    dispatch(fetchWebinarStart());
    axios
      .get("/webinar")
      .then((response) => {
        dispatch(fetchWebinarSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchWebinarFail(error));
      });
  };
};
