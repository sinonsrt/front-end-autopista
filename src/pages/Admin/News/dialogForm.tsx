/* eslint-disable jsx-a11y/alt-text */
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
          values.avatar = image;
          const formData = new FormData();
          Object.keys(values).forEach((key) =>
            formData.append(key, values[key] === null ? "" : values[key])
          );
          switch (values.action) {
            case "include":
              api
                .post("newsPaper", formData)
                .then(() => {
                  refresh();
                  hide();
                  setImageLocalPath(undefined);
                  setImage(undefined);
                  toast.success("Not??cias cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao cadastrar not??cias"));
              break;
            case "edit":
              api
                .put(`newsPaper/${values.id}`, formData)
                .then(() => {
                  refresh();
                  hide();
                  setImageLocalPath(undefined);
                  setImage(undefined);
                  toast.success("Not??cias cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao alterar not??cias"));
              break;
            default:
              toast.error("Erro ao realizar opera????o");
              break;
          }
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("?? necess??rio informar o t??tulo"),
          description: Yup.string().required(
            "?? necess??rio informar a descri????o"
          ),
        })}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Paper className={classes.head}>
              <DialogTitle>Not??cias</DialogTitle>
            </Paper>

            <DialogContent>
              <TextInput name="title" label="T??tulo" required />
            </DialogContent>

            <DialogContent>
              <TextInput name="description" label="Descri????o" required />
            </DialogContent>

            <DialogContent>
              <TextInput name="link" label="URL:" required />
            </DialogContent>

            <DialogContent style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  values.avatar
                    ? `http://localhost:3333/news/${values.avatar}`
                    : imageLocalPath || defaultImage
                }
                style={{ width: 150, marginRight: 8 }}
              />

              <input
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
