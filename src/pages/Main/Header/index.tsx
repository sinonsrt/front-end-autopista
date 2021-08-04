import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppBar from "@material-ui/core/AppBar";
import { NavLink, Link } from "react-router-dom";
import { MenuList } from "../../../components/Menu/menuList";
import { MenuListItem } from "../../../components/Menu/menuListItem";
import logo from "../../../assets/autopista-bbranca-mp.png";
import { Button, Menu, MenuItem, Toolbar } from "@material-ui/core";
import { useAuth } from "../../../hooks/Auth";
import { Add, Person } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
      height: 60,
    },
    new: {
      position: "absolute",
      right: 150,
    },
    logout: {
      position: "absolute",
      right: 0,
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const { signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

          <Button className={classes.new} color="primary" href="/companyConfirm">
            <Add />
            NOVAS EMPRESAS
          </Button>

          <MenuList heading="Seja bem-vindo" className={classes.logout}>
            <Link
              to="/userRole"
              style={{ textDecoration: "none", color: "blue" }}
            >
              <MenuListItem>
                <Person />
                Perfil
              </MenuListItem>
            </Link>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "red" }}
              onClick={() => {
                signOut();
              }}
            >
              <MenuListItem>
                <ExitToAppIcon />
                 Sair
              </MenuListItem>
            </Link>
          </MenuList>
        </Toolbar>
      </AppBar>
      ;
    </div>
  );
};

export default Header;
