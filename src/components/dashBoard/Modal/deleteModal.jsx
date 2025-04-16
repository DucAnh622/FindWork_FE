import React, { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";

export const DeleteModal = ({ open, handleClose, handleDelete}) => {
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
        <Delete sx={{ fontSize: 50, color: "red", mb: 2 }} />
        <Typography variant="h6">Are you sure?</Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
          Do you really want to delete these records? This process cannot be undone.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};


