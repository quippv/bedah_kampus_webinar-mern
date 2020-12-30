import * as actionTypes from "./actionTypes";
import axios from "../../axios_db";

export const auth = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (users, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    users,
    token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path,
  };
};

export const authLogout = () => {
  localStorage.removeItem("users");
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authData = (users, isSignUp) => {
  return (dispatch) => {
    dispatch(auth());

    const url = isSignUp ? "/signup" : "/signin";

    axios
      .post(url, users)
      .then((response) => {
        dispatch(authSuccess(response.data.user, response.data.token));
        dispatch(authRedirectPath("/home"));
        localStorage.setItem("users", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        dispatch(authFail("Please check your email and password"));
      });
  };
};

export const setAuthLogout = (token) => {
  return (dispatch) => {
    dispatch(auth());

    axios
      .post("/api/user/signout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(authLogout());
        dispatch(authRedirectPath("/"));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const checAuthentication = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const user = JSON.parse(localStorage.getItem("users"));
      if (user) {
        dispatch(authSuccess(user, token));
        dispatch(authRedirectPath("/home"));
      } else {
        dispatch(authFail("Error Login"));
        dispatch(authLogout());
      }
    }
  };
};
