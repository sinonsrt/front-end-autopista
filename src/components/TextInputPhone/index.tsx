import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useField } from "formik";
import MaskedInput from 'react-text-mask';

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      guide={false}
      showMask
    />
  );
}

const TextInput: React.FC<TextFieldProps> = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name || "");
  const [fieldAction, metaAction] = useField("action");

  const configTextField = {
    id: name,
    label: name,
    ...field,
    ...otherProps,
    fullWidth: true,
    InputProps: {
      inputComponent: TextMaskCustom as any
    }
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
