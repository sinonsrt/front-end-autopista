import React from "react";
import clsx from 'clsx';
import { Button, TextField, FormControl, InputAdornment, MenuItem, Select, InputLabel, OutlinedInput, IconButton } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import background from "../../assets/background-register.png";
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
    maxWidth: "700px",
  },
  textField: {
    width: "80%",
    margin: theme.spacing(1),
    marginLeft: "10%"
  },
  buttonLogin: {
    height: "56px",
    borderRadius: "10px",
    padding: "0 16px",
    width: "80%",
    fontSize: "24px",
    fontWeight: 500,
    marginTop: "16px",
    marginLeft: "10%"
  },
  background: {
    flex: "1",
    backgroundSize: "cover",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const Register: React.FC = () => {
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
                      { values.showPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
              } labelWidth={70} />
            </FormControl>
            <FormControl className={clsx(classes.textField)} variant="outlined">
              <InputLabel htmlFor="password-confirm">Confirme sua senha</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={values.showPassword ? 'text' : 'password'} value={values.password} onChange={handleChange('password')} endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      { values.showPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
              } labelWidth={70} />
            </FormControl>
            <TextField className={classes.textField} id="outlined-basic" label="Telefone" variant="outlined" />
            <FormControl variant="outlined" className={classes.textField}>
                <InputLabel id="demo-simple-select-outlined-label">Cidade</InputLabel>
                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Cidade">
                <MenuItem value="1">Umuarama</MenuItem>
                <MenuItem value="1">Maringá</MenuItem>
                <MenuItem value="1">Cianorte</MenuItem>
                </Select>
            </FormControl>
          <Button type="submit" className={classes.buttonLogin} variant="contained" color="primary">
            Cadastrar
          </Button>
        </form>
        <a href="/" className={classes.a}>
            <ReplyAllIcon/>
            Voltar a tela de login
        </a>
        </div>
      </div>
      <img className={classes.background} src={background} alt="Background" />
    </div>
  );
};

export default Register