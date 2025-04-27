import React, { useCallback } from "react";
import { Grid, Button, Box, useMediaQuery } from "@mui/material";
import { locations } from "../../../utils/constant.js";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { getListSpecialityRedux } from "../../../redux/slices/specialitySlice.js";
import { useDispatch } from "react-redux";
import { FormMultipleSelect } from "../../customize/FormMultipleSelect.jsx";
import { FormSelectInfinity } from "../../customize/FormSelectInfinity.jsx";
import { FormInput } from "../../customize/FormInput.jsx";

export const SearchBar2 = ({ data, setData, handleSearch, placeholder }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const getListSpeciality = useCallback(
    async (page, limit) => {
      return await dispatch(
        getListSpecialityRedux({
          page: page || 1,
          limit: limit || 10,
          order: "name",
          sort: "asc",
        })
      );
    },
    [dispatch]
  );

  const handleReset = () => {
    setData({
      keyword: "",
      address: [],
      specialityId: "",
    });
  };

  return (
    <Box
      sx={{
        width: "calc(100% - 32px)",
        p: 2,
        borderRadius: 1,
        m: "16px auto 0",
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
        <Grid item xs={12} md={3}>
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
        <Grid item xs={12} md={3}>
          <FormSelectInfinity
            data={data}
            required={false}
            setData={setData}
            name="specialityId"
            label="Speciality"
            getList={getListSpeciality}
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
              flex: isMobile ? "unset" : 6,
              height: "100%",
              fontSize: 18,
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
