import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { Formik, Form } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Swal from "sweetalert2";

import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";

import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginTop: theme.spacing(-8),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(4),
      width: "90px",
      height: "90px",
      float: "right",
      display: "grid",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        width: 200,
        marginBottom: 60,
        marginRight: 30,
      },
    },
    iconButton: {
      padding: 10,
    },

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
    button: {
      margin: theme.spacing(1),
      boxShadow: "none",
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

const ExampleForm: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", phone: "", city: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("É necessário informar o nome")
            .min(3, "O nome precisa ter no mínimo 3 caracteres"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("E-Mail inválido"),
          phone: Yup.string()
            .required("Telefone obrigatório")
            .min(8, "Telefone deve ter ao menos 8 dígitos"),
          city: Yup.string().required("Cidade obrigatória"),
        })}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Paper className={classes.paper}>
              <Typography variant="h5" gutterBottom>
                Cadastro (submit no console)
              </Typography>

              <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems={matches ? "flex-start" : "center"}
              >
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="name" label="Nome" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="email" label="E-mail" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="phone" label="Telefone" />
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

export default ExampleForm;
