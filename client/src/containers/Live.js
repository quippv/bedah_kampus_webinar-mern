import { useState } from "react";
import styled from "styled-components";
import { Video } from "../components";
import { Chats } from "../components/Chats/Chats";
import { neutral } from "../utils";
import { useParams } from "react-router";

const LiveFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;
  width: 100%;
  padding: 20px;
  background: ${neutral[200]};
  position: relative;

  @media (max-width: 1024px) {
    padding: 20px 10px;
  }
`;

const Live = () => {
  const { id } = useParams;
  const [minimize, setMinimize] = useState(false);

  const handlerMinimize = () => {
    setMinimize(!minimize);
  };

  return (
    <LiveFlex>
      <Video id={id} mini={minimize} />
      <Chats clickMini={handlerMinimize} mini={minimize} />
    </LiveFlex>
  );
};

export default Live;
