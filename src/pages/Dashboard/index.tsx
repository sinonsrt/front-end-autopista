import React, { useEffect, useState } from "react";
import { Typography, Theme } from "@material-ui/core";
import logo from "../../assets/autopista-bbranca-mp.png";
import api from "../../services/api";
import { toast } from "react-toastify";
import { createStyles, makeStyles } from "@material-ui/styles";
import InfoCard from "../../components/InfoCard";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: "35%",
    },
    title: {
      fontSize: "300%",
      margin: "0",
    },
    iconsColor: {
      color: "#212121",
    },
    container: {
      marginTop: "5%",
      textAlign: "center",
    },
    box: {
      display: "flex",
      marginTop: "2%",
      justifyContent: "center",
    },
    card: {
      marginRight: "1%",
    },
    logoTitle: {
      marginTop: "-5%",
      letterSpacing: "3px",
    },
  })
);

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const columns = [
    { description: "", width: "30%" },
    { description: "", width: "15%" },
    { description: "", width: "15%" },
    { description: "POSTOS DE COMBUSTIVEL", width: "25%" },
    { description: "", width: "20%" },
  ];

  useEffect(() => {
    api
      .get(
        "companies?order=id&type=asc&page=1&limit=20&company_type=Posto de combustivel&confirmed=true&page=1&limit=5&star=3"
      )
      .then((response) => setData(response.data))
      .catch((error) => {
        toast.error("Não foi possivel efetuar a consulta!");
      });
  }, [refresh]);

  console.log(data);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.logoTitle}>
          <img src={logo} alt="AutoPosto" />
          <Typography gutterBottom variant="h5" component="h2">
            SEJA BEM-VINDO!
          </Typography>
        </div>
        <Typography gutterBottom variant="h2" component="h2">
          EMPRESAS MAIS BEM AVALIADAS
        </Typography>
        <div className={classes.box}>
          {data.map((item) => (
            <div className={classes.card}>
              <InfoCard
                image={
                  item.avatar
                  ? `http://localhost:3333/company/${item.avatar}`
                  : `http://localhost:3333/base/base.jpg`
                }
                title={item.company_name}
                text={item.description + " - " + item.initials}
                imageTitle={item.company_name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
