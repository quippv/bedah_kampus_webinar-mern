import { useEffect } from "react";
import { Layout } from "../hoc";
import { useSelector } from "react-redux";

const Cart = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <Layout isAuth={isAuthenticated}>
      <h1>Cart</h1>
    </Layout>
  );
};

export default Cart;
