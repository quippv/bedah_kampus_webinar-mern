import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { typeScale, neutral, primary } from "../../utils";

const BUTTON_MODIFIERS = {
  small: () => `
        fonst-size: ${typeScale.helperText};
        padding: 8px 24px;
    `,
  large: () => `
        font-size: ${typeScale.h4};
        padding: 16px 80px;
        font-weight: bold;
    `,
  warning: ({ props }) => `
        background-color: ${props.theme.status.warningColor};
        color: ${props.theme.textColorInverted};

        &:hover, &:focus {
            background-color: ${props.theme.status.warningColorHover};
            border: 3px solid ${props.theme.status.warningColorHover};
        }

        &:active {
            background-color: ${props.theme.status.warningColorActive};
        }
    `,
  secondaryButtonWarning: ({ props }) => `
        background: none;
        border-color: ${props.theme.status.warningColor};
        color: ${props.theme.status.warningColor};

        &:hover {
            background: none;
            color: ${props.theme.status.warningColor};
        }
    `,
  tertiaryButtonWarning: ({ props }) => `
        background: none;
        color: ${props.theme.status.warningColor};

        &:hover {
            background: none;
            color: ${props.theme.status.warningColor};
        }
    `,
  icon: () => `
        width: 20px;
        height: 20px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background: ${neutral[300]}
  `,
  error: ({ props }) => `
    background: none;
    color: ${props.theme.status.errorColor};
    &:hover, &:focus {
      background-color: ${props.theme.status.errorColorHover};
      outline: 3px solid ${props.theme.status.errorColorHover};
      outline-offset: 2px;
      border: 2px solid transparent;
    }
    &:active {
      background-color: ${props.theme.status.errorColorActive};
    }
  `,
  primaryButtonError: ({ props }) => `
    background-color: ${props.theme.status.errorColor};
    color: ${props.theme.textColorInverted};
  `,
  secondaryButtonError: ({ props }) => `
    border: 2px solid ${props.theme.status.warningColor};
  `,
  success: ({ props }) => `
    background: none;
    color: ${props.theme.status.successColor};
    &:hover, &:focus {
      background-color: ${props.theme.status.successColorHover};
      outline: 3px solid ${props.theme.status.successColorHover};
      outline-offset: 2px;
      border: 2px solid transparent;
    }
    &:active {
      background-color: ${props.theme.status.successColorActive};
    }
  `,
  primaryButtonSuccess: ({ props }) => `
    background-color: ${props.theme.status.successColor};
    color: ${props.theme.textColorInverted};
  `,
  secondaryButtonSuccess: ({ props }) => `
    border: 2px solid ${props.theme.status.warningColor};
  `,
};

const Button = styled.button`
  padding: 12px 40px;
  font-size: ${typeScale.paragraph};
  border-radius: 50px;
  outline: none;
  cursor: pointer;
  font-family: ${(props) => props.theme.primaryFont};
  transition: background-color 0.2s linear, color 0.2s linear;

    &:hover {
        color: ${(props) => props.theme.textColorOnPrimary};
        filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.25));
    }

    &:focus {
        background-color: ${(props) => props.theme.primaryColor};
        color: ${(props) => props.theme.textColorOnPrimary};
        border: 3px solid ${(props) => props.theme.primaryColorActive};
    }

    &:active {
        background-color: ${(props) => props.theme.primaryColorHover};
        color: ${(props) => props.theme.textColorOnPrimary}
        border: 3px solid ${(props) => props.theme.primaryColorActive};
    }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColorOnPrimary};
  border: none;

  &:disabled {
    background-color: ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.textOnDisabled};
    cursor: not-allowed;
  }

  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;

export const SecondaryButton = styled(Button)`
  background: ${primary[500]};
  border: none;
  outline: none;
  color: ${neutral[100]};

  &:disabled {
    background: none;
    border-color: ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.textOnDisabled};
    cursor: not-allowed;
  }

  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
