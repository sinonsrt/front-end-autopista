/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../../../hooks/Auth";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      color: "black",
      backgroundColor: "white",
      boxShadow: "5px -0.5px 10px -1px",
      textAlign: "center",
      paddingBottom: "0.5%",
      paddingTop: "0.5%",
    },
  })
);

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <footer className="main-footer d-flex pt-footer">
        <Button href="aboutUs" variant="text" className={classes.footer}>
          <strong>Sistema AutoPista® - 2021 - Brasil</strong>{" "}
        </Button>
      </footer>
    </>
  );
};

export default Footer;
