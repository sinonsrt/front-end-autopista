import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInput from "../../../components/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../../services/api";
import { toast } from "react-toastify";
import TextInputPassword from "../../../components/TextInputPassword";
import Select from "../../../components/Select";
import defaultUser from "../../../assets/default_user.png";
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
    },
  })
);

interface Props {
  dialogData: any;
  refresh: any;
  visible: boolean;
  hide: any;
}

const UserDialog: React.FC<Props> = ({
  dialogData,
  refresh,
  visible,
  hide,
}) => {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [image, setImage] = useState<any>();
  const [imageLocalPath, setImageLocalPath] = useState<any>();

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

  return (
    <Dialog
      open={visible}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"md"}
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
            case "include":
              console.log(values);
              api
                .post("users", formData)
                .then(() => {
                  refresh();
                  hide();
                  setImageLocalPath(undefined);
                  setImage(undefined);
                  toast.success("Usuário cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao cadastrar usuário"));
              break;
            case "edit":
              api
                .put(`users/${values.id}`, formData)
                .then(() => {
                  refresh();
                  hide();
                  setImageLocalPath(undefined);
                  setImage(undefined);
                  toast.success("Usuário cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao alterar usuário"));
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
          <Form>
            <Paper className={classes.head}>
              <DialogTitle>Usuário</DialogTitle>
            </Paper>

            <DialogContent>
              <TextInput name="name" label="Nome" required />
            </DialogContent>

            <DialogContent>
              <TextInput name="email" label="E-mail" required />
            </DialogContent>

            <DialogContent>
              <TextInputPassword name="password" label="Senha" required />
            </DialogContent>

            <DialogContent>
              <TextInputPassword
                name="confirm-password"
                label="Confirme sua senha"
                required
              />
            </DialogContent>

            <DialogContent>
              <TextInput name="phone" label="Telefone" required />
            </DialogContent>

            <DialogContent>
              <Select
                name="access_level"
                label="Nível de acesso"
                options={data.map((item) => ({
                  id: item.id,
                  text: item.description,
                }))}
              />
            </DialogContent>

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

            <DialogContent style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  values.avatar
                    ? `http://25.99.194.144:3333/avatar/${values.avatar}`
                    : imageLocalPath || defaultUser
                }
                style={{ width: 80, marginRight: 8 }}
              />

              <input
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

export default UserDialog;
