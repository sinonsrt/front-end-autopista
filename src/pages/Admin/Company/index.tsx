import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Edit, Delete, List, Search } from "@material-ui/icons";
import TableFooter from "@material-ui/core/TableFooter";
import Pagination from "@material-ui/lab/Pagination";
import api from "../../../services/api";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextInput from "../../../components/TextInput";
import Select from "../../../components/Select";
import {
  Button,
  Dialog,
  useMediaQuery,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import TextInputSearch from "../../../components/TextInputSearch";
import CompanyLogo from "../../../assets/icons/company-logo.svg";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    searchGrid: {
      display: "flex",
    },
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
    headerTable: {
      backgroundColor: theme.palette.info.main,
    },
    actionButton: {
      marginRight: theme.spacing(1.5),
    },
    iconsColor: {
      color: "#212121",
    },
    spaceIcon: {
      marginRight: theme.spacing(1),
    },
    pagination: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    textCenter: {
      textAlign: "center",
    },
    titleLogo: {
      "& img": {
        width: "5%",
        margin: "0.5%",
      },
    },
    head: {
      backgroundColor: theme.palette.info.main,
    },
    paper: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      flexDirection: "column",
      padding: theme.spacing(4),
      paddingRight: theme.spacing(3),

      [theme.breakpoints.down("xs")]: {
        paddingBottom: 130,
      },
    },
    paperBotton: {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      padding: theme.spacing(1),
      background: "#f9f9f9",
    },
    buttonSave: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.success.main,
      boxShadow: "none",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#208c4e",
      },
    },
  })
);

