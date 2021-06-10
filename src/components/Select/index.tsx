import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, TextFieldProps } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

interface OptItens {
  id: string;
  text: string;
}

interface OptProps {
  options: OptItens[];
}

type Props = OptProps & TextFieldProps;

const Select: React.FC<Props> = ({
  name,
  label,
  options,
  ...otherProps
}) => {
  const configSelect = {
    id: name,
    label: label,
    ...otherProps,
    fullWidth: true,
  };

  const [field, meta] = useField(`${name}`);
  const { setFieldValue } = useFormikContext();

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.text}
      noOptionsText={"Nenhum resultado encontrado"}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" {...configSelect} />
      )}
      onChange={(event, data) => setFieldValue(`${name}`, data?.id)}
    />
  );
};

export default Select;
