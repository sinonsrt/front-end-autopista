import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, TextFieldProps } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

interface OptItens {
  id: string | number | boolean;
  text: string;
}

interface OptProps {
  options: OptItens[];
}

type Props = OptProps & TextFieldProps;

const Select: React.FC<Props> = ({ name, label, options, ...otherProps }) => {
  const configSelect = {
    id: name,
    label: label,
    ...otherProps,
    fullWidth: true,
  };

  const [field, meta] = useField(`${name}`);
  const [fieldAction, metaAction] = useField("action");
  const { setFieldValue, values } = useFormikContext();

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <Autocomplete
      disableClearable
      options={options}
      defaultValue={options.find((item) => item.id === field.value)}
      getOptionLabel={(option) => option.text}
      noOptionsText={"Nenhum resultado encontrado"}
      disabled={fieldAction.value === "view"}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" {...configSelect} />
      )}
      onChange={(event, data) => setFieldValue(`${name}`, data?.id)}
    />
  );
};

export default Select;
