import { Grid, Box, Button, Typography, InputLabel } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { FormInput } from "../../../../components/customize/FormInput";
import { FormEditor } from "../../../../components/customize/FormEditor";
import { useState, useEffect } from "react";

const FormProject = ({ formData, setFormData }) => {
  const dataDefault = {
    Project: "",
    start: "",
    end: "",
    position: "",
    link:"",
    description: "",
  };

  const errorDefault = {
    project: "",
    start: "",
    end: "",
    link:"",
    position: "",
    description: "",
  };

  const normalizeData = (inputData) => {
    return inputData.map((item) => ({
      project: item.project || "",
      start: item.start || "",
      end: item.end || "",
      link: item.link || "",
      position: item.position || "",
      description: item.description || "",
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: "2rem", fontWeight: "bold", mb: 2 }}
          >
            Project
          </Typography>
        </Grid>
        {data.map((form, index) => (
          <Box key={index} sx={{ width: "100%", mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  label="Project"
                  placeholder="Project..."
                  maxLength={100}
                  type="text"
                  name="project"
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
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  label="Position"
                  placeholder="Position..."
                  maxLength={100}
                  type="text"
                  name="position"
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
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  label="Link"
                  placeholder="Link..."
                  maxLength={100}
                  type="text"
                  name="link"
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
              <Grid item xs={12} md={3} lg={3}>
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
              <Grid item xs={12} md={3} lg={3}>
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
              <Grid item xs={12} md={12} lg={12}>
                <InputLabel id={`description-label-${index}`} sx={{ mb: 2 }}>
                  <strong>Description</strong>
                </InputLabel>
                <FormEditor
                  name="description"
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
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                lg={1}
                sx={{ display: "flex", alignItems: "center" }}
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
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default FormProject;