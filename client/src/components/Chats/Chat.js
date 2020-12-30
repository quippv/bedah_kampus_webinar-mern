import styled from "styled-components";
import { User } from "react-feather";
import { neutral, primary } from "../../utils";

const ChatWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  width: 100%;
  align-items: flex-end;

  svg {
    height: 30px;
    width: 30px;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 50%;
    background: ${neutral[200]};
  }
`;

const MessageWrapper = styled.div`
  .chatnameanddate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    text-transform: capitalize;

    .name {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: ${neutral[300]};
    }

    .date {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: ${neutral[300]};
    }
  }

  .chatmessages {
    width: 175px;
    padding: 10px;
    background: ${neutral[200]};
    border-radius: 10px 10px 10px 0px;
    display: block;
    word-wrap: break-word;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: ${neutral[600]};
  }
`;

export const Chat = ({ children, id, socketId, admin, name, date }) => {
  const leftComponent = (
    <>
      <User style={{ marginRight: 8 }} />
      <MessageWrapper>
        <div className="chatnameanddate">
          <p className="name">{name.substring(0, 15)}</p>
          <p className="date">{date}</p>
        </div>
        <p className="chatmessages">{children}</p>
      </MessageWrapper>
    </>
  );

  const rightComponent = (
    <>
      <MessageWrapper>
        <div className="chatnameanddate">
          <p className="date">{date}</p>
          <p className="name">{name.substring(0, 15)}</p>
        </div>
        <p
          className="chatmessages"
          style={{ background: primary[500], color: neutral[100] }}
        >
          {children}
        </p>
      </MessageWrapper>
      <User
        style={{ marginLeft: 8, background: primary[500], color: neutral[100] }}
      />
    </>
  );

  return (
    <ChatWrapper
      style={{
        justifyContent:
          socketId === id ? (!admin ? "flex-end" : "flex-start") : "flex-start",
      }}
    >
      {socketId === id
        ? !admin
          ? rightComponent
          : leftComponent
        : leftComponent}
    </ChatWrapper>
  );
};
