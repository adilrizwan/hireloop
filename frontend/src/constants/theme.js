import { createTheme } from "@mui/material";
const black = "#2B2C28";
const white = "#FCFCFC";
const purple = "#5E17EB";
const green = "#7ED957";
const red = "#F44336";
const blue = "#17ABC6";
export const pageSize = 10;
export const theme = createTheme({
  palette: {
    primary: {
      main: purple,
    },
    secondary: {
      main: green,
    },
    accent: {
      main: blue,
    },
    tertiary: {
      black: black,
      white: white,
    },
    error: {
      main: red,
    },
    background: {
      main: white,
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      color: black,
    },
    h2: {
      //headings
      fontSize: 36,
      color: black,
    },
    h3: {
      // footer About Us
      fontSize: 30,
      color: white,
    },
    h4: {
      fontSize: 24,
      color: black,
    },
    h5: {
      // Register Page
      fontSize: 20,
      color: white,
    },
    h6: {
      fontSize: 16,
      color: black,
    },
    body1: {
      //registration label
      fontSize: 14,
      color: black,
    },
    body2: {
      //footer -- info, my account
      fontSize: 14,
      color: white,
    },
    /*caption: {    //helpertext
        fontSize: 12,
        color:'#131515',
      },*/
    caption2: {
      // footer menus
      fontSize: 14,
      color: white,
    },
    subtitle2: {
      // fontSize : 14,
      color: purple,
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
export const paperStyle = {
  padding: "20px 30px",
  width: "500px",
  margin: "0px auto",
};
export const margins = {
  margin: "15px 60px 5px 5px",
};
export const buttonPlacement = {
  margin: "15px auto 5px auto",
};
export const selectMenus = {
  width: 180,
  minWidth: 180,
  margin: "20px 65px 0px 5px",
};
export const bgImg = (image) => {
  return {
    background: {
      backgroundImage: `url(${image})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.background.main,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }
  };
};

