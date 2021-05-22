import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const TextInputSearch: React.FC<TextFieldProps> = ({ name, ...otherProps }) => {
  const configTextField = {
    id: name,
    label: name,
    ...otherProps,
    fullWidth: true,
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  return <TextField variant="outlined" {...configTextField} />;
};

export default TextInputSearch;
