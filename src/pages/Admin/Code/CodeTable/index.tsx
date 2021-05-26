import React, { useState } from "react";
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
import Pagination from "@material-ui/lab/Pagination";
import {
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInputSearch from "../../../../components/TextInputSearch";
import CompanyLogo from "../../../../assets/icons/company-logo.svg"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      }
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
    titleLogo: {
      '& img': {
        width: "5%",
        margin: "0.5%",
      }
    }
  })
);

const CodeTable: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState([
    {
      id: "uuid1",
      code: "BRASIL",
      company: "Marcela e Mariana Transportes ME",
      date: "24-05-2021",
    },
  ]);
  const columns = [
    { description: "Código Bônus", width: "40%" },
    { description: "Empresa", width: "40%" },
    { description: "Data de cadastro", width: "20%" },
    { description: "Ações", width: "0%" },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
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
      
      <Typography variant="h5" display="initial" align="center" className={classes.titleLogo}> <img src={CompanyLogo} alt="Logotipo empresarial" /> Cupons cadastrados</Typography>
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
            onClick={() => alert("new")}
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
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.date}</TableCell>
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
                    <MenuItem onClick={() => handleView(selectedItemIndex)}>
                      <ListItemIcon>
                        <Search className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Visualizar" />
                    </MenuItem>

                    <MenuItem onClick={() => handleEdit(selectedItemIndex)}>
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
};

export default CodeTable;
