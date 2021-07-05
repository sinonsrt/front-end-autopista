import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import TextInput from "../../../components/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Select from "../../../components/Select";
import AsyncSelect from "../../../components/AsyncSelect";

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
  const [data, setData] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [workedDays, setWorkedDays] = useState<any[]>([]);
  const [workedTimes, setWorkedTimes] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const [image, setImage] = useState<any>();

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    api
      .get("accesslevel")
      .then((response) => setData(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, [refresh]);

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
  }, [refresh]);

  useEffect(() => {
    api
      .get("workedTimes")
      .then((response) => setWorkedTimes(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, [refresh]);

  /* useEffect(() => {
    api
      .get("services")
      .then((response) => setServices(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, [refresh]); */

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
          switch (values.action) {
            case "include":
              console.log(values);
              api
                .post("register", values)
                .then(() => {
                  refresh();
                  hide();
                  toast.success("Empresa cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao cadastrar empresa"));
              break;
            case "edit":
              api
                .put(`users/${values.id}`, values)
                .then(() => {
                  refresh();
                  hide();
                  toast.success("Empresa cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao alterar empresa"));
              break;
            default:
              toast.error("Erro ao realizar operação");
              break;
          }
        }}
        validationSchema={Yup.object({
          /* description: Yup.string().required(
            "É necessário informar a descrição"
          ), */
        })}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.form}>
            <Paper className={classes.head}>
              <Typography variant="h5">Empresa</Typography>
            </Paper>
            <Grid container spacing={3}>
              <Grid xs={12} sm={12} md={12}>
                <DialogContent>
                  <Select
                    name="type_id"
                    label="Tipo de Empresa"
                    options={data.map((item) => ({
                      id: item.id,
                      text: item.description,
                    }))}
                  />
                </DialogContent>
              </Grid>

              <Grid xs={6} sm={6} md={6}>
                <DialogContent>
                  <TextInput name="cnpj" label="CNPJ" required />
                </DialogContent>
              </Grid>

              <Grid xs={6} sm={6} md={6}>
                <DialogContent>
                  <TextInput name="ie" label="Inscrição Estadual" required />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={12}>
                <DialogContent>
                  <TextInput
                    name="corporate_name"
                    label="Razão Social"
                    required
                  />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={12}>
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
                  Endereço
                </Typography>
              </Grid>

              <Grid xs={6} sm={6} md={6}>
                <DialogContent>
                  <TextInput name="cep" label="CEP" required />
                </DialogContent>
              </Grid>

              <Grid xs={6} sm={6} md={6}>
                <DialogContent>
                  <TextInput name="district" label="Bairro" required />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={12}>
                <DialogContent>
                  <TextInput name="address" label="Endereço" required />
                </DialogContent>
              </Grid>

              <Grid xs={4} sm={4} md={4}>
                <DialogContent>
                  <TextInput name="number" label="Numero" required />
                </DialogContent>
              </Grid>

              <Grid xs={8} sm={8} md={8}>
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
                  Contato
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
                    name="worked_days"
                    label="Dias de funcionamento"
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
                    name="worked_time"
                    label="Horário de funcionamento"
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
                Serviços
              </Typography>
            </Grid>

            <DialogContent>
              <Fab color="primary" aria-label="add">
                <AddIcon />
                <input
                  type="file"
                  className={classes.textField}
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      setImage(event.target.files[0]);
                    }
                  }}
                />
              </Fab>
              <img
                src="https://ilustrado.com.br/wp-content/uploads/2021/03/combustivel_adulterado-761x520.jpg"
                // poderia ser assim: src=`${process.env.ENDERECO_DO_BACK_PUBLIC}/images/nome_da_imagem.jpg`
                alt="teste"
                style={{ width: 100 }}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={() => hide()} color="primary">
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
