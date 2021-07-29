import { Theme, Typography } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import AboutUsLogo from "../../assets/icons/information.png";
import bodyImage from "../../assets/aboutus.png";

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
    paragraph: {
      padding: "5%",
      fontSize: "15pt",
    },
    image: {
      margin: "auto",
      textAlign: "center",
      borderRadius: "15",
      width: "60%"
    },
  })
);

const AboutUs: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="h5"
        display="initial"
        align="center"
        className={classes.titleLogo}
      >
        {" "}
        <img src={AboutUsLogo} alt="Sobre Nós" /> PRESTADORES DE SERVIÇO
      </Typography>

      <Typography
        variant="body1"
        display="initial"
        align="center"
        className={classes.paragraph}
      >
        {" "}
        Em 1807, os primeiros carros movidos por um motor de combustão interna a
        gás combustível apareceram, o que levou à introdução em 1885 do moderno
        motor a gasolina ou com combustão a gasolina onipresente interno. Pouco
        tempo depois em 1888 começaram a surgir ideias semelhantes a postos de
        combustível, e desde então veio aumentando cada vez mais. Com isto
        começou a surgir as dúvidas sobre qualidade de combustível, aonde
        abastecer os veículos, serviços extras oferecidos em um posto de
        combustível e no momento de abastecer um veículo. E no mundo atual
        continuam a surgir as dúvidas, com veículos cada vez sofisticados e
        tecnológicos, ainda mantemos a dúvida no momento de abastecer, qual
        seria o melhor posto? O combustível é de qualidade? Com isto foi
        desenvolvido o sistema AutoPista como busca de sanar e ajudar nestas
        dúvidas, com os postos de combustíveis a seu dispor, com informações que
        auxiliam no momento de uma escolha rápida, ou até mesmo uma busca mais
        completa para marcar aquele posto como favorito.
      </Typography>

      <Typography variant="h5" display="initial" align="center">
        {" "}
        <img src={bodyImage} className={classes.image} alt="Sobre Nós" />
      </Typography>
    </>
  );
};

export default AboutUs;
