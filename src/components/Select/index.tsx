import React, { ChangeEvent } from "react";
import { MenuItem, TextField, TextFieldProps } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

interface OptItens {
  id: string;
  text: string;
}

interface OptProps {
  options: OptItens[];
}

type Props = OptProps & TextFieldProps;

const Select: React.FC<Props> = ({ name, options, ...otherProps }) => {
  const [field, meta] = useField(name || "");
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue(name || "", value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    defaultValue: "",
    select: true,
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField variant="outlined" {...configSelect}>
      {options.map((i) => (
        <MenuItem key={i.id} value={i.id}>
          {i.text}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
