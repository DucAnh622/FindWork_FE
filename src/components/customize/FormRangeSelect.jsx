import React from "react";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import "../../assets/styles/FormRange.scss";

export const CustomRangeSelect = ({
  label,
  options,
  nameFrom = "from",
  nameTo = "to",
  data,
  setData,
  error,
  setError,
  type,
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
    const errors = {};

    if (!data[nameFrom]) {
      errors[nameFrom] = "This field is required";
    }
    if (!data[nameTo]) {
      errors[nameTo] = "This field is required";
    }

    switch(type) {
      case "Experience":
        if (
          data[nameFrom] &&
          data[nameTo] &&
          parseFloat(data[nameFrom]) > parseFloat(data[nameTo])
        ) {
          errors[nameFrom] = `Min ${label} cannot be greater than max ${label}`;
          errors[nameTo] = `Max ${label} cannot be less than min ${label}`;
        }
        break;
      case "Day":
        if (
          data[nameFrom] &&
          data[nameTo] &&
          parseInt(data[nameFrom]) >= parseInt(data[nameTo])
        ) {
          errors[nameFrom] = `Min ${label} cannot be greater than max ${label}`;
          errors[nameTo] = `Max ${label} cannot be less than min ${label}`;
        }
        break;  
    }
    setError(errors);
  };

  return (
    <div className="formRange">
        <FormControl fullWidth error={error[nameFrom]} sx={{flex:1}}>
        <InputLabel>{`From ${label}`}</InputLabel>
        <Select
          name={nameFrom}
          value={data[nameFrom]}
          onChange={handleChange}
          onBlur={handleBlur}
          label={`From ${label}`}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        {error[nameFrom] && <FormHelperText>{error[nameFrom]}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth error={error[nameTo]} sx={{flex:1}}>
        <InputLabel>{`To ${label}`}</InputLabel>
        <Select
          name={nameTo}
          value={data[nameTo]}
          onChange={handleChange}
          onBlur={handleBlur}
          label={`To ${label}`}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        {error[nameTo] && <FormHelperText>{error[nameTo]}</FormHelperText>}
      </FormControl>
    </div>
  );
};
