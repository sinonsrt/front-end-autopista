import React from "react";
import { Formik, Form } from "formik";
import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";

import TextInput from "../../../components/TextInput";
import Select from "../../../components/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      flexDirection: "column",
      padding: theme.spacing(4),
      paddingRight: theme.spacing(3),

      [theme.breakpoints.down("xs")]: {
        paddingBottom: 130,
      },
    },
    paperBotton: {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      padding: theme.spacing(1),
      background: "#f9f9f9",
    },
    buttonSave: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.success.main,
      boxShadow: "none",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#208c4e",
      },
    },
  })
);

const Company: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Formik
        initialValues={{ description: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Paper className={classes.paper}>
              <Typography variant="h3">Cadastro</Typography>
              <Typography variant="h5">Empresa</Typography>

              <Grid item xs={12} sm={8} md={12}>
                <Select
                  name="type"
                  label="Tipo de Empresa"
                  options={[
                    { id: "Posto de Combustivel", text: "Posto de Combustivel" },
                    { id: "Prestador de Serviço", text: "Prestador de Serviço" },
                    { id: "Comércio", text: "Comércio" }
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="corporate_name" label="Razão Social" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="company_name" label="Nome Fantasia" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="cnpj" label="CNPJ" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="ie" label="Inscrição Estadual" />
              </Grid>

              <Typography variant="h5">Endereço</Typography>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="cep" label="CEP" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="district" label="Bairro" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="number" label="Numero" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="address" label="Endereço" />
              </Grid>

              <Typography variant="h5">Funcionamento</Typography>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="start_time" label="Horário de abertura" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="end_time" label="Horário de fechamento" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <Select
                  name="worked_days"
                  label="Dias da semana"
                  options={[
                    { id: "Segunda - Sexta", text: "Segunda - Sexta" },
                    { id: "Segunda - Domingo", text: "Segunda - Domingo" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <Select
                  name="city"
                  label="Cidade"
                  options={[
                    { id: "Umuarama", text: "Umuarama" },
                    { id: "Maringá", text: "Maringá" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <Select
                  name="services"
                  label="Serviços"
                  options={[
                    { id: "Borracharia", text: "Borracharia" },
                    { id: "Conveniência", text: "Conveniência" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <Select
                  name="gas_services"
                  label="Serviços de Posto de Combustivel"
                  options={[
                    { id: "Borracharia", text: "Borracharia" },
                    { id: "Conveniência", text: "Conveniência" },
                  ]}
                />
              </Grid>
            </Paper>

            <Paper className={classes.paperBotton}>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems={matches ? "flex-start" : "center"}>
                <Grid item xs={12} sm={12} md={4}>
                  <Button
                    type="submit"
                    disableElevation
                    variant="contained"
                    style={{ float: "right" }}
                    className={classes.buttonSave}>
                    Gravar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Company;
