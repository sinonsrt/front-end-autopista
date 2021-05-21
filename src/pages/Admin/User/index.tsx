import React from "react";
import { Formik, Form } from "formik";
import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Button,
  FilledInput,
} from "@material-ui/core";
import TextInput from "../../../components/TextInput";
import Select from "../../../components/Select";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";

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

const User: React.FC = () => {
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
              <Typography variant="h5">Usuário</Typography>

              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="name" label="Nome" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="email" label="E-mail" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="password" label="Senha" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="phone" label="Telefone" />
              </Grid>
              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="avatar" label="avatar" />
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
                  name="access_level"
                  label="Nível de Acesso"
                  options={[
                    { id: "01", text: "Administrador" },
                    { id: "02", text: "Usuário" },
                    { id: "02", text: "Empresarial" },
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
                alignItems={matches ? "flex-start" : "center"}
              >
                <Grid item xs={12} sm={12} md={4}>
                  <Button
                    type="submit"
                    disableElevation
                    variant="contained"
                    style={{ float: "right" }}
                    className={classes.buttonSave}
                  >
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

export default User;
