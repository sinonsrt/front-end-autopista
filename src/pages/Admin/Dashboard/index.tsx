import React from "react";
import InfoCard from "../../../components/InfoCard";
import company from "../../../assets/company.png";
import user from "../../../assets/user.png";
import service from "../../../assets/service.png";
import { Theme } from "@material-ui/core";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "5%",
      textAlign: "center",
    },
    box: {
      display: "flex",
      marginTop: "5%",
      marginLeft: "21%",
    },
    card: {
      marginRight: "1%",
    },
    title: {
      fontSize: "450%",
      margin: "0"
    }
  })
);

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.title}> SISTEMA AUTOPISTA </h1>
        <h3>SEJA BEM-VINDO!</h3>
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
              title="PRESTADOR DE SERVIÇO"
              text="Texto do Card, texto texto texto texto texto texto texto texto texto texto texto texto"
              imageTitle="Total de prestadores de serviço cadastradas" 
            />
          </div>
          <div className={classes.card}>
            <InfoCard
              image={user}
              title="USUÁRIOS"
              text="Texto do Card, texto texto texto texto texto texto texto texto texto texto texto texto"
              imageTitle="Total de usuários cadastradas"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
