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
import {
  Edit,
  Delete,
  List,
  Search,
  Check,
  HighlightOff,
  Star,
} from "@material-ui/icons";
import TableFooter from "@material-ui/core/TableFooter";
import CompanyDialog from "./dialogForm";
import ReportDialog from "./report";
import {
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInputSearch from "../../../components/TextInputSearch";
import api from "../../../services/api";
import { toast } from "react-toastify";
import CompanyLogo from "../../../assets/icons/company-logo.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
      margin: theme.spacing(1),
      backgroundColor: theme.palette.success.main,
      boxShadow: "none",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#208c4e",
      },
    },
    buttonReport: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
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

const Company: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const classes = useStyles();
  const [data, setData] = useState<any[]>([{ services: [] }]);
  const [dialogData, setDialogData] = useState<any>({});
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const columns = [
    { description: "Raz??o Social", width: "25%" },
    { description: "CNPJ", width: "20%" },
    { description: "Tipo", width: "20%" },
    { description: "Cidade", width: "20%" },
    { description: "Telefone", width: "20%" },
    { description: "Data de cadastro", width: "5%" },
    { description: "Avalia????o", width: "2%" },
    { description: "Confirmado", width: "2%" },
    { description: "A????es", width: "0%" },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");

  useEffect(() => {
    api
      .get(
        `companies?order=created_at&type=asc&confirmed=true&search=${search}`
      )
      .then((response) => setData(response.data))
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
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

  function handleDelete(id: string) {
    api
      .delete(`companies/${id}`)
      .then(() => {
        toast.success("Registro exclu??do com sucesso");
        setRefresh(Math.random());
      })
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
    handleClose();
  }

  function showCompany(id: string, action: "view" | "edit") {
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
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
    handleClose();
  }

  return (
    <>
      <div className={classes.titleLogo}>
        <img src={CompanyLogo} alt="Empresas" />
        <Typography variant="h5" align="center" className={classes.title}>
          EMPRESAS
        </Typography>
      </div>

      <Grid container direction="row" justify="flex-start">
        <Grid md={10}>
          <TextInputSearch
            placeholder="Buscar por raz??o social..."
            value={search}
            onChange={(e) => setSearch(e.target.value || "")}
          />
        </Grid>
        <Grid md={1}>
          <Button
            variant="contained"
            className={classes.buttonReport}
            color="secondary"
            onClick={() => {
              setOpenReport(true);
            }}
          >
            Relat??rio
          </Button>
        </Grid>
        <Grid md={1}>
          <Button
            variant="contained"
            className={classes.buttonAdd}
            color="primary"
            onClick={() => {
              setDialogData({ id: "", description: "", action: "include" });
              setOpenDialog(true);
            }}
          >
            Incluir
          </Button>
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
                <TableCell>{item.company_name}</TableCell>
                <TableCell>{item.cnpj}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  {item.description + " - " + item.initials}
                </TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  {item.created_at
                    ? item.created_at
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")
                    : ""}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" display="inline">
                    <Star color="secondary" />
                    <strong>{item.stars}/5</strong>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography display="block">
                    {item.confirmed ? (
                      <Check style={{ color: "green" }} />
                    ) : (
                      <HighlightOff style={{ color: "red" }} />
                    )}
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
                      onClick={() => showCompany(selectedItemIndex, "view")}
                    >
                      <ListItemIcon>
                        <Search className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Visualizar" />
                    </MenuItem>

                    <MenuItem
                      onClick={() => showCompany(selectedItemIndex, "edit")}
                    >
                      <ListItemIcon>
                        <Edit className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Editar" />
                    </MenuItem>

                    <MenuItem onClick={() => handleDelete(selectedItemIndex)}>
                      <ListItemIcon>
                        <Delete className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Excluir" />
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

      <CompanyDialog
        dialogData={dialogData}
        visible={openDialog}
        hide={() => setOpenDialog(false)}
        refresh={() => setRefresh(Math.random())}
      />

      <ReportDialog visible={openReport} hide={() => setOpenReport(false)} />
    </>
  );
};

export default Company;
