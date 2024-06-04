import { ThemeOptions, createTheme } from "@mui/material/styles";
import { darkThemeColor } from "./color";

// Create a theme instance.
const theme: ThemeOptions = createTheme({
  ...darkThemeColor,
  components: {
    // MuiBackdrop: {
    //   styleOverrides: {
    //     root: {
    //       background: cssColor.black,
    //     },
    //   },
    // },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },
});
// console.log("theme", darkThemeColor);

export default theme;
