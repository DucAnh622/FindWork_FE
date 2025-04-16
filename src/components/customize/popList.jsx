import React, { useState } from "react";
import {
  Box,
  Button,
  Popover,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { getStatusStyles } from "../../utils/utils";

export const PopoverList = ({ list = [], maxWidth = "200px", buttonLabel }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "list-popover" : undefined;

  return (
    <Box>
      <Button
        sx={{
          display: "inline-block",
          padding: "4px 12px",
          fontSize: "16px",
          textAlign: "center",
          borderRadius: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: maxWidth,
        }}
        onClick={handleClick}
      >
        {list && list.length > 0 ? list.join(", ") : "List" || "No data"}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List sx={{ maxHeight: "200px", overflow: "auto"}}>
          {list && list.length > 0 ? (
            list.map((item, index) => (
              <ListItem key={index}>
                <Typography
                  variant="body2"
                  sx={{
                    display: "block",
                    width: "100%",
                    padding: "4px 12px",
                    fontSize: "16px",
                    textAlign: "center",
                    borderRadius: 2,
                    ...getStatusStyles(item),
                  }}
                >
                  {item}
                </Typography>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                No data
              </Typography>
            </ListItem>
          )}
        </List>
      </Popover>
    </Box>
  );
};
