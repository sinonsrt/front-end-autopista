import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import TextInput from "../../../components/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../../services/api";
import { toast } from "react-toastify";
import TextInputPassword from "../../../components/TextInputPassword";
import Select from "../../../components/Select";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    api
      .get("accesslevel")
      .then((response) => setData(response.data))
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
  }, [refresh]);

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullScreen={fullScreen}
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
                  toast.success("Usuário cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao cadastrar usuário"));
              break;
            case "edit":
              api
                .put(`users/${values.id}`, values)
                .then(() => {
                  refresh();
                  hide();
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
              <Select
                name="city_id"
                label="Cidade"
                options={data.map((item) => ({
                  id: item.id,
                  text: item.description,
                }))}
              />
            </DialogContent>

            <DialogContent>
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
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

export default UserDialog;
