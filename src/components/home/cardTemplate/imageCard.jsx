import React from "react";
import { Box, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export const ImageCard = ({ data, template, setData, handleOpen }) => {
  const isImageNull = !template.image;
  const naviagte = useNavigate();

  const handleCreateTemplate = () => {
    naviagte(`/resume/create/template/${template.id}`)
  }
 
  const handleOpenModal = () => {
    handleOpen();
    setData({ ...data, template: `template${template.id}` });
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "8px auto 0",
        aspectRatio: "2 / 3",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        backgroundImage: isImageNull ? "none" : `url(${template.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
        transition: "transform 0.3s",
        border: "1px solid #ccc",
        backgroundColor: isImageNull ? "#999" : "transparent",
        "&:hover": {
          transform: "scale(1.02)",
        },
        "&:hover .hoverContent": {
          opacity: 1,
          transform: "translateY(0)",
        },
        "&:hover::before": {
          content: isImageNull ? "none" : '""',
          position: "absolute",
          inset: 0,
          transition: "transform 0.3s",
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {isImageNull ? (
          <Button
            className="hoverContent"
            variant="contained"
            onClick={() => handleOpenModal()}
            sx={{
              mt: 2,
              minWidth: 116,
              backgroundColor: "#1976d2",
              transition: "all 0.4s ease",
              opacity: isImageNull ? 1 : 0,
              transform: isImageNull ? "translateY(0)" : "translateY(10px)",
            }}
            startIcon={<FileUploadIcon />}
          >
            Upload
          </Button>
        ) : (
          <Button
            className="hoverContent"
            variant="contained"
            sx={{
              mt: 2,
              minWidth: 116,
              backgroundColor: "#1976d2",
              transition: "all 0.4s ease",
              opacity: 0,
              transform: "translateY(10px)",
            }}
            onClick={()=>handleCreateTemplate()}
            startIcon={<AddIcon />}
          >
            Use
          </Button>
        )}
      </Box>
    </Box>
  );
};
