import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./hooks";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#0063CF",
      },
      secondary: {
        main: "#f57f17",
      },
      success: {
        main: "#29B665",
      },
      info: {
        main: "#eceff1",
      },
    },
    props: {
      MuiFormControl: {
        margin: "dense",
      },
      MuiFormHelperText: {
        margin: "dense",
      },
      MuiIconButton: {
        size: "small",
      },
      MuiInputBase: {
        margin: "dense",
      },
      MuiInputLabel: {
        margin: "dense",
      },
      MuiListItem: {
        dense: true,
      },

      MuiFab: {
        size: "small",
      },
      MuiTable: {
        size: "small",
      },
      MuiTextField: {
        margin: "dense",
      },
      MuiToolbar: {
        variant: "dense",
      },
    },
    typography: {
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppProvider>
          <Routes />
        </AppProvider>
        <ToastContainer draggable={false} newestOnTop={true} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
