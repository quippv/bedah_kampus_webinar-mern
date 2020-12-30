import * as actionTypes from "./actionTypes";
import axios from "../../axios_db";

export const orderStart = () => ({ type: actionTypes.ORDER_START });

export const orderSuccess = (data) => ({
  type: actionTypes.ORDER_SUCCESS,
  data,
});

export const orderError = (error) => ({ type: actionTypes.ORDER_FAIL, error });

export const addToOrder = (idWebinar, token) => {
  return (dispatch) => {
    dispatch(orderStart());

    const data = {
      webinar: idWebinar,
    };

    axios
      .post("/api/order", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(orderSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(orderError(error));
      });
  };
};

export const fetchOrderStart = () => ({ type: actionTypes.FETCH_ORDER_START });

export const fetchOrderSuccess = (data) => ({
  type: actionTypes.FETCH_ORDER_SUCCESS,
  data,
});

export const fetchOrderError = (error) => ({
  type: actionTypes.FETCH_ORDER_FAIL,
  error,
});

export const readAllOrder = (token) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());

    axios
      .get("/api/order", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(fetchOrderSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchOrderError(error));
      });
  };
};
