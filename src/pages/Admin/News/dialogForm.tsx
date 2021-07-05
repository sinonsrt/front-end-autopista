import React, { useState } from "react";
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
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import TextInput from "../../../components/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../../services/api";
import { toast } from "react-toastify";

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

const NewsDialog: React.FC<Props> = ({
  dialogData,
  refresh,
  visible,
  hide,
}) => {
  const classes = useStyles();
  const [data,  ] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const [image, setImage] = useState<any>();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              api
                .post("news", values)
                .then(() => {
                  refresh();
                  hide();
                  toast.success("Notícias cadastrado com sucesso");
                })
                .catch((error) => toast.error("Erro ao cadastrar notícias"));
              break;
            case "edit":
              api
                .put(`news/${values.id}`, values)
                .then(() => {
                  refresh();
                  hide();
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
          describe: Yup.string().required("É nescessário informar a descrição"),
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

export default NewsDialog;
