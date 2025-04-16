import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export const PDFModal = ({ open, resume, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "80%",
          height: "80%",
          bgcolor: "white",
          p: 3,
          m: "10vh auto",
          borderRadius: 2,
          boxShadow: 24,
          outline: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Resume detail of {resume.fullname} ({resume.email})</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <iframe
            src={resume.url}
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          ></iframe>
        </Box>
      </Box>
    </Modal>
  );
};
