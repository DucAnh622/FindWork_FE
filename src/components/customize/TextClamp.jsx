import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const TextClamp = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TextClamp2 = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  text-overflow: ellipsis;
`;
