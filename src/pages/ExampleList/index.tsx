import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextInputSearch from "../../components/TextInputSearch";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Collapse from "@material-ui/core/Collapse";
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
  AttachFile,
  Delete,
  WhatsApp,
  List,
  Search,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
import TableFooter from "@material-ui/core/TableFooter";
import Pagination from "@material-ui/lab/Pagination";
import {
  DialogContent,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  Zoom,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
  })
);

export default function CollapsibleTable() {
  const classes = useStyles();
  const [data, setData] = useState([
    {
      id: "uuid1",
      name: "Guilherme",
      phone: "11 11111-1111",
      address: "rua tal tal tal",
    },
    {
      id: "uuid2",
      name: "Lucas",
      phone: "22 22222-2222",
      address: "avenida tal tal tal",
    },
    {
      id: "uuid3",
      name: "Unipar",
      phone: "44 44444-4444",
      address: "edifício tal tal tal",
    },
    {
      id: "uuid4",
      name: "Alfa",
      phone: "33 33333-3333",
      address: "praça tal tal tal",
    },
  ]);
  const columns = [
    { description: "Nome", width: "50%" },
    { description: "Telefone", width: "25%" },
    { description: "Endereço", width: "25%" },
    { description: "Ações", width: "0%" },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleView(id: string) {
    console.log("view: ", id);
    handleClose();
  }
  function handleEdit(id: string) {
    console.log("edit: ", id);
    handleClose();
  }
  function handleDelete(id: string) {
    console.log("delete: ", id);
    handleClose();
  }

  return (
    <>
      <Typography variant="h5">Listagem</Typography>
      <p />
      <Grid container direction="row" justify="flex-start">
        <Grid md={10}>
          <TextInputSearch placeholder="Buscar por..." />
        </Grid>
        <Grid md={2} className={classes.textCenter}>
          <Button
            variant="contained"
            className={classes.buttonAdd}
            color="primary"
            onClick={() => console.log("new")}
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={handleClick}>
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
                    <MenuItem onClick={() => handleView(item.id)}>
                      <ListItemIcon>
                        <Search className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Visualizar" />
                    </MenuItem>

                    <MenuItem onClick={() => handleEdit(item.id)}>
                      <ListItemIcon>
                        <Edit className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Editar" />
                    </MenuItem>

                    <MenuItem onClick={() => handleDelete(item.id)}>
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
            <Pagination
              count={5}
              size="small"
              color="primary"
              className={classes.pagination}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
