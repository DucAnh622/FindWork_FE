import * as React from "react";
import { useState, useEffect } from "react"; // Add useEffect
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { getRolesStyles } from "../../utils/utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export const MultipleSelect = ({
  options = [],
  label = "Select",
  value = [],
  onChange = () => {},
  handleBlurSelect,
  width,
  resetError = false, 
}) => {
  const [error, setError] = useState(false);
  const selectedIds = value.map((role) => role.id);

  useEffect(() => {
    if (resetError) {
      setError(false);
    }
  }, [resetError]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedRoles = options.filter((option) => value.includes(option.id));
    onChange(event, selectedRoles);
  };

  const handleBlur = () => {
    if (selectedIds.length === 0) {
      setError(true);
    } else {
      setError(false);
    }

    if (handleBlurSelect) {
      handleBlurSelect();
    }
  };

  return (
    <FormControl sx={{ width: width }} error={error}>
      <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        multiple
        value={selectedIds}
        onChange={handleChange}
        onBlur={handleBlur}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        renderValue={(selected) =>
          options
            .filter((option) => selected.includes(option.id))
            .map((option) => option.name)
            .join(", ")
        }
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={selectedIds.includes(option.id)} />
            <Typography
              sx={{
                display: "inline-block",
                padding: "4px 12px",
                fontSize: "16px",
                minWidth: "80px",
                textAlign: "center",
                borderRadius: 2,
                ...getRolesStyles(option.name),
                error: error && selectedIds.length === 0 ? "red" : "inherit",
              }}
            >
              {option.name}
            </Typography>
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>Roles must be required</FormHelperText>}
    </FormControl>
  );
};
