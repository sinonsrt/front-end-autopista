import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppBar from "@material-ui/core/AppBar";
import { NavLink, Link } from "react-router-dom";
import { MenuList } from "../../../components/Menu/menuList";
import { MenuListItem } from "../../../components/Menu/menuListItem";
import logo from "../../../assets/autopista-bbranca-mp.png";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { useAuth } from "../../../hooks/Auth";
import { Add, Person, Star } from "@material-ui/icons";
import UserRoleDialog from "../../UserRole/dialogForm";
import CompanyRoleDialog from "../../CompanyRole/dialogForm";
import RatingRoleDialog from "../../RatingRole/dialogForm";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Profile from "../../Profile";

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
    role: {
      color: "blue",
    },
    exit: {
      color: "red",
    },
  })
);

const HeaderAdmin: React.FC = () => {
  const classes = useStyles();
  const { signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [refresh, setRefresh] = useState(0);
  const { user } = useAuth();
  const [dialogData, setDialogData] = useState<any>({});
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function showTypes(id: string, action: "view") {
    /* 
    api
      .get(`users/${user.id}`)
      .then((response) => {
        console.log(response.data)
        setDialogData({
          ...response.data,
          services: response.data.services.map((item: any) => item.service_id),
          action: action,
        });
        setOpenDialog(true);
      })
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!")); */
    setOpenDialog(true);
    handleClose();
  }

  return (
    <>
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
            <MenuList heading="Configura????es">
              <Link
                to="/accessLevel"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuListItem>N??vel de Acesso</MenuListItem>
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
                <MenuListItem>Servi??os</MenuListItem>
              </Link>
              <hr />
              <Link
                to="/news"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuListItem>Not??cias</MenuListItem>
              </Link>
              <Link
                to="/code"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuListItem>C??digos Avaliativos</MenuListItem>
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
                <MenuListItem>Hor??rios de funcionamento</MenuListItem>
              </Link>
            </MenuList>

            <MenuList heading="Cadastros">
              <Link
                to="/users"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuListItem>Usu??rios</MenuListItem>
              </Link>
              <Link
                to="/companys"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuListItem>Empresas</MenuListItem>
              </Link>
            </MenuList>

            <Button color="secondary" href="/Rating">
              <Star />
              AVALIA????ES
            </Button>

            <Button
              className={classes.new}
              color="primary"
              href="/companyConfirm"
            >
              <Add />
              NOVAS EMPRESAS
            </Button>

            <MenuList heading={user.name} className={classes.logout}>
              <MenuItem onClick={() => setOpenDialog(true)}>
                <ListItemIcon className={classes.role}>
                  {" "}
                  <MenuListItem>
                    <Person />
                    Perfil
                  </MenuListItem>
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <ListItemIcon className={classes.exit}>
                  {" "}
                  <MenuListItem>
                    <ExitToAppIcon />
                    Sair
                  </MenuListItem>
                </ListItemIcon>
              </MenuItem>
            </MenuList>
          </Toolbar>
        </AppBar>
        ;
      </div>

      {openDialog && <Profile hide={() => setOpenDialog(false)} />}
    </>
  );
};

export default HeaderAdmin;
