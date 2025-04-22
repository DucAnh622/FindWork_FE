import React from "react";
import { Grid, Button, Box, useMediaQuery } from "@mui/material";
import { levels, method, locations } from "../../../utils/constant.js";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FormMultipleSelect } from "../../customize/FormMultipleSelect.jsx";
import { FormInput } from "../../customize/FormInput.jsx";

export const SearchBar1 = ({ data, setData, handleSearch, placeholder }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormInput
            label={placeholder}
            placeholder={`${placeholder}...`}
            maxLength={100}
            type="text"
            name="keyword"
            data={data}
            setData={setData}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormMultipleSelect
            customize={true}
            data={data}
            setData={setData}
            name="address"
            label="Location"
            required={false}
            options={locations}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormMultipleSelect
            customize={true}
            data={data}
            setData={setData}
            name="level"
            label="Level"
            required={false}
            options={levels}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormMultipleSelect
            customize={true}
            data={data}
            setData={setData}
            name="step"
            label="Step"
            required={false}
            options={method}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            alignItems: "stretch",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleReset}
            fullWidth
            sx={{
              textTransform: "none",
              px: 3,
              flex: isMobile ? "unset" : 1,
              height: "100%",
              borderColor: "#6f42c1",
              color: "#6f42c1",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#6f42c1",
                color: "#ffffff",
              },
            }}
          >
            <FilterAltIcon />
          </Button>

          <Button
            onClick={handleSearch}
            variant="contained"
            startIcon={<SearchIcon />}
            fullWidth
            sx={{
              textTransform: "none",
              px: 3,
              fontSize: 18,
              flex: isMobile ? "unset" : 6,
              height: "100%",
              backgroundColor: "#6f42c1",
              color: "#fff",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#5a379e",
              },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
