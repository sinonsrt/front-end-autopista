/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInput from "../../components/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import AsyncSelect from "../../components/AsyncSelect";
import defaultImage from "../../assets/default_image.png";
import { useAuth } from "../../hooks/Auth";
import { SecurityOutlined } from "@material-ui/icons";
import PasswordDialog from "./PasswordDialog";
import TextInputPhone from "../../components/TextInputPhone";

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
  hide: any;
}

const UserRoleDialog: React.FC<Props> = ({ hide }) => {
  const classes = useStyles();
  const [city, setCity] = useState<any[]>([]);
  const [passwordOpenDialog, passwordSetOpenDialog] = useState(false);
  const [passwordDialogData, passwordSetDialogData] = useState<any>({});
  const [refresh, setRefresh] = useState(0);

  const [image, setImage] = useState<any>();
  const [imageLocalPath, setImageLocalPath] = useState<any>();

  const { user } = useAuth();

  useEffect(() => {
    api
      .get("cities?page=1&limit=10000&order=description&type=asc")
      .then((response) => setCity(response.data.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, []);

  function passwordChange(action: "password") {
    passwordSetOpenDialog(true);
  }

  return (
    <>
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          city_id: user.city[0].description,
        }}
        onSubmit={(values: any) => {
          values.avatar = image;
          const formData = new FormData();
          Object.keys(values).forEach((key) =>
            formData.append(key, values[key] === null ? "" : values[key])
          );

          api
            .put(`users/${user.id}`, values)
            .then(() => {
              setImageLocalPath(undefined);
              setImage(undefined);
              hide();
              toast.success("Usuário atualizado com sucesso");
            })
            .catch((error) => toast.error("Não foi possível efetuar a ação!"));
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
                  <TextInputPhone name="phone" label="Telefone" required />
                </DialogContent>
              </Grid>

              <Grid xs={12} sm={12} md={6}>
                <DialogContent>
                  <TextInput name="city_id" label="Cidade" required />
                </DialogContent>
              </Grid>
            </Grid>

            <Grid xs={12} sm={12} md={6}>
              <DialogContent>
                <Button
                  style={{ color: "red", margin: "5px" }}
                  variant="contained"
                  startIcon={<SecurityOutlined />}
                  size="medium"
                  onClick={() => passwordChange("password")}
                >
                  Segurança
                </Button>
              </DialogContent>
            </Grid>

            <div className={classes.divImage}>
              <Grid xs={6} sm={6} md={6}>
                <DialogContent>
                  <img
                    src={
                      user.avatar
                        ? `http://localhost:3333/company/${user.avatar}`
                        : imageLocalPath || defaultImage
                    }
                    className={classes.logo}
                  />

                  <input
                    // hidden={data.action === "view"}
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
                </DialogContent>
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
                Retornar
              </Button>

              <Button type="submit" className={classes.buttonAdd}>
                Gravar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>

      <PasswordDialog
        dialogData={passwordDialogData}
        visible={passwordOpenDialog}
        hide={() => passwordSetOpenDialog(false)}
        refresh={() => setRefresh(Math.random())}
      />
    </>
  );
};

export default UserRoleDialog;
