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
      maxWidth: "1000px",
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
      marginTop: "10%",
      textDecoration: "none",
      fontSize: "18px",
    },
  })
);

const CompanyRegister: React.FC = () => {
  const classes = useStyles();
  const [services, setServices] = useState<any[]>([]);
  const [workedDays, setWorkedDays] = useState<any[]>([]);
  const [workedTimes, setWorkedTimes] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [type, setTypes] = useState<any[]>([]);
  const [image, setImage] = useState<any>();

  useEffect(() => {
    api
      .get("cities?page=1&limit=10000&order=description&type=asc")
      .then((response) => setCity(response.data.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, []);

  useEffect(() => {
    api
      .get("workedDays")
      .then((response) => setWorkedDays(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, []);

  useEffect(() => {
    api
      .get("workedTimes")
      .then((response) => setWorkedTimes(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, []);

  useEffect(() => {
    api
      .get("services")
      .then((response) => setServices(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, []);

  useEffect(() => {
    api
      .get("types")
      .then((response) => setTypes(response.data))
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
              console.log(key);
              formData.append(key, values[key]);
            });
            api.post("companyRegister", formData);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Paper>
                <Typography variant="h5" align="center">
                  SEJA BEM-VINDO!
                </Typography>
                <Grid container spacing={1} alignContent="center">
                  <Grid xs={6} sm={6} md={6}>
                    <TextInput
                      name="corporate_name"
                      label="Razão Social"
                      required
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <TextInput
                      name="company_name"
                      required
                      label="Nome Fantasia"
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <TextInput
                      name="cnpj"
                      required
                      label="CNPJ"
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <Select
                      name="type_id"
                      label="Tipo de Empresa"
                      required
                      options={type.map((item) => ({
                        id: item.id,
                        text: item.description,
                      }))}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={12}>
                    <hr />
                  </Grid>

                  <Grid xs={6} sm={6} md={4}>
                    <TextInput
                      name="district"
                      required
                      label="Bairro"
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={4}>
                    <TextInput
                      name="cep"
                      label="CEP"
                      required
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={4}>
                    <TextInput
                      name="number"
                      label="Número"
                      required
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <TextInput
                      name="address"
                      required
                      label="Endereço"
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
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
                  </Grid>

                  <Grid xs={6} sm={6} md={12}>
                    <hr />
                  </Grid>

                  <Grid xs={6} sm={6} md={12}>
                    <MultipleSelect
                      name="services"
                      label="Serviços"
                      options={services.map((item) => ({
                        id: item.id,
                        text: item.description,
                      }))}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <Select
                      name="worked_day_id"
                      label="Dias de funcionamento"
                      required
                      options={workedDays.map((item) => ({
                        id: item.id,
                        text: item.description,
                      }))}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <Select
                      name="worked_time_id"
                      label="Horário de funcionamento"
                      required
                      options={workedTimes.map((item) => ({
                        id: item.id,
                        text: item.description,
                      }))}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={12}>
                    <hr />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <TextInput
                      name="email"
                      required
                      label="E-mail"
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <TextInput
                      name="phone"
                      required
                      label="Telefone"
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <TextInputPassword
                      name="password"
                      required
                      label="Senha"
                      className={classes.textField}
                    />
                  </Grid>

                  <Grid xs={6} sm={6} md={6}>
                    <TextInputPassword
                      name="confirm-password"
                      required
                      label="Confirme sua senha"
                      className={classes.textField}
                    />
                  </Grid>

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

export default CompanyRegister;
