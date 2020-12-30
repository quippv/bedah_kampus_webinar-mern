import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import unescape from "validator/es/lib/unescape";
import styled from "styled-components";
import { neutral } from "../../utils";
import { Minimize2, Maximize2 } from "react-feather";
import { Message } from "./Message";
import { Chat } from "./Chat";
import { Attendee } from "./Attendee";

const ChatsWrapper = styled.div`
  width: 23%;
  height: 100%;
  background: ${neutral[100]};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  position: relative;
  transition: all 0.5s linear;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1024px) {
    position: absolute;
    top: 25px;
    right: 10px;
    width: 90%;
    height: 95%;
  }

  @keyframes opacityAnimasi {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const MinimizeIcon = styled(Minimize2)`
  position: absolute;
  width: 20px;
  height: 20px;
  color: ${neutral[300]};
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const MaximizeIcon = styled(Maximize2)`
  position: absolute;
  width: 20px;
  height: 20px;
  color: ${neutral[300]};
  top: 15px;
  right: 15px;
  cursor: pointer;
  transition: all 0.5s linear;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  animation: opacityAnimasi 1.2s linear;
  padding: 30px 20px 15px 20px;

  h5 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    margin-left: 20px;
    text-align: center;
    color: ${neutral[400]};
    cursor: pointer;
  }
`;

const ChatWrapper = styled.div`
  padding: 0 20px 15px 20px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const AttendeeWrapper = styled.div`
  padding: 0 20px 15px 20px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Chats = ({ clickMini, mini }) => {
  const [attendee, setAttendee] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const mess = useRef();
  const socket = useRef();
  const { id } = useParams();
  const history = useHistory();
  const name = useSelector((state) => state.auth.users.name);
  const idUser = useSelector((state) => state.auth.users._id);
  const [touch, setTouch] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    socket.current = io.connect("http://localhost:5000/");

    socket.current.emit(
      "join",
      { username: name, idUser, room: id },
      (error) => {
        if (error) {
          setError(error);
          history.push("/home");
        }
      }
    );
  }, [id, name, history, idUser]);

  useEffect(() => {
    socket.current.on("message", (message) => {
      setMessages([
        ...messages,
        {
          username: message.username,
          message: message.text,
          createdAt: moment(message.createdAt).format("h:mm a"),
          idUser: message.idUser,
          socketId: message.id,
        },
      ]);
    });
  }, [messages]);

  useEffect(() => {
    socket.current.on("attendee", (attendee) => {
      setAttendees(attendee);
    });
  }, [attendees]);

  const handlerChangeMessage = (event) => {
    setValue(unescape(event.target.value));
    event.target.value === "" ? setTouch(false) : setTouch(true);
  };

  const handlerSendMessage = () => {
    socket.current.emit("sendMessage", value, (error) => {
      setValue("");
      setTouch(false);
      autoScroll();
      setError("");

      if (error) {
        return setError(error);
      }
    });
  };

  const handlerAttendee = () => {
    setAttendee(!attendee);
  };

  const autoScroll = () => {
    const $newMessage = mess.current.lastElementChild;

    const newMessageStyles = getComputedStyle($newMessage);

    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    const visibleHeight = mess.current.offsetHeight;
    const containerHeight = mess.current.scrollHeight;

    const scrollOffset = mess.current.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight >= scrollOffset) {
      mess.current.scrollTop = mess.current.scrollHeight;
    }
  };

  return (
    <ChatsWrapper
      style={{
        width: mini && 30,
        height: mini && 30,
        borderRadius: mini && 5,
        marginLeft: mini && 15,
        padding: mini && "unset",
      }}
    >
      {mini ? (
        <MaximizeIcon
          onClick={clickMini}
          style={{
            transform: "translate(10px, -10px)",
          }}
        />
      ) : (
        <MinimizeIcon onClick={clickMini} />
      )}
      {!mini && (
        <>
          <HeaderWrapper>
            <h5
              style={{ color: !attendee && neutral[600] }}
              onClick={handlerAttendee}
            >
              Chat
            </h5>
            <h5
              style={{ color: attendee && neutral[600] }}
              onClick={handlerAttendee}
            >
              Attendee
            </h5>
          </HeaderWrapper>

          {!attendee ? (
            <>
              <ChatWrapper ref={mess}>
                {messages.map((message, index) => (
                  <Chat
                    key={index}
                    id={message.socketId}
                    socketId={socket.current.id}
                    admin={message.idUser === "admin1233"}
                    name={message.username}
                    date={message.createdAt}
                  >
                    {message.message}
                  </Chat>
                ))}
              </ChatWrapper>
              <Message
                touch={touch}
                value={value}
                error={error}
                handlerChangeMessage={handlerChangeMessage}
                handlerSendMessage={handlerSendMessage}
              />
            </>
          ) : (
            <AttendeeWrapper>
              {attendees.map((attendee) => (
                <Attendee key={attendee.username}>{attendee.username}</Attendee>
              ))}
            </AttendeeWrapper>
          )}
        </>
      )}
    </ChatsWrapper>
  );
};
