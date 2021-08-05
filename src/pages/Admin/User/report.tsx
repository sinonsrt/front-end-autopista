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

  const [fullWidth, setFullWidth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("xs");

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby="max-width-dialog-title"
    >
      <Formik
        initialValues={{ confirmed: true }}
        onSubmit={(values) => {
          api
            .get(`userReports?confirmed=${values.confirmed}`)
            .then((response) => {
              console.log(process.env.REACT_APP_API_URL);
              window.open(`http://25.99.194.144:3333/${response.data}`);
            })
            .catch((error) =>
              toast.error("Nenhum registro encontrado com esse filtro ")
            );
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.form}>
            <Paper className={classes.head}>
              <DialogTitle>Relatório de Usuários</DialogTitle>
            </Paper>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={12}>
                <DialogContent>
                  <Select
                    name="confirmed"
                    required
                    label="Status"
                    options={[
                      { id: true, text: "Confirmado" },
                      { id: false, text: "Não Confirmado" },
                    ]}
                  />
                </DialogContent>
              </Grid>
            </Grid>

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
