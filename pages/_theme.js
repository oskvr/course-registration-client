import { createTheme } from "@mui/material";
export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "hsl(220, 20%, 8%)",
      paper: "hsl(220, 30%, 8%)",
      paperLight: "hsl(220, 20%, 14%)",
    },
    divider: "hsl(220, 20%, 20%)",
    // primary: {
    //   main: "hsl(210, 85%, 63%)",
    // },
    text: {
      secondary: "hsl(220, 25%, 70%)",
    },
  },
  // palette: {
  //   mode: "light",
  //   background: {
  //     default: "hsl(220, 50%, 99%)",
  //     paperLight: "hsl(220, 20%, 96%)",
  //     paper: "hsl(220, 20%, 99%)",
  //   },
  // },
  components: {
    MuiButtonBase: {
      defaultProps: {
        // disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableTouchRipple: true,
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 2,
      },
    },
  },
});
