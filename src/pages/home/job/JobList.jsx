import { useState, useEffect } from "react";
import "../../../assets/styles/dashBoard.scss";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  Grid,
  IconButton,
  TextField,
  Button,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getListJobRedux,
  changePage,
  changeOrder,
} from "../../../redux/slices/jobSlice";
import {
  getListCompanyRedux,
  changePage as changeCompanyPage,
} from "../../../redux/slices/companySlice.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../../assets/styles/JobList.scss";
import { formatSort, countDay } from "../../../utils/utils";
import { EmptyData } from "../../../components/shared/emptyData.jsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  TextClamp,
  TextClamp2,
} from "../../../components/customize/TextClamp.jsx";
import { FormFilterMultiple } from "../../../components/customize/FormFilterMultiple";
import { CircularWithValueLabel } from "../../../components/customize/loading.jsx";
import { locations, levels, method } from "../../../utils/constant";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

export const JobList = () => {
  const dataDefault = {
    keyword: "",
    level: [],
    address: [],
    step: [],
  };
  const navigate = useNavigate();
  const [data, setData] = useState(dataDefault);
  const dispatch = useDispatch();
  const listJob = useSelector((state) => state.job?.listJob);
  const page = useSelector((state) => state.job?.page);
  const totalPage = useSelector((state) => state.job?.totalPage);
  const order = useSelector((state) => state.job?.order);
  const orderBy = useSelector((state) => state.job?.orderBy);
  const [selectedSort, setSelectedSort] = useState("createdAt");
  const listC = useSelector((state) => state.company?.listCompany);
  const pageC = useSelector((state) => state.company?.page);
  const totalPageC = useSelector((state) => state.company?.totalPage);
  const orderC = useSelector((state) => state.company?.order);
  const orderByC = useSelector((state) => state.company?.orderBy);

  const getList = async () => {
    dispatch(
      await getListJobRedux({
        page: page + 1,
        limit: 10,
        order: orderBy,
        sort: formatSort(order),
      })
    );
    dispatch(
      await getListCompanyRedux({
        page: pageC + 1,
        limit: 5,
        order: orderByC,
        sort: formatSort(orderC),
      })
    );
  };

  const handleChangeRadio = (event) => {
    const value = event.target.value;
    setSelectedSort(value); // Cập nhật giá trị được chọn
    dispatch(changeOrder(value)); // Gửi giá trị đã chọn vào Redux
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
  }, [page, pageC, order, orderBy]);

  const handlePrevPage = () => {
    if (pageC > 0) dispatch(changeCompanyPage(pageC - 1));
  };

  const handleNextPage = () => {
    if (pageC < totalPageC - 1) dispatch(changeCompanyPage(pageC + 1));
  };

  return (
    <div className="ListPage">
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
                  <CheckCircleIcon sx={{ mr: 1 }} />
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
                  <CheckCircleIcon sx={{ mr: 1 }} />
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
                  <CheckCircleIcon sx={{ mr: 1 }} />
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
            <Box className="sort-bar">
              <h4>Sort by:</h4>
              <FormControlLabel
                value="createdAt"
                control={
                  <Radio
                    checked={selectedSort === "createdAt"}
                    onChange={handleChangeRadio}
                  />
                }
                label="All"
                sx={{
                  "& .MuiRadio-root.Mui-checked": {
                    color: "#9d42ff",
                  },
                }}
              />
              <FormControlLabel
                value="name"
                control={
                  <Radio
                    checked={selectedSort === "name"}
                    onChange={handleChangeRadio}
                  />
                }
                label="Name"
                sx={{
                  "& .MuiRadio-root.Mui-checked": {
                    color: "#9d42ff",
                  },
                }}
              />
              <FormControlLabel
                value="level"
                control={
                  <Radio
                    checked={selectedSort === "level"}
                    onChange={handleChangeRadio}
                  />
                }
                label="Level"
                sx={{
                  "& .MuiRadio-root.Mui-checked": {
                    color: "#9d42ff",
                  },
                }}
              />
              <FormControlLabel
                value="endDate"
                control={
                  <Radio
                    checked={selectedSort === "endDate"}
                    onChange={handleChangeRadio}
                  />
                }
                label="Date"
                sx={{
                  "& .MuiRadio-root.Mui-checked": {
                    color: "#9d42ff",
                  },
                }}
              />
            </Box>
          </div>
        </div>
        {typeof listJob === "object" ? (
          <div className="body-list">
            <Grid container>
              <Grid item xs={12} md={8} className="body-list-left">
                {typeof listJob === "object" && listJob.length > 0 ? (
                  <>
                    {listJob.map((item, index) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          className="body-list-left-item"
                          key={index}
                          onClick={() => navigate(`/job/${item.id}`)}
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
                                        {countDay(item.endDate) > 0 ? (
                                          <>
                                            <span
                                              style={{
                                                fontWeight: 700,
                                                color: "#9d42ff",
                                                marginRight: 4,
                                              }}
                                            >
                                              {countDay(item.endDate)}
                                            </span>{" "}
                                            days to apply
                                          </>
                                        ) : (
                                          <>Expired</>
                                        )}
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
                                        border: "1px solid #dee0e2",
                                        color: "#dee0e2",
                                        cursor: "not-allowed",
                                      },
                                      transition:
                                        "background-color 0.3s, color 0.3s",
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
                          onChange={(event, value) =>
                            dispatch(changePage(value - 1))
                          }
                          variant="outlined"
                          shape="rounded"
                          sx={{
                            "& .MuiPaginationItem-root": {
                              color: "#1f2937",
                              backgroundColor: "#fff",
                              border: "1px solid #dee0e2",
                              "&:hover": {
                                backgroundColor: "#9d42ff",
                                color: "#fff",
                              },
                              "&.Mui-selected": {
                                borderColor: "#9d42ff",
                                backgroundColor: "#fff",
                                color: "#9d42ff",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#9d42ff",
                                color: "#fff",
                              },
                              "&.Mui-disabled": {
                                border: "1px solid #dee0e2",
                                color: "#dee0e2",
                                pointerEvents: "none",
                              },
                            },
                          }}
                        />
                      </Stack>
                    )}
                  </>
                ) : (
                  <EmptyData />
                )}
              </Grid>
              <Grid item xs={12} md={4} className="body-list-right">
                <div className="body-list-right-header">
                  <h4>Top best company</h4>
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      disabled={pageC === 0}
                      onClick={handlePrevPage}
                      sx={{
                        border: "1px solid #9d42ff",
                        backgroundColor: "white",
                        color: "#9d42ff",
                        "&:hover": {
                          backgroundColor: "#9d42ff",
                          color: "white",
                        },
                        "&:disabled": {
                          border: "1px solid #dee0e2",
                          color: "#dee0e2",
                          cursor: "not-allowed",
                        },
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                    >
                      <ChevronLeftIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleNextPage}
                      disabled={pageC === totalPageC - 1}
                      sx={{
                        border: "1px solid #9d42ff",
                        backgroundColor: "white",
                        color: "#9d42ff",
                        "&:hover": {
                          backgroundColor: "#9d42ff",
                          color: "white",
                        },
                        "&:disabled": {
                          border: "1px solid #dee0e2",
                          color: "#dee0e2",
                          cursor: "not-allowed",
                        },
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                    >
                      <ChevronRightIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </div>
                <div className="body-list-right-body">
                  {listC &&
                    listC.map((item, index) => {
                      return (
                        <div
                          className="body-list-right-body-item"
                          key={index}
                          onClick={() => navigate(`/company/${item.id}`)}
                        >
                          <div className="body-list-item-info">
                            {item?.image ? (
                              <img src={item?.image} alt="logo" />
                            ) : (
                              <Avatar></Avatar>
                            )}
                            <div className="body-list-item-info-text">
                              <TextClamp2
                                title={item.name}
                                sx={{ color: "#9d42ff", fontWeight: 600 }}
                              >
                                {item.name}
                              </TextClamp2>
                              <TextClamp>{item.speciality}</TextClamp>
                              <TextClamp
                                sx={{ fontSize: 12 }}
                                title={item.address}
                              >
                                {item.address}
                              </TextClamp>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Grid>
            </Grid>
          </div>
        ) : (
          <CircularWithValueLabel />
        )}
      </div>
    </div>
  );
};
