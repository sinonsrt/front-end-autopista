import React, { useState } from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useField } from "formik";
import { IconButton, InputAdornment, Tooltip } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Zoom from "@material-ui/core/Zoom";

const TextInputPassword: React.FC<TextFieldProps> = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name || "");
  const [visible, setVisible] = useState(false);

  const configTextField = {
    id: name,
    label: name,
    ...field,
    ...otherProps,
    fullWidth: true,
    type: visible ? "text" : "password",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <Tooltip
            TransitionComponent={Zoom}
            title="Alterar a visibilidade da senha"
            arrow
          >
            <IconButton
              onClick={() => setVisible((currentState) => !currentState)}
            >
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </Tooltip>
        </InputAdornment>
      ),
    },
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField variant="outlined" {...configTextField} />;
};

export default TextInputPassword;
