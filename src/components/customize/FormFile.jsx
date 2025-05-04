import {
  FormHelperText,
  Box,
  Button,
  FormControl,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { TextClamp } from "./TextClamp";
import { PDFModal } from "../dashBoard/Modal/pdfModal";
import { useState } from "react";

export const FormFile = ({
  file,
  setFile,
  data,
  name,
  setData,
  error,
  setError,
  required,
  disabled,
}) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];
  const [open, setOpen] = useState(false);

  const handlePreview = () => {
    if (data[name]) {
      const fileURL =
        typeof data[name] === "string"
          ? data[name]
          : URL.createObjectURL(data[name]);
      setFile(fileURL);
      setOpen(true);
    }
  };

  const handleDelete = () => {
    if (typeof data[name] !== "string") {
      URL.revokeObjectURL(file);
    }
    setData({
      ...data,
      [name]: null,
    });
    setError({
      ...error,
      [name]: "",
    });
    setFile(null);
    setOpen(false);
  };

  const handleClosePreview = () => {
    setOpen(false);
    setFile(null);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setError({
          ...error,
          [name]: "Only PDF, DOCX, JPG, JPEG, GIF or PNG",
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

  const displayFileName =
    typeof data[name] === "string"
      ? data[name].split("/").pop()
      : data[name]?.name ?? "No file selected";

  return (
    <>
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
              sx={{
                textTransform: "none",
                width: { xs: "10%" },
                height: "56px",
              }}
            >
              <CloudUploadIcon />
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
                fontSize: "0.9rem",
                color: "#333",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: { xs: "90%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "56px",
              }}
            >
              <TextClamp title={displayFileName}>{displayFileName}</TextClamp>

              {data[name] && (
                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={handlePreview}
                    title="View"
                    size="small"
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    title="Download"
                    size="small"
                    onClick={() => {
                      const fileURL =
                        typeof data[name] === "string"
                          ? data[name]
                          : URL.createObjectURL(data[name]);
                      const link = document.createElement("a");
                      link.href = fileURL;
                      link.download = displayFileName;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <FileDownloadIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={handleDelete}
                    title="Delete"
                    size="small"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>

          {error[name] && (
            <FormHelperText error sx={{ mt: 1 }}>
              {error[name]}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <PDFModal open={open} file={file} handleClose={handleClosePreview} />
    </>
  );
};
