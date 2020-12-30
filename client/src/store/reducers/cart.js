import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared";

const initState = {
  carts: [],
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CART_START:
      return updateObject(state, { loading: true });
    case actionTypes.CART_SUCCESS:
      return updateObject(state, {
        loading: false,
        carts: state.carts.concat({ ...action.data }),
      });
    case actionTypes.CART_DELETE:
      return updateObject(state, {
        loading: false,
        carts: state.carts.filter((cart) => cart._id !== action.data._id),
      });
    case actionTypes.CART_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.FETCH_CART_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_CART_SUCCESS:
      return updateObject(state, {
        loading: false,
        carts: action.data,
      });
    case actionTypes.FETCH_CART_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

export default reducer;
