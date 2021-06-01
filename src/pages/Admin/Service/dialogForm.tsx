import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
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

const ServiceDialog: React.FC<Props> = ({
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
      .get("types")
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
              api
                .post("services", values)
                .then(() => {
                  refresh();
                  hide();
                  toast.success("Serviço cadastrado com sucesso");
                })
                .catch((error) =>
                  toast.error("Erro ao cadastrar serviço")
                );
              break;
            case "edit":
              api
                .put(`services/${values.id}`, values)
                .then(() => {
                  refresh();
                  hide();
                  toast.success("Serviço cadastrado com sucesso");
                })
                .catch((error) =>
                  toast.error("Erro ao alterar serviço")
                );
              break;
            default:
              toast.error("Erro ao realizar operação");
              break;
          }
        }}
        validationSchema={Yup.object({
          description: Yup.string().required(
            "É necessário informar a descrição"
          ),
        })}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Paper className={classes.head}>
              <DialogTitle>Serviço</DialogTitle>
            </Paper>

            <DialogContent>
              <TextInput name="description" label="Descrição" required />
            </DialogContent>

            <DialogContent>
                  <Select
                    name="type_id"
                    label="Tipo de Serviço"
                    options={data.map((item) => (
                      {id: item.id, text: item.description}
                    ))}
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

export default ServiceDialog;
