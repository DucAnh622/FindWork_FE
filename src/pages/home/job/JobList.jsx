import { useState, useEffect } from "react";
import "../../../assets/styles/dashBoard.scss";
import SearchIcon from "@mui/icons-material/Search";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { Box, Chip, Grid, IconButton, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getListJobRedux, changePage } from "../../../redux/slices/jobSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../../assets/styles/JobList.scss";
import { CardTemplate3 } from "../../../components/home/cardTemplate/cardTemplate3";
import { SearchBar1 } from "../../../components/home/searchBar/searchBar1.jsx";
import { formatSort } from "../../../utils/utils.js";
import { EmptyData } from "../../../components/shared/emptyData.jsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TextClamp } from "../../../components/customize/TextClamp.jsx";
import { FormFilterMultiple } from "../../../components/customize/FormFilterMultiple";
import { locations, levels, method } from "../../../utils/constant";

export const JobList = () => {
  const dataDefault = {
    keyword: "",
    level: [],
    address: [],
    step: [],
  };
  const [data, setData] = useState(dataDefault);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.job?.listJob);
  const page = useSelector((state) => state.job?.page);
  const totalPage = useSelector((state) => state.job?.totalPage);
  const order = useSelector((state) => state.job?.order);
  const orderBy = useSelector((state) => state.job?.orderBy);
  const isLoading = useSelector((state) => state.job?.isLoading);

  const getList = async () => {
    dispatch(
      await getListJobRedux({
        page: page + 1,
        limit: 10,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  const handleSearch = async () => {
    dispatch(
      await getListJobRedux({
        page: page + 1,
        limit: 10,
        order: orderBy,
        sort: formatSort(order),
        data: data,
      })
    );
  };

  useEffect(() => {
    getList();
  }, [page, order, orderBy]);

  return (
    <div className="ContentPage">
      <div className="container">
        <div className="header-list">
          <div className="header-text-top">
            <h2>JOB LIST</h2>
            <p>Find your dream job from the best job opportunities on Itwork</p>
            <Chip
              sx={{
                backgroundColor: "#fff",
                color: "#9d42ff",
                mr: 1,
              }}
              label={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleIcon />
                  Good salary
                </div>
              }
            />
            <Chip
              sx={{
                backgroundColor: "#fff",
                color: "#9d42ff",
                mr: 1,
              }}
              label={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleIcon />
                  Professional environment
                </div>
              }
            />
            <Chip
              sx={{
                backgroundColor: "#fff",
                color: "#9d42ff",
                mr: 1,
              }}
              label={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleIcon />
                  Attractive benefits
                </div>
              }
            />
          </div>
          <div className="header-text-bottom">
            <Box className="search-bar">
              <div className="search-form">
                <TextField
                  size="small"
                  placeholder="Search job"
                  sx={{
                    width: "100%",
                    mr: 1,
                    flex: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1f2937",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9d42ff",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9d42ff",
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    p: 0,
                  }}
                >
                  <FormFilterMultiple
                    name="level"
                    placeholder="Level"
                    list={levels}
                    data={data}
                    setData={setData}
                  />
                  <FormFilterMultiple
                    name="step"
                    placeholder="Step"
                    list={method}
                    data={data}
                    setData={setData}
                    ml={1}
                  />
                  <FormFilterMultiple
                    name="address"
                    placeholder="Location"
                    list={locations}
                    data={data}
                    ml={1}
                    setData={setData}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    height: "40px",
                    border: "1px solid #9d42ff",
                    ml: 1,
                    borderColor: "transparent",
                    transition: "all 0.3s ease",
                    backgroundColor: "#9d42ff",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#9d42ff",
                      border: "1px solid #9d42ff",
                    },
                  }}
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </div>
            </Box>
          </div>
        </div>
        <div className="body-list">
          <Grid container>
            <Grid item xs={12} md={8} className="body-list-left">
              {list.map((item, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    className="body-list-left-item"
                    key={index}
                  >
                    <div className="body-list-left-item-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="body-list-left-item-text">
                      <div className="body-list-left-item-text-top">
                        <div className="body-list-left-item-text-top-item">
                          <div className="body-list-left-item-text-top-item-info">
                            <TextClamp
                              title={item.name}
                              sx={{
                                color: "#9d42ff",
                                fontWeight: 600,
                                fontSize: 20,
                              }}
                            >
                              {item.name}
                            </TextClamp>
                            <TextClamp title={item.address}>
                              {item.address}
                            </TextClamp>
                          </div>
                          <div className="body-list-left-item-text-top-item-info">
                            <p style={{ fontSize: 18 }}>
                              {item.salary === "Agreement"
                                ? "Agreement"
                                : `${item.salary} $`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="body-list-left-item-text-bottom">
                        <div className="body-list-left-item-text-top-item">
                          <div className="body-list-left-item-text-top-item-info">
                            <Chip
                              sx={{
                                borderRadius: 1,
                                mr: 1,
                                backgroundColor: "#9d42ff",
                                color: "white",
                              }}
                              label={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {item.company}
                                </div>
                              }
                            />
                            <Chip
                              sx={{ borderRadius: 1, mr: 1 }}
                              label={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: 700,
                                      color: "#9d42ff",
                                      marginRight: 4,
                                    }}
                                  >
                                    25
                                  </span>{" "}
                                  days to apply
                                </div>
                              }
                            />
                          </div>
                          <div className="body-list-left-item-text-top-item-info">
                            <button className="btn-apply">Apply</button>
                            <IconButton
                              size="small"
                              sx={{
                                border: "1px solid #9d42ff",
                                backgroundColor: "white",
                                color: "#9d42ff",
                                "&:hover": {
                                  backgroundColor: "#9d42ff",
                                  color: "white",
                                },
                                "&:disabled": {
                                  borderColor: "gray",
                                  color: "gray",
                                  cursor: "not-allowed",
                                },
                                transition: "background-color 0.3s, color 0.3s",
                              }}
                            >
                              <FavoriteBorderIcon fontSize="small" />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })}
              {totalPage > 1 && (
                <Stack spacing={2} alignItems="center">
                  <Pagination
                    count={totalPage}
                    page={page + 1}
                    onChange={(event, value) => dispatch(changePage(value - 1))}
                    variant="outlined"
                    shape="rounded"
                    color="#9d42ff"
                  />
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} md={4} className="body-list-right">
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
