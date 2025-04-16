import { Grid, Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { FormInput } from "../../../../components/customize/FormInput";
import { hasValue } from "../../../../utils/utils";
import { useState, useEffect } from "react";

const FormEducation = ({ formData, setFormData }) => {
  const dataDefault = {
    university: "",
    start: "",
    end: "",
    gpa: "",
    speciality: "",
  };

  const errorDefault = {
    university: "",
    start: "",
    end: "",
    gpa: "",
    speciality: "",
  };

  const normalizeData = (inputData) => {
    return inputData.map((item) => ({
      university: item.university || "",
      start: item.start || "",
      end: item.end || "",
      gpa: item.gpa || "",
      speciality: item.speciality || "",
    }));
  };

  const [data, setData] = useState(
    formData && formData.length > 0
      ? normalizeData(formData)
      : [{ ...dataDefault }]
  );
  const [error, setError] = useState(
    formData && formData.length > 0
      ? formData.map(() => ({ ...errorDefault }))
      : [{ ...errorDefault }]
  );

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(data)) {
      setData(
        formData && formData.length > 0
          ? normalizeData(formData)
          : [{ ...dataDefault }]
      );
      setError(
        formData && formData.length > 0
          ? formData.map(() => ({ ...errorDefault }))
          : [{ ...errorDefault }]
      );
    }
  }, [formData]);

  const handleAdd = () => {
    const newData = [...data, { ...dataDefault }];
    setData(newData);
    setFormData(newData);
    setError([...error, { ...errorDefault }]);
  };

  const handleRemove = (index) => {
    if (data.length > 1) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      setFormData(newData);
      setError(error.filter((_, i) => i !== index));
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: "2rem", fontWeight: "bold", mb: 2 }}
          >
            Education
          </Typography>
        </Grid>
        {data.map((form, index) => (
          <Grid container spacing={2} sx={{mb:2}} key={index}>
            <Grid item xs={12} md={6} lg={6}>
              <FormInput
                label="University"
                placeholder="University..."
                maxLength={100}
                type="text"
                name="university"
                data={form}
                setData={(newData) => {
                  const updatedData = [...data];
                  updatedData[index] = { ...newData };
                  setData(updatedData);
                  setFormData(updatedData);
                }}
                error={error[index]}
                setError={(newError) => {
                  const updatedError = [...error];
                  updatedError[index] = { ...newError };
                  setError(updatedError);
                }}
                required={true}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <FormInput
                label="Speciality"
                placeholder="Speciality..."
                maxLength={100}
                type="text"
                name="speciality"
                data={form}
                setData={(newData) => {
                  const updatedData = [...data];
                  updatedData[index] = { ...newData };
                  setData(updatedData);
                  setFormData(updatedData);
                }}
                error={error[index]}
                setError={(newError) => {
                  const updatedError = [...error];
                  updatedError[index] = { ...newError };
                  setError(updatedError);
                }}
                required={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <FormInput
                label="Start"
                placeholder="Start..."
                maxLength={10}
                type="date"
                name="start"
                data={form}
                setData={(newData) => {
                  const updatedData = [...data];
                  updatedData[index] = { ...updatedData[index], ...newData };
                  setData(updatedData);
                  setFormData(updatedData);
                }}
                error={error[index]}
                setError={(newError) => {
                  const updatedError = [...error];
                  updatedError[index] = {
                    ...updatedError[index],
                    ...newError,
                  };
                  setError(updatedError);
                }}
                required={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <FormInput
                label="End"
                placeholder="End..."
                type="date"
                name="end"
                maxLength={10}
                data={form}
                setData={(newData) => {
                  const updatedData = [...data];
                  updatedData[index] = { ...updatedData[index], ...newData };
                  setData(updatedData);
                  setFormData(updatedData);
                }}
                error={error[index]}
                setError={(newError) => {
                  const updatedError = [...error];
                  updatedError[index] = {
                    ...updatedError[index],
                    ...newError,
                  };
                  setError(updatedError);
                }}
                required={true}
                min={form.start}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4}>
              <FormInput
                label="GPA"
                placeholder="GPA..."
                maxLength={2}
                type="number"
                name="gpa"
                data={form}
                setData={(newData) => {
                  const updatedData = [...data];
                  updatedData[index] = { ...newData };
                  setData(updatedData);
                  setFormData(updatedData);
                }}
                error={error[index]}
                setError={(newError) => {
                  const updatedError = [...error];
                  updatedError[index] = { ...newError };
                  setError(updatedError);
                }}
                required={true}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              lg={1}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {index === 0 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAdd}
                  sx={{ minWidth: 100 }}
                  startIcon={<AddCircleIcon />}
                >
                  Add
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ minWidth: 100 }}
                  onClick={() => handleRemove(index)}
                  startIcon={<RemoveCircleIcon />}
                >
                  Remove
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FormEducation;