import React, { useState } from "react";
import { Button, Paper, Typography, Grid, MenuItem } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextInput from "../../components/TextInput";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import background from "../../assets/background-login.jpg";
import logo from "../../assets/autopista-bbranca-mp.png";
import { Form, Formik } from "formik";
import { useAuth } from "../../hooks/Auth";
import { toast } from "react-toastify";
import TextInputPassword from "../../components/TextInputPassword";
import Loader from "../../components/Loader";
import PasswordDialog from "./dialogForm";
import CompanyDialog from "./CompanyForm";
import { Person, Store } from "@material-ui/icons";

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
      margin: "5pt",
      fontSize: "18px",
    },
    register: {
      marginTop: "15%",
    },
  })
);

const Login: React.FC = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [CompanyOpenDialog, setCompanyOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState<any>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  function showTypes(id: string, action: "password") {
    setOpenDialog(true);
  }

  function showCompanyRegister(id: string, action: "company") {
    setCompanyOpenDialog(true);
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.root}>
          <img src={logo} alt="AutoPista" />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await signIn(values).catch((error) =>
                  toast.error(error.response.data)
                );
              } catch (error) {
                toast.error("Erro ao fazer login");
              }
              setLoading(false);
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
                <a className={classes.aLosePassword}>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => showTypes(selectedItemIndex, "password")}
                  >
                    <strong> Esqueci minha senha </strong>
                  </Button>
                </a>
              </Form>
            )}
          </Formik>
          <Typography
            align="center"
            variant="button"
            className={classes.register}
          >
            <strong> Realize seu cadastro! </strong>
          </Typography>
          <div>
            <Button
              onClick={() => showCompanyRegister(selectedItemIndex, "company")}
              className={classes.a}
              color="primary"
              variant="contained"
            >
              <Store />
              Empresa
            </Button>
            <Button
              className={classes.a}
              color="secondary"
              href="/register"
              variant="contained"
            >
              <Person />
              Pessoa
            </Button>
          </div>
        </div>
        {loading && <Loader />}
        <img className={classes.background} src={background} alt="Background" />
      </div>

      <PasswordDialog
        dialogData={dialogData}
        visible={openDialog}
        hide={() => setOpenDialog(false)}
        refresh={() => setRefresh(Math.random())}
      />

      <CompanyDialog
        dialogData={dialogData}
        visible={CompanyOpenDialog}
        hide={() => setCompanyOpenDialog(false)}
        refresh={() => setRefresh(Math.random())}
      />
    </>
  );
};

export default Login;
