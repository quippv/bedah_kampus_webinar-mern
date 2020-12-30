import styled from "styled-components";
import { Header, Jumbotron } from "../components";
import { neutral, typeScale } from "../utils";

const LayoutAuth = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: ${neutral[200]};
`;

const Main = styled.main`
  padding: 20px 0;

  @media (max-width: 700px) {
    padding: 40px 0 20px 0;
  }
`;

const TextCopyright = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: ${typeScale.h5};
  line-height: 21px;
  color: ${neutral[300]};
  width: 90%;
  margin: 0 auto;
`;

export const Layout = ({ children, isAuth }) => {
  return !isAuth ? (
    <>
      <Header isAuth={isAuth} />
      <Jumbotron />
      {children}
      <footer>Footer</footer>
    </>
  ) : (
    <LayoutAuth>
      <Header isAuth={isAuth} />
      <Main>{children}</Main>
      <TextCopyright>Copyright © 2020 Bedah Kampus</TextCopyright>
    </LayoutAuth>
  );
};
