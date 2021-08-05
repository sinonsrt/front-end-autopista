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
import { useAuth } from "../../hooks/Auth";

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
      width: "150pt",
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

const UserRoleDialog: React.FC<Props> = ({
  dialogData,
  refresh,
  visible,
  hide,
}) => {
  const classes = useStyles();
  const [types, setTypes] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [workedDays, setWorkedDays] = useState<any[]>([]);
  const [workedTimes, setWorkedTimes] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");

  const [image, setImage] = useState<any>();
  const [imageLocalPath, setImageLocalPath] = useState<any>();

  const { user } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  /*  useEffect(() => {
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
  }, []); */

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
          switch (values.action) {
            case "view":
              api
                .get(`users/${values.id}`)
                .then(() => {
                  setImageLocalPath(undefined);
                  setImage(undefined);
                  refresh();
                  hide();
                  toast.success("Usuário encontrado com sucesso");
                })
                .catch((error) =>
                  toast.error("Não foi possível efetuar a consulta!")
                );
              break;
            default:
              toast.error("Erro ao realizar operação");
              break;
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.form}>
            <Typography variant="h5" align="center" className={classes.head}>
              <strong>{user.name}</strong>
            </Typography>
            <Grid container>
              <Grid xs={12} sm={12} md={6}>
                <DialogContent>
                  <TextInput name="name" label="Nome" required />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={6}>
                <DialogContent>
                  <TextInput name="email" label="E-mail" required />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={6}>
                <DialogContent>
                  <TextInput name="phone" label="Telefone" required />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={6}>
                <DialogContent>
                  <AsyncSelect
                    name="city_id"
                    label="Cidade"
                    required
                    options={city.map((item) => ({
                      id: item.id,
                      text: item.description + " - " + item.state[0].initials,
                    }))}
                  />
                </DialogContent>
              </Grid>
            </Grid>

            <div className={classes.divImage}>
              <Grid xs={6} sm={6} md={6}>
                <img
                  src={
                    user.avatar
                      ? `http://localhost:3333/company/${user.avatar}`
                      : imageLocalPath || defaultImage
                  }
                  className={classes.logo}
                />

                  <input
                    hidden={dialogData.action === "view"}
                    type="file"
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
              </Grid>
            </div>

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

export default UserRoleDialog;
