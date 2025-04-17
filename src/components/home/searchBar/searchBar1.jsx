import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { levels, method, locations } from "../../../utils/constant.js";
import { formatListLabel } from "../../../utils/utils.js";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export const SearchBar1 = ({ data, setData, handleSearch, placeholder }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (field) => (event) => {
    setData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleReset = () => {
    setData({
      keyword: "",
      level: [],
      address: [],
      step: [],
    });
  };

  return (
    <Box
      sx={{
        width: "calc(100% - 32px)",
        p: 2,
        borderRadius: 1,
        m: "16px auto 0",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "flex-start",
        overflow: "hidden",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      }}
    >
      <TextField
        placeholder={placeholder}
        value={data.keyword}
        onChange={(e) =>
          setData((prev) => ({ ...prev, keyword: e.target.value }))
        }
        fullWidth
        sx={{
          flex: 2,
          minWidth: isMobile ? "100%" : "200px",
        }}
        InputProps={{
          sx: {
            height: 40,
            pl: 1.5,
            pr: 1.5,
            "& input": {
              py: "8.5px",
            },
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Bộ lọc */}
      {[
        {
          id: "location-label",
          state: data.address,
          placeholder: "All location",
          field: "address",
          options: locations,
        },
        {
          id: "levels-label",
          state: data.level,
          placeholder: "All level",
          field: "level",
          options: levels,
        },
        {
          id: "method-label",
          state: data.step,
          placeholder: "All step",
          field: "step",
          options: method,
        },
      ].map(({ id, placeholder, state, field, options }, idx) => (
        <FormControl
          key={idx}
          sx={{
            minWidth: isMobile ? "100%" : "180px",
            flex: 1,
          }}
        >
          <Select
            labelId={id}
            multiple
            value={state}
            onChange={handleChange(field)}
            displayEmpty
            input={
              <OutlinedInput
                notched={false}
                sx={{
                  height: 40,
                  pl: 1,
                  pr: 1,
                }}
              />
            }
            renderValue={(selected) =>
              selected.length === 0 ? placeholder : selected.join(", ")
            }
            sx={{
              "& .MuiSelect-select": {
                pt: "8.5px",
                pb: "8.5px",
              },
            }}
          >
            {formatListLabel(options).map((option, index) => (
              <MenuItem key={index} value={option.name}>
                <Checkbox checked={state.includes(option.name)} />
                <Typography>{option.name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}

      <Button
        variant="outlined"
        onClick={handleReset}
        sx={{
          height: 40,
          textTransform: "none",
          px: 3,
          borderColor: "#6f42c1",
          color: "#6f42c1",
          "&:hover": {
            backgroundColor: "#6f42c1",
            color: "#ffffff",
          },
          lineHeight: 40,
          whiteSpace: "nowrap",
          minWidth: isMobile ? "100%" : "auto",
        }}
      >
        <FilterAltIcon />
      </Button>

      <Button
        onClick={() => handleSearch()}
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          height: 40,
          backgroundColor: "#6f42c1",
          color: "#fff",
          textTransform: "none",
          px: 3,
          lineHeight: 40,
          whiteSpace: "nowrap",
          "&:hover": {
            backgroundColor: "#5a379e",
          },
          minWidth: isMobile ? "100%" : "auto",
        }}
      >
        Tìm kiếm
      </Button>
    </Box>
  );
};
