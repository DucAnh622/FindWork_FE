import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const ConfirmModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal open={open === true ? true : false} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: "white",
          p: 3,
          mx: "auto",
          mt: "20vh",
          textAlign: "center",
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <ErrorOutlineIcon color="warning" sx={{ fontSize: 50, mb: 2 }} />
        <Typography variant="h6">Are you sure?</Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
          Do you want to confirm?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="warning" onClick={handleConfirm}>
            Submit
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
