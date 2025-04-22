import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography } from "@mui/material";
export const EmptyData = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        p: 3,
        m: "auto",
        textAlign: "center",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, mb: 2, color: "#6f42c1" }} />
      <Typography variant="h6">No data</Typography>
    </Box>
  );
};
