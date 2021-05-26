import React from "react";
import { Formik, Form } from "formik";
import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import TextInput from "../../../components/TextInput";
import Select  from "../../../components/Select";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const Code: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Formik
        initialValues={{ description: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Paper className={classes.paper}>
              <Typography variant="h3">Cadastro</Typography>
              <Typography variant="h5">Cupom Bônus</Typography>

              <Grid item xs={12} sm={8} md={12}>
                <TextInput name="code" label="Cupom bônus para comentário" />
              </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <Select
                    name="company"
                    label="Empresa"
                    options={[
                      { id: "Auto Posto Presidente", text: "Auto Posto Presidente" },
                      { id: "Auto Posto Stella Maris", text: "Auto Posto Stella Maris" },
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
    </div>
  );
};

export default Code;
