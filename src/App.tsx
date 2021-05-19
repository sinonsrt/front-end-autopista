import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#b28704",
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes/>
      </ThemeProvider>
    </Router>
  );
}

export default App;
