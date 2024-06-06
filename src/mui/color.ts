import { ThemeOptions } from "@mui/material/styles";
("use strict");

export const cssColor = {
  white: "#cecece",
  cyan: "#398180",
  pink: "#a40874",
  blue: "#085073",
  darkBlue: "#164c4c",
  black: "#181e34",
  disabled: "#5e1b1b61",
  hover: "#ffffff19",
  red: "#b71b1b",
  green: "#0f9249",
  sky: "#7d91d6",
  gold: "#baa050",
  gray: "#6b6b6b95",
};

export const darkThemeColor: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: cssColor.cyan,
      contrastText: cssColor.white,
      dark: cssColor.darkBlue,
    },
    secondary: {
      main: cssColor.pink,
      contrastText: cssColor.white,
    },
    text: {
      secondary: cssColor.sky,
      primary: cssColor.white,
      disabled: cssColor.disabled,
    },
    background: {
      default: cssColor.black,
      paper: cssColor.blue,
    },
    success: {
      main: cssColor.green,
      contrastText: cssColor.white,
    },
    error: {
      main: cssColor.red,
      dark: cssColor.red,
      contrastText: cssColor.white,
    },
  },
};
