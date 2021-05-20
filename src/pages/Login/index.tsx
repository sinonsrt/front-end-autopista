import React from "react";
import clsx from 'clsx';
import { Button, TextField, FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { Visibility, VisibilityOff } from '@material-ui/icons';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';

import background from "../../assets/background-login.jpg";
import logo from "../../assets/autopista-bbranca-mp.png";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    alignItems: "stretch"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "700px"
  },
  loginForm: {
    display: "flex",
    margin: "30px 0",
    width: "340px",
    textAlign: "center",
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
  },
  buttonLogin: {
    height: "56px",
    borderRadius: "10px",
    width: "100%",
    fontSize: "24px",
    margin: theme.spacing(1),
  },
  background: {
    flex: "1",
    backgroundSize: "cover",
  },
  aLosePassword: {
    color: "#595959",
    display: "block",
    marginTop: "18px",
    textDecoration: "none",
    fontSize: "18px"
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  a: {
    color: "#595959",
    display: "block",
    marginTop: "15%",
    textDecoration: "none",
    fontSize: "18px",
  }
}));
interface State {
  password: string;
  showPassword: boolean;
}

const Login: React.FC = () => {
  const classes = useStyles()

  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  })

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <div className={classes.root}>
        <img src={logo} alt="AutoPista" />
          <form action="">
            <TextField className={classes.textField} id="outlined-basic" label="E-mail" variant="outlined" />
            <FormControl className={clsx(classes.textField)} variant="outlined">
              <InputLabel htmlFor="password">Senha</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={values.showPassword ? 'text' : 'password'} value={values.password} onChange={handleChange('password')} endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
              } labelWidth={70} />
            </FormControl>
          <Button className={classes.buttonLogin} variant="contained" color="primary">
            Entrar
          </Button>
        </form>
          <a className={classes.aLosePassword}  href="/">
            <strong> Esqueci minha senha </strong>
          </a>
        </div>
        <a href="/register" className={classes.a}>
          <ReplyAllIcon/>
          Realizar cadastro
        </a>
      </div>
      <img className={classes.background} src={background} alt="Background" />
    </div>
  );
};

export default Login;
