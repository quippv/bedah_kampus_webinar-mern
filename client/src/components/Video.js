import { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { neutral, error, primary } from "../utils";
import {
  Mic as MicIcon,
  MicOff,
  Video as VideoIcon,
  VideoOff,
} from "react-feather";
import { SecondaryButton } from "./UI";

const VideoWrapper = styled.div`
  width: 75%;
  transition: all 0.5s linear;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const HeaderVideo = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    padding-right: 40px;
  }

  @media (max-width: 700px) {
    button {
      font-size: 12px;
      padding: 10px 15px;
    }

    h1 {
      font-size: 16px;
      width: 70%;
    }
  }
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 74vh;
  border-radius: 20px;
  position: relative;
  user-select: none;

  iframe {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  @media (max-width: 700px) {
    height: 50vh;
  }
  @media (max-width: 400px) {
    height: 30vh;
  }
`;

const LiveWidget = styled.div`
  width: 90px;
  height: 37px;
  padding: 9px;
  display: flex;
  background: ${neutral[100]};
  border-radius: 5px;
  position: absolute;
  top: 15px;
  left: 15px;
  align-items: center;
  justify-content: center;

  span {
    display: block;
    width: 15px;
    height: 15px;
    background: ${error[100]};
    border-radius: 50%;
    margin-right: 15px;
    animation: animasi 0.8s linear infinite;
  }

  p {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: ${primary[100]};
  }

  @keyframes animasi {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 700px) {
    top: 10px;
    left: 10px;
    opacity: 0.68;
  }
`;

const CloseVideo = styled.div`
  width: 100%;
  height: 100%;
  background: ${neutral[600]};
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px;
  animation: animasiopacity 0.5s linear;

  @keyframes animasiopacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const FooterVideo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 20px;

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: ${neutral[500]};
  }

  svg {
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 50%;
    box-sizing: border-box;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.25);
    margin-bottom: 5px;

    &:active {
      transform: scale(1.1);
    }
  }
`;

const IconMic = styled(MicIcon)`
  background: ${neutral[100]};
`;

const IconVideo = styled(VideoIcon)`
  background: ${neutral[100]};
`;

const IconMicOff = styled(MicOff)`
  background: ${error[100]};
  color: ${neutral[100]};
`;

const IconVideoOff = styled(VideoOff)`
  background: ${error[100]};
  color: ${neutral[100]};
`;

export const Video = ({ id, mini }) => {
  const [muted, setMuted] = useState(false);
  const [closeVideo, setCloseVideo] = useState(false);
  const history = useHistory();

  const webinar = useSelector(
    (state) => state.webinar.webinars.filter((webinar) => webinar.id === id)[0]
  );

  const handlerFinishEvent = () => {
    history.go(0);
  };

  return (
    <VideoWrapper style={{ width: mini && "100%" }}>
      <HeaderVideo>
        <h1>{webinar && webinar.title}</h1>
        <SecondaryButton onClick={handlerFinishEvent}>
          Leave event
        </SecondaryButton>
      </HeaderVideo>
      <IframeContainer>
        <iframe
          src={`https://www.youtube.com/embed/VtO_qGRqpxE?autoplay=1&controls=1&modestbranding=1&playsinline=1&mute=${
            muted ? 1 : 0
          }`}
          frameBorder="0"
          allowFullScreen
          title={webinar && webinar.title}
        />
        <LiveWidget>
          <span></span>
          <p>Live</p>
        </LiveWidget>
        {closeVideo && <CloseVideo />}
      </IframeContainer>
      <FooterVideo>
        <Button onClick={() => setMuted(!muted)}>
          {muted ? <IconMicOff /> : <IconMic />}
          <p style={{ color: muted ? error[100] : neutral[500] }}>
            {muted ? "Mute" : "On"}
          </p>
        </Button>
        <Button onClick={() => setCloseVideo(!closeVideo)}>
          {closeVideo ? <IconVideoOff /> : <IconVideo />}
          <p style={{ color: closeVideo ? error[100] : neutral[500] }}>
            {closeVideo ? "No Video" : "Video"}
          </p>
        </Button>
      </FooterVideo>
    </VideoWrapper>
  );
};
