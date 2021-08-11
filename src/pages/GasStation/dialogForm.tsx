/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInput from "../../components/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import Select from "../../components/Select";
import AsyncSelect from "../../components/AsyncSelect";
import defaultImage from "../../assets/default_image.png";
import MultipleSelect from "../../components/MultipleSelect";
import RatingDialog from "./ratingDialog";

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
    logo: {
      width: "300pt",
      marginLeft: "25pt",
      alignContent: "center",
      borderRadius: "15pt",
    },
    map: {
      float: "inline-start",
    },
    divImage: {
      display: "flex",
    },
  })
);

interface Props {
  dialogData: any;
  refresh: any;
  visible: boolean;
  hide: any;
}

const GasStationDialog: React.FC<Props> = ({
  dialogData,
  refresh,
  visible,
  hide,
}) => {
  const classes = useStyles();
  const [types, setTypes] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [ratingDialogData, setDialogData] = useState<any>({});
  const [ratingOpenDialog, ratingSetOpenDialog] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [ratingRefresh, ratingSetRefresh] = useState(0);
  const [workedDays, setWorkedDays] = useState<any[]>([]);
  const [workedTimes, setWorkedTimes] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");

  const [image, setImage] = useState<any>();
  const [imageLocalPath, setImageLocalPath] = useState<any>();

  const handleClose = () => {
    setAnchorEl(null);
  };

  function showTypes(id: string, action: "view") {
    ratingSetOpenDialog(true);
  }

  useEffect(() => {
    api
      .get("types")
      .then((response) => setTypes(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, []);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServices({ ...services, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Dialog
        open={visible}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="max-width-dialog-title"
      >
        <Formik
          initialValues={dialogData}
          onSubmit={(values) => {}}
          validationSchema={Yup.object({})}
        >
          {({ values, setFieldValue }) => (
            <Form className={classes.form}>
              <Paper className={classes.head}>
                <Typography variant="h5" align="center">
                  POSTO DE COMBUSTÍVEL
                </Typography>
              </Paper>

              <div className={classes.divImage}>
                <Grid xs={6} sm={6} md={6}>
                  <img
                    src={
                      values.avatar
                        ? `http://25.99.194.144:3333/company/${values.avatar}`
                        : imageLocalPath || defaultImage
                    }
                    className={classes.logo}
                  />
                </Grid>

                {dialogData.action === "view" && (
                  <Grid xs={6} sm={6} md={6}>
                    <DialogContent>
                      <iframe
                        width="380"
                        height="250"
                        loading="lazy"
                        className={classes.map}
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCARVw8BxECC731e9oN2A9-zTV6TbyVqM0&q=${`${dialogData.address
                          .trim()
                          .replaceAll(" ", "+")}+${dialogData.number
                          .toString()
                          .trim()
                          .replaceAll(" ", "+")}+${
                          city.find((item) => item.id === dialogData.city_id)
                            .description
                        }`}`}
                      ></iframe>
                    </DialogContent>
                  </Grid>
                )}
              </div>

              <Grid container spacing={3}>
                <Grid xs={6} sm={6} md={12}>
                  <Typography
                    variant="h5"
                    align="center"
                    style={{ marginTop: "2%" }}
                  >
                    {values.company_name}
                  </Typography>
                </Grid>

                <Grid xs={6} sm={6} md={6}>
                  <DialogContent>
                    <TextInput name="cnpj" label="CNPJ" required />
                  </DialogContent>
                </Grid>

                <Grid xs={12} sm={12} md={6}>
                  <DialogContent>
                    <TextInput name="company_name" label="EMPRESA" required />
                  </DialogContent>
                </Grid>

                <Grid xs={12} sm={12} md={12}>
                  <Typography variant="h5" align="center">
                    ENDEREÇO
                  </Typography>
                </Grid>

                <Grid xs={12} sm={12} md={10}>
                  <DialogContent>
                    <TextInput name="address" label="Endereço" required />
                  </DialogContent>
                </Grid>

                <Grid xs={4} sm={4} md={2}>
                  <DialogContent>
                    <TextInput name="number" label="Numero" required />
                  </DialogContent>
                </Grid>

                <Grid xs={6} sm={6} md={4}>
                  <DialogContent>
                    <TextInput name="cep" label="CEP" required />
                  </DialogContent>
                </Grid>

                <Grid xs={6} sm={6} md={4}>
                  <DialogContent>
                    <TextInput name="district" label="Bairro" required />
                  </DialogContent>
                </Grid>

                <Grid xs={8} sm={8} md={4}>
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
                </Grid>

                <Grid xs={12} sm={12} md={12}>
                  <Typography variant="h5" align="center">
                    CONTATO
                  </Typography>
                </Grid>

                <Grid xs={6} sm={6} md={6}>
                  <DialogContent>
                    <TextInput name="phone" label="Telefone" required />
                  </DialogContent>
                </Grid>

                <Grid xs={6} sm={6} md={6}>
                  <DialogContent>
                    <TextInput name="email" label="E-mail" required />
                  </DialogContent>
                </Grid>

                <Grid xs={6} sm={6} md={6}>
                  <DialogContent>
                    <Select
                      name="worked_day_id"
                      label="Dias de funcionamento"
                      required
                      options={workedDays.map((item) => ({
                        id: item.id,
                        text: item.description,
                      }))}
                    />
                  </DialogContent>
                </Grid>

                <Grid xs={6} sm={6} md={6}>
                  <DialogContent>
                    <Select
                      name="worked_time_id"
                      label="Horário de funcionamento"
                      required
                      options={workedTimes.map((item) => ({
                        id: item.id,
                        text: item.description,
                      }))}
                    />
                  </DialogContent>
                </Grid>
              </Grid>

              <Grid xs={12} sm={12} md={12}>
                <Typography variant="h5" align="center">
                  SERVIÇOS OFERECIDOS
                </Typography>

                <Grid xs={6} sm={6} md={12}>
                  <DialogContent>
                    <MultipleSelect
                      name="services"
                      label="Serviços"
                      options={services.map((item) => ({
                        id: item.id,
                        text: item.description,
                      }))}
                    />
                  </DialogContent>
                </Grid>
              </Grid>

              <DialogActions>
                <Button
                  onClick={() => showTypes(selectedItemIndex, "view")}
                  variant="contained"
                  color="secondary"
                >
                  Avaliar Empresa
                </Button>
                <Button
                  onClick={() => {
                    hide();
                    setImageLocalPath(undefined);
                    setImage(undefined);
                  }}
                  color="primary"
                >
                  Cancelar
                </Button>

                {values.action !== "view" && (
                  <Button type="submit" className={classes.buttonAdd}>
                    Gravar
                  </Button>
                )}
              </DialogActions>
            </Form>
          )}
        </Formik>

        <RatingDialog
          dialogData={ratingDialogData}
          visible={ratingOpenDialog}
          hide={() => ratingSetOpenDialog(false)}
          refresh={() => ratingSetRefresh(Math.random())}
        />
      </Dialog>
    </>
  );
};

export default GasStationDialog;
