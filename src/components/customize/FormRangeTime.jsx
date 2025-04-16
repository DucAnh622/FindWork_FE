import React, { useState } from "react";
import { TextField, FormControl } from "@mui/material";
import { checkTimeRange } from "../../utils/utils";
import "../../assets/styles/FormRange.scss";

export const FormRangeTime = ({
  label,
  nameFrom = "from",
  nameTo = "to",
  data,
  setData,
  error,
  setError,
  disabled,
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

    const timeErrors = checkTimeRange(data, nameFrom, nameTo, label);
    Object.keys(timeErrors).forEach((key) => {
      errors[key] = timeErrors[key];
    });

    setError(errors);
  };

  return (
    <div className="formRange">
      <FormControl fullWidth error={Boolean(error[nameFrom])} sx={{ flex: 1 }}>
        <TextField
          fullWidth
          label={`From ${label}`}
          type="time"
          value={data[nameFrom]}
          error={Boolean(error[nameFrom])}
          helperText={error[nameFrom]}
          name={nameFrom}
          required
          disabled={disabled}
          sx={{ backgroundColor: disabled ? "#f1f1f1" : "inherit" }}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>

      <FormControl fullWidth error={Boolean(error[nameTo])} sx={{ flex: 1 }}>
        <TextField
          fullWidth
          label={`To ${label}`}
          type="time"
          value={data[nameTo]}
          error={Boolean(error[nameTo])}
          helperText={error[nameTo]}
          name={nameTo}
          required
          disabled={disabled}
          sx={{ backgroundColor: disabled ? "#f1f1f1" : "inherit" }}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    </div>
  );
};
