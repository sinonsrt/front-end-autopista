import React from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import { useAuth } from "../../hooks/Auth";

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
    marginTop: "4.5%",
  },
}));

const Main: React.FC = ({ children }) => {
  const { user } = useAuth();
  const classes = useStyles();

  return user ? (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>{children}</main>
    </div>
  ) : (
    <>{children}</>
  );
};

export default Main;
