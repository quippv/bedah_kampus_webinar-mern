import { Suspense, lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import { ThemeProvider } from "styled-components";
import { Global, defaultTheme } from "./utils";
import {
  checAuthentication,
  readAllWebinar,
  readAllBookmark,
  readAllCart,
  readAllOrder,
} from "./store/actions";

const Landing = lazy(() => {
  return import("./containers/Landing");
});

const About = lazy(() => {
  return import("./containers/About");
});

const Home = lazy(() => {
  return import("./containers/Home");
});

const Cart = lazy(() => {
  return import("./containers/Cart");
});

const Live = lazy(() => {
  return import("./containers/Live");
});

function App() {
  const dispatch = useDispatch();
  const isAuthentication = useSelector((state) => state.auth.token !== null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(checAuthentication());
    dispatch(readAllWebinar());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthentication) {
      dispatch(readAllCart(token));
      dispatch(readAllBookmark(token));
      dispatch(readAllOrder(token));
    }
  }, [dispatch, token, isAuthentication]);

  let router = (
    <Switch>
      <Route path="/about" render={(props) => <About {...props} />} />
      <Route path="/" exact render={(props) => <Landing {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthentication) {
    router = (
      <Switch>
        <Route path="/webinar/:id" render={(props) => <Live {...props} />} />
        <Route path="/cart" render={(props) => <Cart {...props} />} />
        <Route path="/home" exact render={(props) => <Home {...props} />} />
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Suspense fallback={<p>Loading...</p>}>{router}</Suspense>
      <Global />
    </ThemeProvider>
  );
}

export default App;
