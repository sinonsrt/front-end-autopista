import React from "react";
import {
  Button,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import TextInput from "../../components/TextInput";

import ReplyAllIcon from "@material-ui/icons/ReplyAll";

import background from "../../assets/background-login.jpg";
import logo from "../../assets/autopista-bbranca-mp.png";
import { Form, Formik } from "formik";
import { useAuth } from "../../hooks/Auth";
import { toast } from "react-toastify";
import TextInputPassword from "../../components/TextInputPassword";

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

const Login: React.FC = () => {
  const classes = useStyles();
  const { signIn } = useAuth();
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <img src={logo} alt="AutoPista" />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try {
              signIn(values);
            } catch (error) {
              console.log(error);
              toast.error("Erro ao fazer login");
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Paper>
                <Typography variant="h5" align="center">
                  Bem Vindo!
                </Typography>
                <Grid>
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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.buttonLogin}
                    size="large"
                  >
                    Entrar
                  </Button>
                </Grid>
              </Paper>
              <a href="/" className={classes.aLosePassword}>
                <strong> Esqueci minha senha </strong>
              </a>
            </Form>
          )}
        </Formik>
        <a href="/register" className={classes.a}>
          <ReplyAllIcon />
          Realizar cadastro
        </a>
      </div>
      <img className={classes.background} src={background} alt="Background" />
    </div>
  );
};

export default Login;
