import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose, applyMiddleware, combineReducers, createStore } from "redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import auth from "./store/reducers/auth";
import webinar from "./store/reducers/webinar";
import cart from "./store/reducers/cart";
import bookmark from "./store/reducers/bookmark";
import order from "./store/reducers/order";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const reducers = combineReducers({
  auth,
  webinar,
  cart,
  bookmark,
  order,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
