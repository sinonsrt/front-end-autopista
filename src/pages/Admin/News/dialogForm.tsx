import React, { useState } from "react";
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
import defaultImage from "../../../assets/default_image.png";

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

const NewsDialog: React.FC<Props> = ({
  dialogData,
  refresh,
  visible,
  hide,
}) => {
  const classes = useStyles();

  const [image, setImage] = useState<any>();
  const [imageLocalPath, setImageLocalPath] = useState<any>();

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
          values.image = image;
          const formData = new FormData();
          Object.keys(values).forEach((key) =>
            formData.append(key, values[key] === null ? "" : values[key])
          );
          switch (values.action) {
            case "include":
              api
                .post("news", formData)
                .then(() => {
                  refresh();
                  hide();
                  setImageLocalPath(undefined);
                  setImage(undefined);
                  toast.success("Notícias cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao cadastrar notícias"));
              break;
            case "edit":
              api
                .put(`news/${values.id}`, formData)
                .then(() => {
                  refresh();
                  hide();
                  setImageLocalPath(undefined);
                  setImage(undefined);
                  toast.success("Notícias cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao alterar notícias"));
              break;
            default:
              toast.error("Erro ao realizar operação");
              break;
          }
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("É necessário informar o título"),
          description: Yup.string().required(
            "É necessário informar a descrição"
          ),
        })}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Paper className={classes.head}>
              <DialogTitle>Notícias</DialogTitle>
            </Paper>

            <DialogContent>
              <TextInput name="title" label="Título" required />
            </DialogContent>

            <DialogContent>
              <TextInput name="description" label="Descrição" required />
            </DialogContent>

            <DialogContent>
              <TextInput name="link" label="URL:" required />
            </DialogContent>

            <DialogContent style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  values.avatar
                    ? `http://25.99.194.144:3333/logo/${values.avatar}`
                    : imageLocalPath || defaultImage
                }
                style={{ width: 150, marginRight: 8 }}
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

export default NewsDialog;
