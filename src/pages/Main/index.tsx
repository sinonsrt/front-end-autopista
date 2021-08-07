import React from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";
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
      {user.access_level === 1 ? <HeaderAdmin /> : <Header />}
      <main className={classes.content}>{children}</main>
      <Footer />
    </div>
  ) : (
    <>{children}</>
  );
};

export default Main;
