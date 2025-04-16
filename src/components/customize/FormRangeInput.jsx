import React, { useState } from "react";
import { TextField, FormControl } from "@mui/material";
import { currentDate } from "../../utils/constant";
import { checkNumberRange, checkTimeRange } from "../../utils/utils";
import "../../assets/styles/FormRange.scss";

export const FormRangeInput = ({
  label,
  nameFrom = "from",
  nameTo = "to",
  data,
  setData,
  error,
  setError,
  type,
  disabled,
  maxLength,
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

    switch (type) {
      case "date":
        if (
          data[nameFrom] &&
          data[nameTo] &&
          new Date(data[nameFrom]) > new Date(data[nameTo])
        ) {
          errors[nameFrom] = `From ${label} cannot be greater than to ${label}`;
          errors[nameTo] = `To ${label} cannot be less than from ${label}`;
        }
        break;
      case "number":
        const rangeErrors = checkNumberRange(
          data,
          nameFrom,
          nameTo,
          label,
          maxLength
        );
        Object.keys(rangeErrors).forEach((key) => {
          errors[key] = rangeErrors[key];
        });
        break;
      case "time":
        const timeErrors = checkTimeRange(data, nameFrom, nameTo, label);
        Object.keys(timeErrors).forEach((key) => {
          errors[key] = timeErrors[key];
        });
        break;
    }

    setError(errors);
  };

  return (
    <div className="formRange">
      <FormControl fullWidth error={Boolean(error[nameFrom])} sx={{ flex: 1 }}>
        <TextField
          fullWidth
          label={`From ${label}`}
          type={type === "number" ? "text" : type}
          value={data[nameFrom]}
          error={Boolean(error[nameFrom])}
          helperText={error[nameFrom]}
          name={nameFrom}
          required
          disabled={disabled}
          slotProps={{ htmlInput: { maxLength: maxLength } }}
          sx={{
            backgroundColor: disabled ? "#f1f1f1" : "inherit",
            "& .MuiInputBase-root": {
              height: 56,
            },
          }}
          onChange={
            type === "date"
              ? handleChange
              : (e) => {
                  const value = e.target.value;
                  if (
                    type !== "date" &&
                    (value === "" || /^[0-9]*$/.test(value))
                  ) {
                    if (value.length <= maxLength) {
                      handleChange(e);
                    }
                  }
                }
          }
          onBlur={handleBlur}
          variant="outlined"
          inputProps={{ min: type === "number" ? 0 : currentDate }}
          InputLabelProps={type === "number" ? undefined : { shrink: true }}
        />
      </FormControl>

      <FormControl fullWidth error={Boolean(error[nameTo])} sx={{ flex: 1 }}>
        <TextField
          fullWidth
          label={`To ${label}`}
          type={type}
          value={data[nameTo]}
          error={Boolean(error[nameTo])}
          helperText={error[nameTo]}
          name={nameTo}
          required
          disabled={disabled}
          sx={{
            backgroundColor: disabled ? "#f1f1f1" : "inherit",
            "& .MuiInputBase-root": {
              height: 56,
            },
          }}
          onChange={
            type === "date"
              ? handleChange
              : (e) => {
                  const value = e.target.value;
                  if (
                    type !== "date" &&
                    (value === "" || /^[0-9]*$/.test(value))
                  ) {
                    if (value.length <= maxLength) {
                      handleChange(e);
                    }
                  }
                }
          }
          onBlur={handleBlur}
          variant="outlined"
          inputProps={{ min: type === "number" ? data[nameFrom] : currentDate }}
          InputLabelProps={type === "number" ? undefined : { shrink: true } }
        />
      </FormControl>
    </div>
  );
};