const Company: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [data, setData] = useState<any[]>([]);
  const [dialogData, setDialogData] = useState<any>({});
  const [refresh, setRefresh] = useState(true);
  const columns = [
    { description: "Razão Social", width: "30%" },
    { description: "CNPJ", width: "25%" },
    { description: "Data de cadastro", width: "20%" },
    { description: "Endereço", width: "25%" },
    { description: "Ações", width: "0%" },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");

  useEffect(() => {
    api
      .get("company")
      .then((response) => setData(response.data))
      .catch((error) => toast.error("Não foi possivel realizar a consulta!"));
  }, [refresh]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemIndex(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDelete(id: string) {
    api
      .delete(`code/${id}`)
      .then(() => {
        toast.success("Registro excluído com sucesso!");
        setRefresh((current) => !current);
      })
      .catch((error) => toast.error("Não foi possível excluir!"));
    handleClose();
  }

  function showCompany(id: string, action: "view" | "edit") {
    api
      .get(`company/${id}`)
      .then((response) => {
        setDialogData({
          ...response.data,
          action: action,
        });
        setOpenDialog(true);
      })
      .catch((error) => toast.error("Não foi possível efetuar a consulta!"));
    handleClose();
  }

  return (
    <>
      <Typography
        variant="h5"
        display="initial"
        align="center"
        className={classes.titleLogo}
      >
        {" "}
        <img src={CompanyLogo} alt="Logotipo empresarial" /> Empresas
        cadastradas
      </Typography>
      <p />
      <Grid container direction="row" justify="flex-start">
        <Grid md={10}>
          <TextInputSearch placeholder="Buscar por..." />
        </Grid>
        <Grid md={2} className={classes.textCenter}>
          <Button
            variant="contained"
            className={classes.buttonAdd}
            color="primary"
            onClick={() => {
              setDialogData({
                id: "",
                type: "",
                corporate_name: "",
                company_name: "",
                cnpj: "",
                ie: "",
                cep: "",
                district: "",
                number: "",
                address: "",
                start_time: "",
                end_time: "",
                worked_days: "",
                city: "",
                services: "",
                action: "include",
              });
              setOpenDialog(true);
            }}
          >
            Incluir
          </Button>
        </Grid>
      </Grid>
      <p />

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow className={classes.headerTable}>
              {columns.map((column) => (
                <TableCell style={{ width: column.width }}>
                  {column.description}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.corporate_name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(event) => handleClick(event, item.id)}>
                    <List />
                  </IconButton>

                  <Menu
                    id={item.id}
                    key={item.id}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <MenuItem
                      onClick={() => showCompany(selectedItemIndex, "view")}
                    >
                      <ListItemIcon>
                        <Search className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Visualizar" />
                    </MenuItem>

                    <MenuItem
                      onClick={() => showCompany(selectedItemIndex, "edit")}
                    >
                      <ListItemIcon>
                        <Edit className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Editar" />
                    </MenuItem>

                    <MenuItem onClick={() => handleDelete(selectedItemIndex)}>
                      <ListItemIcon>
                        <Delete className={classes.iconsColor} />
                      </ListItemIcon>
                      <ListItemText primary="Excluir" />
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <Pagination
              count={5}
              size="small"
              color="primary"
              className={classes.pagination}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={dialogData}
          onSubmit={(values) => {
            switch (values.action) {
              case "include":
                api
                  .post("code", values)
                  .then(() => {
                    setRefresh((current) => !current);
                    setOpenDialog(false);
                    toast.success("Cupom bônus cadastrado com sucesso!");
                  })
                  .catch((error) =>
                    toast.error("Erro ao cadastrar cupom bônus")
                  );
                break;
              case "edit":
                api
                  .put(`put/${values.id}`, values)
                  .then(() => {
                    setRefresh((current) => !current);
                    setOpenDialog(false);
                    toast.success("Cupom bônus atualizado com sucesso!");
                  })
                  .catch((error) =>
                    toast.error("Erro ao alterar cupom bônus!")
                  );
                break;
              default:
                toast.error("Erro ao realizar operação!");
                break;
            }
          }}
          validationSchema={Yup.object({
            code: Yup.string().required("É nescessário informar a descrição!"),
            company_code: Yup.string().required(
              "É nescessário informar uma empresa pra vincular o cupom!"
            ),
          })}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Paper className={classes.paper}>
                <Typography variant="h5">Empresa</Typography>

                <Grid item xs={12} sm={8} md={12}>
                  <Select
                    name="type"
                    label="Tipo de Empresa"
                    options={[
                      {
                        id: "Posto de Combustivel",
                        text: "Posto de Combustivel",
                      },
                      {
                        id: "Prestador de Serviço",
                        text: "Prestador de Serviço",
                      },
                      { id: "Comércio", text: "Comércio" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="corporate_name" label="Razão Social" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="company_name" label="Nome Fantasia" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="cnpj" label="CNPJ" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="ie" label="Inscrição Estadual" />
                </Grid>

                <Typography variant="h5">Endereço</Typography>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="cep" label="CEP" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="district" label="Bairro" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="number" label="Numero" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="address" label="Endereço" />
                </Grid>

                <Typography variant="h5">Funcionamento</Typography>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="start_time" label="Horário de abertura" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <TextInput name="end_time" label="Horário de fechamento" />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <Select
                    name="worked_days"
                    label="Dias da semana"
                    options={[
                      { id: "Segunda - Sexta", text: "Segunda - Sexta" },
                      { id: "Segunda - Domingo", text: "Segunda - Domingo" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <Select
                    name="city"
                    label="Cidade"
                    options={[
                      { id: "Umuarama", text: "Umuarama" },
                      { id: "Maringá", text: "Maringá" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <Select
                    name="services"
                    label="Serviços"
                    options={[
                      { id: "Borracharia", text: "Borracharia" },
                      { id: "Conveniência", text: "Conveniência" },
                    ]}
                  />
                </Grid>
              </Paper>

              <Paper className={classes.paperBotton}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="flex-start"
                  alignItems={matches ? "flex-start" : "center"}
                >
                  <Grid item xs={12} sm={12} md={4}>
                    <Button
                      type="submit"
                      disableElevation
                      variant="contained"
                      style={{ float: "right" }}
                      className={classes.buttonSave}
                    >
                      Gravar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default Company;
