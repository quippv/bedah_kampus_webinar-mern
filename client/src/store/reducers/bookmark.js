import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared";

const initState = {
  bookmarks: [],
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.BOOKMARK_START:
      return updateObject(state, { loading: true });
    case actionTypes.BOOKMARK_SUCCESS:
      return updateObject(state, {
        loading: false,
        bookmarks: state.bookmarks.concat({ ...action.data }),
      });
    case actionTypes.BOOKMARK_DELETE:
      return updateObject(state, {
        loading: false,
        bookmarks: state.bookmarks.filter(
          (cart) => cart._id !== action.data._id
        ),
      });
    case actionTypes.BOOKMARK_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.FETCH_BOOKMARK_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_BOOKMARK_SUCCESS:
      return updateObject(state, {
        loading: false,
        bookmarks: action.data,
      });
    case actionTypes.FETCH_BOOKMARK_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

export default reducer;
