import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  Typography,
  InputLabel,
  FormHelperText,
} from "@mui/material";

export const FormMultipleSelect = ({
  name,
  data,
  setData,
  label,
  options,
  error,
  setError,
  required,
}) => {
  const handleChange = (field) => (event) => {
    setData((prev) => ({
      ...prev,
      [field]: event.target.value.map(String),
    }));
  };

  const handleBlur = () => {
    if (required) {
      const errors = { ...error };
      if (!data[name] || data[name].length === 0) {
        errors[name] = "This field is required";
      } else {
        delete errors[name];
      }
      setError(errors);
    }
  };

  const selectedValues = (data[name] || []).map(String);

  return (
    <FormControl fullWidth error={required && !!error[name]}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        label={label}
        multiple
        value={selectedValues}
        onBlur={handleBlur}
        onChange={handleChange(name)}
        renderValue={(selected) => {
          const selectedLabels = options
            .filter((opt) => selected.includes(String(opt.value)))
            .map((opt) => opt.label);
          return selectedLabels.join(", ");
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={String(option.value)}>
            <Checkbox checked={selectedValues.includes(String(option.value))} />
            <Typography>{option.label}</Typography>
          </MenuItem>
        ))}
      </Select>
      {required && error[name] && (
        <FormHelperText>{error[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
