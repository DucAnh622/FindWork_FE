import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { Close } from "@mui/icons-material";

export const PDFModal = ({ open, file, handleClose }) => {
  return (
    <Modal open={open} onClose={() => handleClose()}>
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
          <div></div>
          <Typography variant="h6">Preview</Typography>
          <IconButton onClick={() => handleClose()}>
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
            src={file}
            frameBorder="0"
            display="block"
            width="100%"
            height="100%"
            style={{
              border: "none",
              overflowX: "hidden",
              overflowY: "auto",
              border: "1px solid #ccc",
            }}
          ></iframe>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <div></div>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => handleClose()}
          >
            Close
          </Button>
          <div></div>
        </Box>
      </Box>
    </Modal>
  );
};
