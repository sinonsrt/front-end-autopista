import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import { Badge, Button, IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ForumIcon from "@material-ui/icons/Forum";
import { MenuList } from "../../../components/Menu/menuList";
import { MenuListItem } from "../../../components/Menu/menuListItem";
// import logo from '../../../assets/autopista-m.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
      height: 40,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    sectionDesktop: {
      display: "none",
      marginLeft: theme.spacing(55),
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    grow: {
      grow: {
        flexGrow: 1,
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar>
          <NavLink exact activeClassName="is-active" to="/Dashboard">
            <img
              src={
                "https://w7.pngwing.com/pngs/511/537/png-transparent-logo-filling-station-gasoline-fuel-liquefied-petroleum-gas-others-diesel-fuel-logo-sign.png"
              }
              alt="logo"
              className={classes.logo}
            />
          </NavLink>
          <div />
          <MenuList heading="Cadastros">
            <MenuListItem>Posto de Gasolina</MenuListItem>
            <MenuListItem>Sei lá oq</MenuListItem>
            <MenuListItem>Pau tora</MenuListItem>
            <hr />
            <MenuListItem>Alguma outra coisa</MenuListItem>
            <MenuListItem>Vai Corinthians</MenuListItem>
            <MenuListItem>TCC bom demais</MenuListItem>
          </MenuList>

          <MenuList heading="Admin">
            <MenuListItem>Unipar {">"} Alfa</MenuListItem>
            <MenuListItem>Ms1 melhor empresa</MenuListItem>
            <MenuListItem>TCC</MenuListItem>
            <hr />
            <MenuListItem>Truco</MenuListItem>
            <MenuListItem>Cerveja</MenuListItem>
            <MenuListItem>Churrasco</MenuListItem>
          </MenuList>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
