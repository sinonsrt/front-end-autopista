import React from "react";
import { Button, FormControl, InputLabel, Input, FormHelperText} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    height: "100vh",
  },
});

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <Button variant=  "contained" color="primary">
        Secondary
      </Button>
    </div>
  );
};

export default Login;
