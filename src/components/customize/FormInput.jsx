import { TextField, IconButton, InputAdornment } from "@mui/material";
import { checkNumber } from "../../utils/utils";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const FormInput = ({
  label,
  data,
  name,
  setData,
  error,
  setError,
  type,
  required,
  maxLength,
  placeholder,
  minRows,
  showPassword,
  setShowPassword,
  min,
  disabled,
}) => {
  const handleChange = (event) => {
    if (event.target.value.length <= maxLength) {
      setData({
        ...data,
        [name]: event.target.value,
      });
    }
  };

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleBlur = () => {
    const errors = {};
    if (required === true) {
      if (!data[name] || data[name].trim() === "") {
        setError({
          ...error,
          [name]: "This field is required",
        });
      } else {
        switch (type) {
          case "number":
            const rangeErrors = checkNumber(data, name, label, maxLength);
            Object.keys(rangeErrors).forEach((key) => {
              errors[key] = rangeErrors[key];
            });
            break;
          case "date":
            break;
          case "text":
            break;
          case "email":
            break;
          case "password":
            break;
        }
        setError(errors);
      }
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      type={
        type === "password"
          ? showPassword === true
            ? "text"
            : "password"
          : type === "number"
          ? "text"
          : type
      }
      value={data[name]}
      error={required === true && Boolean(error[name])}
      helperText={required === true && error[name]}
      name={name}
      minRows={minRows}
      multiline={minRows ? true : false}
      slotProps={{
        htmlInput: {
          maxLength: maxLength,
          min: type === "date" && min ? min : undefined,
        },
      }}
      disabled={disabled || false}
      required={required || false}
      onChange={
        type === "number"
          ? (e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*$/.test(value)) {
                if (value.length <= maxLength) {
                  handleChange(e);
                }
              }
            }
          : handleChange
      }
      onBlur={handleBlur}
      variant="outlined"
      placeholder={placeholder}
      InputProps={{
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPass} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      InputLabelProps={{
        shrink: type === "date" ? true : undefined,
      }}
    />
  );
};
