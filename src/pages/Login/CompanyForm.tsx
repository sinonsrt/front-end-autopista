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
import { Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import Select from "../../components/Select";
import AsyncSelect from "../../components/AsyncSelect";
import defaultImage from "../../assets/default_image.png";
import MultipleSelect from "../../components/MultipleSelect";
import TextInputPassword from "../../components/TextInputPassword";
import TextInput from "../../components/TextInput";
import TextInputPhone from "../../components/TextInputPhone";
import TextInputCnpj from "../../components/TextInputCnpj";
import TextInputCep from "../../components/TextInputCep";
import useMediaQuery from '@material-ui/core/useMediaQuery';


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
      width: "500pt",
      marginLeft: "25pt",
      alignContent: "center",
      borderRadius: "15pt",
    },
    textField: {
      width: "97.5%",
      margin: theme.spacing(1),
    },
  })
);

interface Props {
  dialogData: any;
  refresh: any;
  visible: boolean;
  hide: any;
}

const CompanyDialog: React.FC<Props> = ({
  dialogData,
  refresh,
  visible,
  hide,
}) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [types, setTypes] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [city, setCity] = useState<any[]>([]);
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

  useEffect(() => {
    api
      .get("types")
      .then((response) => setTypes(response.data))
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
  }, []);

  useEffect(() => {
    api
      .get("cities?page=1&limit=10000&order=description&type=asc")
      .then((response) => setCity(response.data.data))
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
  }, []);

  useEffect(() => {
    api
      .get("workedDays")
      .then((response) => setWorkedDays(response.data))
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
  }, []);

  useEffect(() => {
    api
      .get("workedTimes")
      .then((response) => setWorkedTimes(response.data))
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
  }, []);

  useEffect(() => {
    api
      .get("services")
      .then((response) => setServices(response.data))
      .catch((error) => toast.error("N??o foi poss??vel efetuar a consulta!"));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServices({ ...services, [event.target.name]: event.target.checked });
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
        initialValues={dialogData}
        onSubmit={(values) => {
          values.avatar = image;
          const formData = new FormData();
          Object.keys(values).forEach((key) =>
            formData.append(key, values[key] === null ? "" : values[key])
          );
          api
            .post("companyRegister", formData)
            .then(() => {
              refresh();
              setImageLocalPath(undefined);
              setImage(undefined);
              hide();
              toast.success(
                "Caso seu cadastro seja aprovado, entraremos em contato em breve! Obrigado!"
              );
            })
            .catch((error) => toast.error("Erro ao realizar cadastro!"));
        }}
        validationSchema={Yup.object({
          type_id: Yup.string().required("Tipo de empresa obrigat??rio!"),
          cnpj: Yup.string()
            .required("CNPJ ?? obrigat??rio!")
            .min(15, "CNPJ inv??lido!"),
          corporate_name: Yup.string().required("Raz??o social ?? obrigat??rio!"),
          company_name: Yup.string().required("Nome Fantasia ?? obrigat??rio!"),
          cep: Yup.string()
            .required("CEP ?? obrigat??rio!")
            .min(7, "CEP inv??lido!"),
          district: Yup.string().required("Bairro ?? obrigat??rio!"),
          address: Yup.string().required("Endere??o ?? obrigat??rio!"),
          number: Yup.string().required("N??mero ?? obrigat??rio!"),
          city_id: Yup.number().required("Cidade ?? obrigat??rio!"),
          phone: Yup.string()
            .required("N??mero de telefone obrigat??rio!")
            .min(14, "N??mero de telefone inv??lido!"),
          email: Yup.string()
            .email("Endere??o de e-mail inv??lido!")
            .required("O endere??o de e-mail ?? obrigat??rio!"),
          worked_day_id: Yup.string().required(
            "Dias de funcionamento ?? obrigat??rio!"
          ),
          worked_time_id: Yup.string().required(
            "Hor??rio de funcionamento ?? obrigat??rio!"
          ),
          password: Yup.string()
            .required("A senha ?? obrigat??ria!")
            .min(6, "A senha deve conter no m??nimo 6 d??gitos!"),
        })}
        validateOnBlur={false}
        validateOnChange={true}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.form}>
            <Paper className={classes.head}>
              <DialogTitle>Venha fazer parte do AutoPista!</DialogTitle>
            </Paper>
            <Grid container spacing={3}>
              <Grid xs={12} sm={12} md={12}>
                <DialogContent>
                  <Select
                    name="type_id"
                    required
                    label="Tipo de Empresa"
                    options={types.map((item) => ({
                      id: item.id,
                      text: item.description,
                    }))}
                  />
                </DialogContent>
              </Grid>

              <Grid xs={6} sm={6} md={6}>
                <DialogContent>
                  <TextInputCnpj name="cnpj" label="CNPJ" required />
                </DialogContent>
              </Grid>

              <Grid xs={6} sm={6} md={6}>
                <DialogContent>
                  <TextInput name="ie" label="Inscri????o Estadual" />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={6} md={6}>
                <DialogContent>
                  <TextInput
                    name="corporate_name"
                    label="Raz??o Social"
                    required
                  />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={6}>
                <DialogContent>
                  <TextInput
                    name="company_name"
                    label="Nome Fantasia"
                    required
                  />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={12}>
                <Typography variant="h5" align="center">
                  Endere??o
                </Typography>
              </Grid>

              <Grid xs={6} sm={6} md={4}>
                <DialogContent>
                  <TextInputCep name="cep" label="CEP" required />
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

              <Grid xs={12} sm={12} md={10}>
                <DialogContent>
                  <TextInput name="address" label="Endere??o" required />
                </DialogContent>
              </Grid>

              <Grid xs={4} sm={4} md={2}>
                <DialogContent>
                  <TextInput name="number" label="Numero" required />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={12}>
                <Typography variant="h5" align="center">
                  Contato
                </Typography>
              </Grid>

              <Grid xs={6} sm={6} md={6}>
                <DialogContent>
                  <TextInputPhone name="phone" label="Telefone" required />
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
                    label="Hor??rio de funcionamento"
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
                Servi??os
              </Typography>

              <Grid xs={6} sm={6} md={12}>
                <DialogContent>
                  <MultipleSelect
                    name="services"
                    label="Servi??os"
                    options={services.map((item) => ({
                      id: item.id,
                      text: item.description,
                    }))}
                  />
                </DialogContent>
              </Grid>
            </Grid>

            <Grid xs={12} sm={12} md={12}>
              <Typography variant="h5" align="center">
                Seguran??a
              </Typography>
            </Grid>

            <Grid xs={6} sm={6} md={12}>
              <DialogContent>
                <TextInputPassword name="password" label="Senha" required />
              </DialogContent>
            </Grid>

            <Grid xs={6} sm={6} md={6}>
              <img
                src={
                  values.avatar
                    ? `http://25.99.194.144:3333/company/${values.avatar}`
                    : imageLocalPath || defaultImage
                }
                style={{ width: 80, marginRight: 8 }}
                className={classes.logo}
              />

              <label htmlFor="logo">
                <input
                  hidden={dialogData.action === "view"}
                  type="file"
                  required
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      setFieldValue("avatar", null);
                      setImage(event.target.files[0]);
                      setImageLocalPath(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }
                  }}
                />
              </label>
            </Grid>

            <DialogActions>
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
    </Dialog>
  );
};

export default CompanyDialog;
