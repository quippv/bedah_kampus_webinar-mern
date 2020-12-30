import { Layout } from "../hoc";
import { useSelector } from "react-redux";
import { Events } from "../components";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const webinars = useSelector((state) => state.webinar.webinars);

  return (
    <Layout isAuth={isAuthenticated}>
      <Events title="Events" webinars={webinars} />
      <Events title="Your Events" webinars={webinars} itsMe={true} />
    </Layout>
  );
};

export default Home;
