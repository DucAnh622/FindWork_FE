import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { TextClamp } from "./TextClamp";
import Chip from "@mui/material/Chip";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const FormFilterMultiple = ({
  setData,
  data,
  setError = () => {},
  required = false,
  error = {},
  name,
  placeholder,
  list,
}) => {
  const handleChange = (event, newValue) => {
    setData((prevData) => ({
      ...prevData,
      [name]: newValue.map((item) => item.value),
    }));

    if (required && newValue.length === 0) {
      setError((prevError) => ({
        ...prevError,
        [name]: "This field is required",
      }));
    } else {
      setError((prevError) => {
        const { [name]: _, ...rest } = prevError;
        return rest;
      });
    }
  };

  return (
    <Autocomplete
      size="small"
      multiple
      id={`checkboxes-tags-${name}`}
      options={list}
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1f2937",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9d42ff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9d42ff",
          },
        },
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      value={list.filter((item) => data[name]?.includes(item.value))}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            <TextClamp title={option.label}>{option.label}</TextClamp>
          </li>
        );
      }}
      renderTags={(value, getTagProps) => {
        if (value.length <= 2) {
          return value.map((option, index) => (
            <Chip
              key={index}
              label={option.label}
              {...getTagProps({ index })}
              size="small"
            />
          ));
        } else {
          return [
            <Chip
              key={0}
              label={value[0].label}
              {...getTagProps({ index: 0 })}
              size="small"
            />,
            <Chip
              key={1}
              label={`(+${value.length - 1})`}
              size="small"
              {...getTagProps({ index: 1 })}
            />,
          ];
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={data[name]?.length === 0 ? placeholder : ""}
          error={required && !!error[name]}
          helperText={required && error[name] ? error[name] : ""}
        />
      )}
    />
  );
};
