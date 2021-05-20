import React from "react";
import { makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fafafa",
    display: "flex",
    height: "100vh",
    zIndex: 9999,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

const Main: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default Main;
