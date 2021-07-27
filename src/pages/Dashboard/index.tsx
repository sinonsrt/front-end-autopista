import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Theme,
  IconButton,
  List,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import TextInputSearch from "../../components/TextInputSearch";
import api from "../../services/api";
import { toast } from "react-toastify";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: "10%",
    },
    title: {
      margin: "3%",
    },
    iconsColor: {
      color: "#212121",
    },
  })
);

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const columns = [
    { description: "", width: "40%" },
    { description: "POSTOS DE COMBUSTÍVEL", width: "40%" },
    { description: "", width: "40%" },
  ];

  useEffect(() => {
    api
      .get("companies")
      .then((response) => setData(response.data))
      .catch((error) => toast.error("Não foi possivel efetuar a consulta!"));
  }, [refresh]);

  console.log(data);

  return (
    <>
      <Typography
        variant="h1"
        display="initial"
        align="center"
        className={classes.title}
      >
        Seja bem vindo!
      </Typography>
      <Grid container direction="row" justify="space-around">
        <Grid md={10}>
          <TextInputSearch placeholder="Buscar por..." />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            {columns.map((column) => (
              <TableCell style={{ width: column.width }}>
                {column.description}
              </TableCell>
            ))}
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
                <TableCell>
                  {item.company_name} <br /> {item.cnpj}{" "}
                </TableCell>
                <TableCell>{item.stars}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <List />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Dashboard;
