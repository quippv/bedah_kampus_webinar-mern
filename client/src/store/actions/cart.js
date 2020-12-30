import * as actionTypes from "./actionTypes";
import axios from "../../axios_db";

export const cartStart = () => ({ type: actionTypes.CART_START });

export const cartSuccess = (data) => ({ type: actionTypes.CART_SUCCESS, data });

export const cartError = (error) => ({ type: actionTypes.CART_FAIL, error });

export const addToCart = (idWebinar, token) => {
  return (dispatch) => {
    dispatch(cartStart());

    const data = {
      webinar: idWebinar,
    };

    axios
      .post("/api/cart", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(cartSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(cartError(error));
      });
  };
};

export const fetchCartStart = () => ({ type: actionTypes.FETCH_CART_START });

export const fetchCartSuccess = (data) => ({
  type: actionTypes.FETCH_CART_SUCCESS,
  data,
});

export const fetchCartError = (error) => ({
  type: actionTypes.FETCH_CART_FAIL,
  error,
});

export const readAllCart = (token) => {
  return (dispatch) => {
    dispatch(fetchCartStart());

    axios
      .get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(fetchCartSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchCartError(error));
      });
  };
};

export const cartDelete = (data) => ({ type: actionTypes.CART_DELETE, data });

export const deleteCart = (id, token) => {
  return (dispatch) => {
    dispatch(cartStart());

    axios
      .delete(`/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(cartDelete(response.data.data));
      })
      .catch((error) => {
        dispatch(cartError(error));
      });
  };
};
