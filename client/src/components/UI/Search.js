import { useState, useRef } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { Search as SearchIcon } from "react-feather";
import { neutral, text, primary } from "../../utils";

const InputSearch = styled(animated.input)`
  border: none;
  border-bottom: 2px solid ${primary[100]};
  outline: none;
  background: transparent;
  color: ${text.text};
  margin-left: 10px;

  @media (max-width: 700px) {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    width: 90% !important;
    transform: translateX(3%);
    border: 2px solid ${neutral[300]};
    padding: 10px;
    background: ${neutral[100]};
    border-radius: 5px;
  }
`;

export const Search = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const animation = useSpring({
    width: open ? 300 : 0,
    opacity: open ? 1 : 0,
  });

  const toggleHandler = () => {
    setOpen(!open);
    !open ? ref.current.focus() : ref.current.blur();
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <SearchIcon
        color={open ? primary[100] : neutral[300]}
        style={{ cursor: "pointer" }}
        onClick={toggleHandler}
      />
      <InputSearch ref={ref} style={animation} placeholder="Search..." />
    </div>
  );
};
