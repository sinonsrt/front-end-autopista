import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Link } from "react-router-dom";
import { MenuList } from "../../../components/Menu/menuList";
import { MenuListItem } from "../../../components/Menu/menuListItem";
import logo from "../../../assets/autopista-bbranca-mp.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
      height: 32,
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar className="pl-2">
          <NavLink
            exact
            activeClassName="is-active"
            to="/Dashboard"
            className="mr-4"
          >
            <img src={logo} alt="logo" className={classes.logo} />
          </NavLink>
          <div />
          <MenuList heading="Cadastros">
            <Link
              to="/accessLevel"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Nível de Acesso</MenuListItem>
            </Link>

            <MenuListItem>Tipos</MenuListItem>
            <MenuListItem>Serviços</MenuListItem>
            <hr />
            <MenuListItem>Notícias</MenuListItem>
            <MenuListItem>Usuários</MenuListItem>
            <MenuListItem>Empresas</MenuListItem>
            <hr />
            <MenuListItem>Códigos Bônus</MenuListItem>
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
      ;
    </div>
  );
};

export default Header;
