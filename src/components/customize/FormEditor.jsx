import MDEditor from "@uiw/react-md-editor";
import { FormControl, FormHelperText } from "@mui/material";

export const FormEditor = ({ label, data, name, setData, error, setError }) => {
  const handleChange = (value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleBlur = () => {
    if (!data[name] || data[name].trim() === "") {
      setError({
        ...error,
        [name]: "This field is required",
      });
    } else {
      setError({
        ...error,
        [name]: "",
      });
    }
  };

  return (
    <FormControl fullWidth error={Boolean(error[name])}>
      {label && <label>{label}</label>}

      <div className="boxEdit">
        <MDEditor
          data-color-mode={"light"} 
          value={data[name]}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          height={300}
        />
      </div>
      {error[name] && <FormHelperText>{error[name]}</FormHelperText>}
    </FormControl>
  );
};
