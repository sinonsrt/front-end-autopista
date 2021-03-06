/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  DialogActions,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import api from "../../services/api";
import { useAuth } from "../../hooks/Auth";
import { Star, List, Search, Delete } from "@material-ui/icons";
import { toast } from "react-toastify";
import TextInputSearch from "../../components/TextInputSearch";
import RatingLogo from "../../assets/icons/star.png";

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

interface Props {
  hide: any;
}

const RatingRoleDialog: React.FC<Props> = ({ hide }) => {
  const columns = [
    { description: "Autor", width: "20%" },
    { description: "Cup??m Avaliativo", width: "15%" },
    { description: "Coment??rio", width: "15%" },
    { description: "Data de publica????o", width: "15%" },
    { description: "Avalia????o", width: "15%" },
    { description: "Empresa", width: "15%" },
    { description: "A????es", width: "0%" },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [apiRefresh, apiSetRefresh] = useState(0);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");

  const { user } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemIndex(id);
  };

  useEffect(() => {
    api
      .get("userCodesAll?order=id&type=asc")
      .then((response) => setData(response.data))
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
  }, [apiRefresh]);

  function handleDelete(id: string) {
    api
      .delete(`userCodes/${id}`)
      .then(() => {
        toast.success("Registro exclu??do com sucesso");
        apiSetRefresh(Math.random());
      })
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
    handleClose();
  }

  return (
    <>
      <div className={classes.titleLogo}>
        <img src={RatingLogo} alt="Avalia????o" />
        <Typography variant="h5" align="center" className={classes.title}>
          AVALIA????ES
        </Typography>
      </div>

      <Grid container direction="row" justify="space-around">
        <Grid md={10}>
          <TextInputSearch placeholder="Buscar por c??digo avaliativo..." />
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
                <TableCell>{item.code}</TableCell>
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
        </Table>
      </TableContainer>

      <DialogActions>
        <Button
          onClick={() => {
            hide();
          }}
          color="primary"
        >
          Retornar
        </Button>
      </DialogActions>
    </>
  );
};

export default RatingRoleDialog;
