import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useField } from "formik";

const TextInput: React.FC<TextFieldProps> = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name || "");
  const [fieldAction, metaAction] = useField("action");

  const configTextField = {
    id: name,
    label: name,
    ...field,
    ...otherProps,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <TextField
      variant="outlined"
      {...configTextField}
      disabled={fieldAction.value === "view"}
    />
  );
};

export default TextInput;
