import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared";

const initialState = {
  users: null,
  token: null,
  loading: false,
  error: null,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        users: action.users,
        token: action.token,
        loading: false,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.path });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { ...initialState });
    default:
      return state;
  }
};

export default reducer;
