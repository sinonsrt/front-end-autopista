import React from "react";
import {
  Grid,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import TextInput from "../../components/TextInput";
import Select from "../../components/Select";

import ReplyAllIcon from "@material-ui/icons/ReplyAll";

import background from "../../assets/background-register.png";
import logo from "../../assets/autopista-bbranca-mp.png";
import { Form, Formik } from "formik";

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
interface State {
  password: string;
  showPassword: boolean;
}

const Register: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <img src={logo} alt="AutoPista" />
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            console.log(values);
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
                  <TextInput
                    name="password"
                    label="Senha"
                    className={classes.textField}
                  />
                  <TextInput
                    name="confirm-password"
                    label="Confirme sua senha"
                    className={classes.textField}
                  />
                  <Select
                    name="city"
                    label="Selecione sua cidade"
                    className={classes.textField}
                    options={[
                      { id: "01", text: "Umuarama" },
                      { id: "02", text: "Maringá" },
                    ]}
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
