import styled from "styled-components";
import { User } from "react-feather";
import { neutral, primary } from "../../utils";

const AttendeeWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    height: 30px;
    width: 30px;
    padding: 5px;
    background: ${primary[500]};
    color: ${neutral[100]};
    border-radius: 50%;
    margin-right: 15px;
  }

  .name {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;
    color: ${neutral[600]};
    text-transform: capitalize;
  }
`;

export const Attendee = ({ children }) => {
  return (
    <AttendeeWrapper>
      <User />
      <p className="name">{children}</p>
    </AttendeeWrapper>
  );
};
