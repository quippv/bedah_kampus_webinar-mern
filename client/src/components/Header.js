import { useState } from "react";
import styled from "styled-components";
import { Navigation, SideBar } from "./Navigation";
import { neutral, text, typeScale } from "../utils";
import { PrimaryButton, ModalAuth } from "./UI";
import { Illustrator } from "../assets";

export const Header = ({ isAuth }) => {
  const [sideBar, setSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <Navigation
        openSideBar={() => setSideBar(!sideBar)}
        signInClick={() => setShowModal(!showModal)}
        isAuth={isAuth}
      />
      <SideBar
        showSideBar={() => setSideBar(!sideBar)}
        sideBar={sideBar}
        signInClick={() => setShowModal(!showModal)}
      />
      <ModalAuth
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        toggle={() => setIsSignUp(!isSignUp)}
        isSignUp={isSignUp}
      />
    </>
  );
};

const JumbotronWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: 30px 0 30px 90px;

  @media (max-width: 700px) {
    padding-left: 10px;
    flex-direction: column;
  }
`;

const JumbotronContent = styled.div`
  padding-top: 100px;
  transition: all 0.5s ease-out;

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    color: ${text.text};
  }

  h2 {
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.01em;
    color: ${text.text};
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: ${typeScale.paragraph};
    line-height: 19px;
    color: ${neutral[500]};
    margin-top: 40px;
  }

  button {
    border-radius: 0px 100px 100px 100px;
    margin-top: 40px;
  }

  @media (max-width: 700px) {
    padding-top: 50px;
  }
`;

const JumbotronImage = styled.img`
  display: block;
  width: 60%;
  transition: all 0.5s ease-out;

  @media (max-width: 700px) {
    width: 100%;
    margin-top: 30px;
  }
`;

export const Jumbotron = () => {
  return (
    <JumbotronWrapper>
      <JumbotronContent>
        <h1>Book an exclusive</h1>
        <h2>webinar for your college information</h2>
        <p>
          Each information is hand-picked, <br />
          Find out the study environment of your dreams
        </p>
        <PrimaryButton modifiers="large">Explore Events</PrimaryButton>
      </JumbotronContent>
      <JumbotronImage
        src={Illustrator.BannerJumbotron}
        alt="Banner Jumbotron"
      />
    </JumbotronWrapper>
  );
};
