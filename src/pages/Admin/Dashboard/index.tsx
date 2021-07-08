import React from "react";
import InfoCard from "../../../components/InfoCard";
import company from "../../../assets/company.png";
import user from "../../../assets/user.png";
import service from "../../../assets/service.png";
import { Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import logo from "../../../assets/autopista-bbranca-mp.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "5%",
      textAlign: "center",
    },
    box: {
      display: "flex",
      marginTop: "5%",
      justifyContent: "center",
    },
    card: {
      marginRight: "1%",
    },
    title: {
      fontSize: "450%",
      margin: "0",
    },
    logoTitle: {
      marginTop: "-5%",
      letterSpacing: "3px",
    },
  })
);

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.logoTitle}>
          <img src={logo} alt="AutoPosto" />
          <Typography gutterBottom variant="h5" component="h2">
            SEJA BEM-VINDO!
          </Typography>
        </div>
        <div className={classes.box}>
          <div className={classes.card}>
            <InfoCard
              image={company}
              title="EMPRESAS"
              text="49"
              imageTitle="Total de empresas cadastradas"
            />
          </div>
          <div className={classes.card}>
            <InfoCard
              image={service}
              title="PRESTADORES DE SERVIÇO"
              text="50"
              imageTitle="Total de prestadores de serviço cadastradas"
            />
          </div>
          <div className={classes.card}>
            <InfoCard
              image={user}
              title="USUÁRIOS"
              text="22"
              imageTitle="Total de usuários cadastradas"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
