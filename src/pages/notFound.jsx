import { Box } from "@mui/material";

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        p: 2,
      }}
    >
      <Box
        component="img"
        src="https://bizmac.com/Images/Editor/images/404-not-found-la-gi.jpg"
        alt="404 Not Found"
        sx={{
          maxWidth: "100%",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
          height: "auto", 
          objectFit: "contain",
          border: "none"
        }}
      />
    </Box>
  );
};
