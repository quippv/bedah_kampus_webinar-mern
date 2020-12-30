import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared";

const initState = {
  webinars: [],
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEBINAR_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_WEBINAR_SUCCESS:
      return updateObject(state, { loading: false, webinars: action.data });
    case actionTypes.FETCH_WEBINAR_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

export default reducer;
