import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { neutral, typeScale, text, error } from "../../utils";

const INPUT_MODIFIER = {
  invalid: () => `
    border-color: ${error[100]};
    color: ${error[100]};
  `,
  valid: () => `
    color: ${text.text};
  `,
  search: () => `
    height: unset;
    padding: 20px 0 0 0;
    border: unset;
    border-bottom: 2px solid ${neutral[300]};
    background: transparent;
    border-radius: unset;
    transition: all 0.5s linear;
  `,
};

export const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 10px 20px;
  background: ${neutral[200]};
  border: 2px solid ${neutral[300]};
  box-sizing: border-box;
  border-radius: 8px;
  outline: none;
  font-style: normal;
  font-weight: normal;
  font-size: ${typeScale.paragraph};
  line-height: 19px;
  color: ${neutral[300]};
  margin-bottom: 15px;

  &:focus {
    color: ${text.text};
  }

  ${applyStyleModifiers(INPUT_MODIFIER)}
`;

export const ErrorText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: ${typeScale.helperText};
  line-height: 16px;
  color: ${error[100]};
  margin-bottom: 15px;
  margin-top: -10px;
`;
