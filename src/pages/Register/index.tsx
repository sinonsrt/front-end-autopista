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

  useEffect(() => { 
    api
      .get("cities?page=1&limit=10000&order=description&type=asc")
      .then((response) => setCity(response.data.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, []);

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
            api.post("register", formData).then((response) => toast.success(response.data)).catch((error) => toast.error("Erro ao realizar cadastro!"));
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Paper>
                <Typography variant="h5" align="center">
                  SEJA BEM-VINDO!
                </Typography>
                <Grid>
                  <TextInput
                    name="name"
                    label="Nome"
                    required
                    className={classes.textField}
                  />
                  <TextInput
                    name="email"
                    label="E-mail"
                    required
                    className={classes.textField}
                  />
                  <TextInputPassword
                    name="password"
                    label="Senha"
                    required
                    className={classes.textField}
                  />
                  <TextInputPassword
                    name="confirm-password"
                    label="Confirme sua senha"
                    required
                    className={classes.textField}
                  />
                  <AsyncSelect
                    name="city_id"
                    label="Cidade"
                    required
                    options={city.map((item) => ({
                      id: item.id,
                      text: item.description + " - " + item.state[0].initials,
                    }))}
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
