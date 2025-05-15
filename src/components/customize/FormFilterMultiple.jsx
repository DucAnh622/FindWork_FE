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
  ml = "",
  width = 250,
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
        ml: ml,
        minWidth: width,
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
        // Destructure key separately
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
        const maxVisibleTags = 1; // Show only the first tag
        const hiddenTagCount = value.length - maxVisibleTags;

        if (value.length > 1) {
          // Destructure to exclude key from getTagProps
          const { key, ...tagProps } = getTagProps({ index: 0 });

          return [
            <Chip
              key="first-label" // Explicitly pass key
              label={value[0].label}
              size="small"
              {...tagProps} // Spread props without key
              sx={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />,
            <Chip
              key="more-tags" // Explicitly pass key
              label={`(+${hiddenTagCount})`}
              size="small"
              sx={{
                display: "flex",
                alignItems: "center",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />,
          ];
        } else {
          return value.map((option, index) => {
            // Destructure to exclude key from getTagProps
            const { key, ...tagProps } = getTagProps({ index });

            return (
              <Chip
                key={`chip-${index}`} // Explicitly pass key
                label={option.label}
                {...tagProps} // Spread props without key
                size="small"
                sx={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              />
            );
          });
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
