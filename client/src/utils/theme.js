import { primary, neutral, text, success, warning, error } from "./colors";
import { primaryFont } from "./typography";

export const defaultTheme = {
  primaryColor: primary[100],
  primaryColorHover: primary[100],
  primaryColorActive: primary[300],
  textColorOnPrimary: text.inverted,
  textColor: text.text,
  textColorInverted: text.inverted,
  disabled: neutral[400],
  textOnDisabled: primary[300],
  formElementBackground: neutral[100],
  textOnElementBackground: text.text,
  primaryFont,
  status: {
    warningColor: warning[100],
    warningColorHover: warning[200],
    warningColorActive: warning[300],
    errorColor: error[100],
    errorColorHover: error[200],
    errorColorActive: error[300],
    successColor: success[100],
    successColorHover: success[200],
    successColorActive: success[300],
  },
};
