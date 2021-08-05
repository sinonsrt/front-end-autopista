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
import { Edit, Delete, List, Search } from "@material-ui/icons";
import TableFooter from "@material-ui/core/TableFooter";
import {
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInputSearch from "../../../components/TextInputSearch";
import api from "../../../services/api";
import { toast } from "react-toastify";
import RatingLogo from "../../../assets/icons/star.png";

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

const Rating: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);
  const columns = [
    { description: "Autor", width: "20%" },
    { description: "Comentário", width: "20%" },
    { description: "Data de publicação", width: "20%" },
    { description: "Avaliação", width: "20%" },
    { description: "Empresa", width: "20%" },
    { description: "Ações", width: "0%" },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");

  useEffect(() => {
    api
      .get("userCodes?order=id&type=asc")
      .then((response) => setData(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, [refresh]);

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
      .delete(`userCodes/${id}`)
      .then(() => {
        toast.success("Registro excluído com sucesso");
        setRefresh(Math.random());
      })
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
    handleClose();
  }

  return (
    <>
      <div className={classes.titleLogo}>
        <img src={RatingLogo} alt="Avaliação" />
        <Typography variant="h5" align="center" className={classes.title}>
          AVALIAÇÕES
        </Typography>
      </div>

      <Grid container direction="row" justify="space-around">
        <Grid md={10}>
          <TextInputSearch placeholder="Buscar por código avaliativo..." />
        </Grid>

        <Grid md={1}>
          <Button
            variant="contained"
            className={classes.buttonReport}
            color="secondary"
            onClick={() => {
              api
                .get(`ratingReports`)
                .then((response) => {
                  console.log(process.env.REACT_APP_API_URL);
                  window.open(`http://25.99.194.144:3333/${response.data}`);
                })
                .catch((error) =>
                  toast.error("Nenhum registro encontrado com esse filtro ")
                );
            }}
          >
            Relatório
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>{item.created_at.split("T")[0]}</TableCell>
                <TableCell>{item.star}</TableCell>
                <TableCell>{item.company_name}</TableCell>
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
    </>
  );
};

export default Rating;
