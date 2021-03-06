/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInput from "../../../components/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Select from "../../../components/Select";
import AsyncSelect from "../../../components/AsyncSelect";
import defaultImage from "../../../assets/default_image.png";
import MultipleSelect from "../../../components/MultipleSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonAdd: {
      margin: theme.spacing(1.4),
      paddingTop: theme.spacing(0.5),
      paddingLeft: "28px",
      paddingRight: "28px",
      backgroundColor: theme.palette.success.main,
      boxShadow: "none",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#208c4e",
      },
    },
    head: {
      backgroundColor: theme.palette.info.main,
      padding: "2px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content",
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  })
);

interface Props {
  visible: boolean;
  hide: any;
}

const CompanyDialog: React.FC<Props> = ({ visible, hide }) => {
  const classes = useStyles();
  const [city, setCity] = useState<any[]>([]);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("xs");

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    api
      .get("cities?page=1&limit=10000&order=description&type=asc")
      .then((response) => setCity(response.data.data))
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
  }, []);

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby="max-width-dialog-title"
    >
      <Formik
        initialValues={{ type: "Posto de combustivel", confirmed: true, city_id: '' }}
        onSubmit={(values) => {
          api
            .get(
              `companyReports?type=${values.type}&confirmed=${values.confirmed}&city_id=${values.city_id}`
            )
            .then((response) => {
              window.open(`${process.env.REACT_APP_API_URL}/${response.data}`);
            })
            .catch((error) =>
              toast.error("Nenhum registro encontrado com esse filtro ")
            );
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.form}>
            <Paper className={classes.head}>
              <DialogTitle>Relat??rio de Empresas</DialogTitle>
            </Paper>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={12}>
                <DialogContent>
                  <Select
                    name="type"
                    required
                    label="Tipo de Empresa"
                    options={[
                      {
                        id: "Posto de combustivel",
                        text: "Posto de combustivel",
                      },
                      {
                        id: "Prestador de servi??o",
                        text: "Prestador de servi??o",
                      },
                    ]}
                  />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={12}>
                <DialogContent>
                  <Select
                    name="confirmed"
                    required
                    label="Status"
                    options={[
                      { id: true, text: "Confirmado" },
                      { id: false, text: "N??o Confirmado" },
                    ]}
                  />
                </DialogContent>
              </Grid>
            </Grid>

            <DialogContent>
              <AsyncSelect
                name="city_id"
                label="Cidade"
                options={city.map((item) => ({
                  id: item.id,
                  text: `${item.description} - ${item.state[0].initials}`,
                }))}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  hide();
                }}
                color="primary"
              >
                Cancelar
              </Button>

              <Button type="submit" className={classes.buttonAdd}>
                Gerar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CompanyDialog;
