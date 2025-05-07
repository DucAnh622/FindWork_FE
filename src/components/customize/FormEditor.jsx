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
      <div style={{ position: "relative" }}>
        {label && (
          <label
            style={{
              position: "absolute",
              top: "-0.75rem",
              left: "0.75rem",
              backgroundColor: "#fff",
              padding: "0 4px",
              fontSize: "0.875rem",
              color: error[name] ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
            }}
          >
            {label}
          </label>
        )}

        <div
          style={{
            border: `1px solid ${
              error[name] ? "#d32f2f" : "rgba(0, 0, 0, 0.23)"
            }`,
            borderRadius: "4px",
            padding: "0.5rem",
          }}
        >
          <MDEditor
            data-color-mode={"light"}
            value={data[name]}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            height={300}
          />
        </div>
      </div>

      {error[name] && <FormHelperText>{error[name]}</FormHelperText>}
    </FormControl>
  );
};
