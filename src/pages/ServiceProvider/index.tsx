import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { List, Search, Star } from "@material-ui/icons";
import TableFooter from "@material-ui/core/TableFooter";
import ServiceProviderDialog from "./dialogForm";
import {
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInputSearch from "../../components/TextInputSearch";
import api from "../../services/api";
import { toast } from "react-toastify";
import CompanyLogo from "../../assets/icons/serviceProvider.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    searchGrid: {
      display: "flex",
    },
    buttonAdd: {
      margin: theme.spacing(1.4),
      paddingTop: theme.spacing(0.5),
      paddingLeft: "28px",
      paddingRight: "28px",
      backgroundColor: theme.palette.success.main,
      boxShadow: "none",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#208c4e",
      },
    },
    headerTable: {
      backgroundColor: theme.palette.info.main,
    },
    actionButton: {
      marginRight: theme.spacing(1.5),
    },
    iconsColor: {
      color: "#212121",
    },
    img: {
      width: "50%",
      borderRadius: "15pt",
    },
    spaceIcon: {
      marginRight: theme.spacing(1),
    },
    pagination: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    textCenter: {
      textAlign: "center",
    },
    head: {
      backgroundColor: theme.palette.info.main,
    },
    titleLogo: {
      display: "flex",
      textAlign: "center",
      marginLeft: "35%",
      "& img": {
        width: "10%",
        margin: "0.5%",
      },
    },
    title: {
      marginTop: "4%",
      marginLeft: "1%",
    },
  })
);

const ServiceProvider: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [dialogData, setDialogData] = useState<any>({});
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const columns = [
    { description: "", width: "30%" },
    { description: "", width: "15%" },
    { description: "", width: "25%" },
    { description: "", width: "25%" },
    { description: "", width: "20%" },
    { description: "Ações", width: "0%" },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");

  useEffect(() => {
    api
      .get(`companies?order=id&type=asc&company_type=Prestador de serviço&confirmed=true&search=${search}`)
      .then((response) => setData(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, [search, refresh]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemIndex(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function showTypes(id: string, action: "view") {
    api
      .get(`companies/${id}`)
      .then((response) => {
        setDialogData({
          ...response.data,
          services: response.data.services.map((item: any) => item.service_id),
          action: action,
        });
        setOpenDialog(true);
      })
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
    handleClose();
  }

  return (
    <>
      <div className={classes.titleLogo}>
        <img src={CompanyLogo} alt="Empresas" />
        <Typography variant="h5" align="center" className={classes.title}>
          PRESTADORES DE SERVIÇO
        </Typography>
      </div>
      <Grid container direction="row" justify="space-around">
        <Grid md={10}>
          <TextInputSearch
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value || "")}
          />
        </Grid>
      </Grid>

      <p />

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow className={classes.headerTable}>
              {columns.map((column) => (
                <TableCell style={{ width: column.width }}>
                  {column.description}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {" "}
                  <img
                    src={`http://localhost:3333/company/${item.avatar}`}
                    alt=""
                    className={classes.img}
                  />{" "}
                </TableCell>
                <TableCell align="center">
                  <strong>
                    {" "}
                    {item.company_name} <br /> {item.cnpj}{" "}
                  </strong>
                </TableCell>
                <TableCell align="center">
                  {item.address} - {item.number} <br />{" "}
                  <strong>
                    {item.district} <br /> {item.description} - {item.initials}
                  </strong>{" "}
                </TableCell>
                <TableCell align="center">
                  {item.phone} <br /> {item.email}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" display="inline">
                    <Star color="secondary" />
                    <strong>{item.stars}/5</strong>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={(event) => handleClick(event, item.id)}>
                    <List />
                  </IconButton>

                  <Menu
                    id={item.id}
                    key={item.id}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <MenuItem
                      onClick={() => showTypes(selectedItemIndex, "view")}
                    >
                      <ListItemIcon>
                        <Search className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Visualizar" />
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            {/* <Pagination
              count={5}
              size="small"
              color="primary"
              className={classes.pagination}
            /> */}
          </TableFooter>
        </Table>
      </TableContainer>

      <ServiceProviderDialog
        dialogData={dialogData}
        visible={openDialog}
        hide={() => setOpenDialog(false)}
        refresh={() => setRefresh(Math.random())}
      />
    </>
  );
};

export default ServiceProvider;
