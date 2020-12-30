import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared";

const initState = {
  orders: [],
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_START:
      return updateObject(state, { loading: true });
    case actionTypes.ORDER_SUCCESS:
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat({ ...action.data }),
      });
    case actionTypes.ORDER_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.FETCH_ORDER_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDER_SUCCESS:
      return updateObject(state, {
        loading: false,
        orders: action.data,
      });
    case actionTypes.FETCH_ORDER_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

export default reducer;
