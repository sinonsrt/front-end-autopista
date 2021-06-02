import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Link } from "react-router-dom";
import { MenuList } from "../../../components/Menu/menuList";
import { MenuListItem } from "../../../components/Menu/menuListItem";
import logo from "../../../assets/autopista-bbranca-mp.png";
import { Button } from "@material-ui/core";
import { useAuth } from "../../../hooks/Auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
      height: 60,
    },
    logout: {
      position: 'absolute',
      right: 0
    }
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const { signOut } = useAuth()
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
          <MenuList heading="Configurações">
            <Link
              to="/accessLevel"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Nível de Acesso</MenuListItem>
            </Link>
            <Link
              to="/types"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Tipos</MenuListItem>
            </Link>
            <Link
              to="/services"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Serviços</MenuListItem>
            </Link>
            <hr />
            <Link
              to="/news"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Notícias</MenuListItem>
            </Link>
            <Link
              to="/code"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Códigos Bônus</MenuListItem>
            </Link>
            <Link
              to="/workedDay"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Dias de funcionamento</MenuListItem>
            </Link>
            <Link
              to="/workedTime"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Horários de funcionamento</MenuListItem>
            </Link>
          </MenuList>

          <MenuList heading="Cadastros">
            <Link
              to="/users"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Usuários</MenuListItem>
            </Link>
            <Link
              to="/companys"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuListItem>Empresas</MenuListItem>
            </Link>
          </MenuList>
          <MenuList heading="Relatórios">

          </MenuList>
          <Button className={classes.logout} color="secondary" onClick={() => {
            signOut()
          }}>
            <ExitToAppIcon/>
           SAIR 
          </Button>
        </Toolbar>
      </AppBar>
      ;
    </div>
  );
};

export default Header;
