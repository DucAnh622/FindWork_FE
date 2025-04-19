import React from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "@emotion/styled";
import TelegramIcon from "@mui/icons-material/Telegram";
import { formatDateData } from "../../../utils/utils";
import { useTheme } from "@mui/material/styles";

const TextClamp = styled((props) => <Typography component="span" {...props} />)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardTemplate4 = ({ data, company }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        p: 2,
        mt: 3,
        width: "100%",
        alignItems: isMobile ? "center" : "flex-start",
      }}
    >
      <Box
        component="img"
        src={company.image}
        alt="Company Logo"
        sx={{
          aspectRatio: "1 / 1",
          height: 100,
          width: 100,
          mr: isMobile ? 0 : 2,
          mb: isMobile ? 2 : 0,
          objectFit: "cover",
          borderRadius: 2,
        }}
      />
      <Box sx={{ flex: 1, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "flex-start",
            gap: 1,
          }}
        >
          <Box textAlign={isMobile ? "center" : "left"}>
            <Typography variant="subtitle1" fontWeight="bold">
              <TextClamp title={data.name} sx={{ color: "#6f42c1" }}>
                {data.name}
              </TextClamp>
            </Typography>
            <Typography variant="body2" mt={0.5}>
              <TextClamp title={company.name}>{company.name}</TextClamp>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 1.5,
              py: 0.5,
              borderRadius: 5,
              border: "1px solid #6f42c1",
              color: "#6f42c1",
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            <AttachMoneyIcon sx={{ fontSize: 18, mr: 0.5 }} />
            {data.salary}
          </Box>
        </Box>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={1}
          mt={1}
          alignItems={isMobile ? "center" : "flex-start"}
        >
          <Chip
            icon={<LocationOnIcon />}
            label={<TextClamp title={data.address}>{data.address}</TextClamp>}
            variant="outlined"
            size="small"
            sx={{ maxWidth: 250 }}
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={formatDateData(data.endDate)}
            variant="outlined"
            size="small"
          />
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: "center",
            gap: 1,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6f42c1",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#5a379e",
              },
              width: isMobile ? "100%" : "auto",
            }}
            startIcon={<TelegramIcon />}
          >
            Apply
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#6f42c1",
              color: "#6f42c1",
              width: isMobile ? "100%" : "auto",
            }}
            startIcon={<FavoriteBorderIcon />}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
