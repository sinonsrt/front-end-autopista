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

const AsyncSelect: React.FC<Props> = ({
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
  const [fieldOptions, setFieldOptions] = useState<OptItens[]>([]);
  const [message, setMessage] = useState("Digite ao menos 3 caracteres");

  const [field, meta] = useField(`${name}`);
  const { setFieldValue } = useFormikContext();

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  function handleOptions(text: string) {
    if (text.length >= 3) {
      setMessage("Nenhum resultado encontrado");
      setFieldOptions(
        options.filter((option) =>
          option.text.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setFieldOptions([]);
      setMessage("Digite ao menos 3 caracteres");
    }
  }

  return (
    <Autocomplete
      options={fieldOptions}
      getOptionLabel={(option) => option.text}
      noOptionsText={message}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          {...configSelect}
          onChange={(event) => handleOptions(event.target.value)}
        />
      )}
      onChange={(event, data) => setFieldValue(`${name}`, data?.id)}
    />
  );
};

export default AsyncSelect;
