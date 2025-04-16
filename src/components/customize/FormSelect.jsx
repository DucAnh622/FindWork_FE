import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography
} from "@mui/material";
import { getLevelStyles } from "../../utils/utils";

export const FormSelect = ({
  label,
  options,
  data,
  name,
  setData,
  error,
  setError
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleBlur = () => {
    const errors = { ...error };
    if (!data[name]) {
      errors[name] = "This field is required";
    } else {
      delete errors[name];
    }
    setError(errors);
  };

  return (
    <FormControl fullWidth error={error[name]}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label={label}
        value={data[name]}
        name={name}
        required
        sx={{height: 56}}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <MenuItem value="">Choose</MenuItem>
        {options.map((item, index) => {
          return (
            <MenuItem value={item.value} key={index}>
              <Typography
                sx={{
                  display: "inline-block",
                  padding: "4px 12px",
                  fontSize: "16px",
                  minWidth: "80px",
                  textAlign: "center",
                  borderRadius: 2,
                  ...getLevelStyles(item.label),
                }}
              >
                {item.label}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
      {error[name] && <FormHelperText>{error[name]}</FormHelperText>}
    </FormControl>
  );
};
