import React from "react";
import { useField, useFormikContext } from "formik";
import { Checkbox, CheckboxProps, FormControlLabel } from "@material-ui/core";

const CheckBox: React.FC<CheckboxProps> = ({
  name,
  placeholder,
  ...otherProps
}) => {
  const [field] = useField(name || "");
  const { setFieldValue } = useFormikContext();

  const configTextField = {
    id: name,
    ...field,
    ...otherProps,
    fullWidth: true,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(`${name}`, event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={field.checked}
          onChange={handleChange}
          name="checkedA"
        />
      }
      label={placeholder}
    />
  );
};

export default CheckBox;
