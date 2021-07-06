import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import { toast } from "react-toastify";

import TextInput from "../../components/TextInput";
import TextInputPassword from "../../components/TextInputPassword";
import Select from "../../components/Select";

import ReplyAllIcon from "@material-ui/icons/ReplyAll";

import background from "../../assets/background-register.png";
import logo from "../../assets/autopista-bbranca-mp.png";
import { Form, Formik } from "formik";
import AsyncSelect from "../../components/AsyncSelect";
import MultipleSelect from "../../components/MultipleSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "white",
      height: "100vh",
      display: "flex",
      alignItems: "stretch",
    },
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "700px",
      "& a": {
        textAlign: "center",
      },
    },
    loginForm: {
      display: "flex",
      margin: "30px 0",
      width: "340px",
      textAlign: "center",
    },
    textField: {
      width: "97.5%",
      margin: theme.spacing(1),
    },
    buttonLogin: {
      borderRadius: "10px",
      width: "97.5%",
      fontSize: "24px",
      margin: theme.spacing(1),
    },
    background: {
      flex: "1",
      backgroundSize: "cover",
    },
    aLosePassword: {
      color: "#595959",
      display: "block",
      marginTop: "18px",
      textDecoration: "none",
      fontSize: "18px",
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    a: {
      color: "#595959",
      display: "block",
      marginTop: "15%",
      textDecoration: "none",
      fontSize: "18px",
    },
  })
);

const Register: React.FC = () => {
  const classes = useStyles();

  const [city, setCity] = useState<any[]>([]);
  const [image, setImage] = useState<any>();

  // useEffect(() => { *** SÓ DESCOMENTAR AQUI QUE AS CIDADES VÃO APARECER DEPOIS DE TIRAR ELAS DO AUTH
  //   api
  //     .get("cities?page=1&limit=10000&order=description&type=asc")
  //     .then((response) => setCity(response.data.data))
  //     .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  // }, []);

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <img src={logo} alt="AutoPista" />
        <Formik
          initialValues={{}}
          onSubmit={(values: any) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              formData.append(key, values[key]);
            });
            formData.append("image", image);
            api.post("teste", formData);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Paper>
                <Typography variant="h5" align="center">
                  {" "}
                  Cadastro{" "}
                </Typography>
                <Grid>
                  <input
                    type="file"
                    className={classes.textField}
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        setImage(event.target.files[0]);
                      }
                    }}
                  />
                  <img
                    src="https://ilustrado.com.br/wp-content/uploads/2021/03/combustivel_adulterado-761x520.jpg"
                    // poderia ser assim: src=`${process.env.ENDERECO_DO_BACK_PUBLIC}/images/nome_da_imagem.jpg`
                    alt="teste"
                    style={{ width: 100 }}
                  />
                  <TextInput
                    name="name"
                    label="Nome"
                    className={classes.textField}
                  />
                  <TextInput
                    name="email"
                    label="E-mail"
                    className={classes.textField}
                  />
                  <TextInputPassword
                    name="password"
                    label="Senha"
                    className={classes.textField}
                  />
                  <TextInputPassword
                    name="confirm-password"
                    label="Confirme sua senha"
                    className={classes.textField}
                  />
                  <AsyncSelect
                    name="async"
                    label="Select assíncrono"
                    options={city.map((item) => ({
                      id: item.id,
                      text: item.description,
                    }))}
                    className={classes.textField}
                  />

                  <MultipleSelect
                    name="multi"
                    label="Select múltiplo"
                    options={[
                      { text: "Umuarama", id: "1" },
                      { text: "Maringá", id: "2" },
                      { text: "Cianorte", id: "3" },
                      { text: "Londrina", id: "4" },
                      { text: "Maria Helena", id: "5" },
                      { text: "Curitiba", id: "6" },
                      { text: "Toledo", id: "7" },
                      { text: "Perobal", id: "8" },
                      { text: "Perola", id: "9" },
                      { text: "Xambre", id: "10" },
                    ]}
                    className={classes.textField}
                  />

                  <Select
                    name="simples"
                    label="Select simples"
                    options={[
                      { text: "Umuarama", id: "1" },
                      { text: "Maringá", id: "2" },
                      { text: "Cianorte", id: "3" },
                      { text: "Londrina", id: "4" },
                      { text: "Maria Helena", id: "5" },
                      { text: "Curitiba", id: "6" },
                      { text: "Toledo", id: "7" },
                      { text: "Perobal", id: "8" },
                      { text: "Perola", id: "9" },
                      { text: "Xambre", id: "10" },
                    ]}
                    className={classes.textField}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.buttonLogin}
                    size="large"
                  >
                    Cadastrar
                  </Button>
                </Grid>
              </Paper>
            </Form>
          )}
        </Formik>
        <a href="/" className={classes.a}>
          <ReplyAllIcon />
          Voltar a tela de login
        </a>
      </div>
      <img className={classes.background} src={background} alt="Background" />
    </div>
  );
};

export default Register;
