import styled from "styled-components";
import { neutral, primary, error } from "../../utils";
import { Send } from "react-feather";

const MessageWrapped = styled.div`
  width: 100%;
  height: 95px;
  border-radius: 0 0 20px 20px;
  border-top: 1px solid ${neutral[300]};
  padding: 13px 15px;
  transition: all 0.5s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderMessage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  svg {
    width: 20px;
    height: 20px;
    color: ${neutral[300]};
    cursor: pointer;
    margin-right: 10px;
  }

  .error-text {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: ${error[100]};
  }
`;

const InputWrapped = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  textarea {
    outline: none;
    border: none;
    resize: none;
    width: 100%;
    height: 100%;
    margin-right: 10px;
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
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${neutral[300]};
    cursor: pointer;
  }
`;

export const Message = ({
  touch,
  value,
  handlerChangeMessage,
  handlerSendMessage,
  error,
  handlerImageSend,
}) => {
  return (
    <MessageWrapped style={{ height: touch && 150 }}>
      <HeaderMessage>
        <p className="error-text">{error}</p>
      </HeaderMessage>
      <InputWrapped>
        <textarea
          placeholder="Write your message..."
          onChange={handlerChangeMessage}
          value={value}
        />
        <Send
          onClick={touch ? handlerSendMessage : undefined}
          style={{ color: touch && primary[100] }}
        />
      </InputWrapped>
    </MessageWrapped>
  );
};
