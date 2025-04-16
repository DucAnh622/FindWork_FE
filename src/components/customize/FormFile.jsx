import {
    FormHelperText,
    Box,
    Button,
    FormControl,
  } from "@mui/material";
  import UploadFileIcon from "@mui/icons-material/UploadFile";
  
  export const FormFile = ({
    label,
    data,
    name,
    setData,
    error,
    setError,
    required,
    disabled
  }) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
  
    const handleChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        if (!allowedTypes.includes(file.type)) {
          setError({
            ...error,
            [name]: "Only PDF, DOCX, JPG, JPEG or PNG",
          });
          setData({
            ...data,
            [name]: null,
          });
          return;
        }
  
        setData({
          ...data,
          [name]: file,
        });
        setError({
          ...error,
          [name]: "",
        });
      }
    };
  
    const handleBlur = () => {
      if (required && !data[name]) {
        setError({
          ...error,
          [name]: "This field is required",
        });
      }
    };
  
    return (
      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "stretch",
              gap: 1.5,
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              component="label"
              disabled={disabled}
              startIcon={<UploadFileIcon />}
              sx={{
                textTransform: "none",
                width: { xs: "100%", sm: "50%" },
              }}
            >
              Upload File
              <input
                type="file"
                hidden
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                accept=".pdf, .docx, .jpg, .jpeg, .png"
              />
            </Button>
  
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                p: 1,
                backgroundColor: "#fafafa",
                fontSize: "0.9rem",
                color: "#333",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: { xs: "100%", sm: "50%" },
                display: "flex",
                alignItems: "center",
                minHeight: "40px",
              }}
            >
              {data[name]?.name ?? "No file selected"}
            </Box>
          </Box>
  
          {error[name] && (
            <FormHelperText error sx={{ mt: 1 }}>
              {error[name]}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    );
  };
  