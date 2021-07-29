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
} from "@material-ui/core";
import TextInputSearch from "../../components/TextInputSearch";
import api from "../../services/api";
import { toast } from "react-toastify";
import { createStyles, makeStyles } from "@material-ui/styles";
import CompanyLogo from "../../assets/icons/serviceProvider.png";

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
    titleLogo: {
      "& img": {
        width: "5%",
        margin: "0.5%",
      },
    },
  })
);

const ServiceProvider: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const columns = [
    { description: "", width: "40%" },
    { description: "PRESTADORES DE SERVIÇO", width: "40%" },
    { description: "", width: "40%" },
  ];

  useEffect(() => {
    api
      .get("companies?order=id&type=asc&page=1&limit=20&company_type=Prestador de serviço")
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error)
        //toast.error("Não foi possivel efetuar a consulta!")
      });
  }, [refresh]);

  console.log(data);

  return (
    <>
    <Typography
      variant="h5"
      display="initial"
      align="center"
      className={classes.titleLogo}
    >
      {" "}
      <img src={CompanyLogo} alt="Empresas" /> PRESTADORES DE SERVIÇO
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

export default ServiceProvider;