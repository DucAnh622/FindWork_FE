import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TextClamp2, TextClamp } from "../../../components/customize/TextClamp";
import { locations } from "../../../utils/constant";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { getListJobRedux, changePage } from "../../../redux/slices/jobSlice";
import {
  getListSpecialityRedux,
  changePage as changeSpecialityPage,
} from "../../../redux/slices/specialitySlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { formatSort } from "../../../utils/utils";

export const MediumList = () => {
  const navigate = useNavigate();
  const list = useSelector((state) => state.job?.listJob);
  const page = useSelector((state) => state.job?.page);
  const totalPage = useSelector((state) => state.job?.totalPage);
  const order = useSelector((state) => state.job?.order);
  const orderBy = useSelector((state) => state.job?.orderBy);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const getList = async () => {
    await dispatch(
      getListJobRedux({
        page: page + 1,
        limit: 12,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  const handlePrevPage = () => {
    if (page > 0) dispatch(changePage(page - 1));
  };

  const handleNextPage = () => {
    if (page < totalPage - 1) dispatch(changePage(page + 1));
  };

  useEffect(() => {
    getList();
  }, [page]);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <>
      {list && list.length > 0 && (
        <Box className="list-medium">
          <div className="header-list">
            <div className="header-list-item">
              <h2>THE TOP JOB</h2>
            </div>
            <div className="header-list-item">
              <Link style={{ float: "right" }}>Show all</Link>
            </div>
            <div className="header-list-item">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "4px 8px",
                }}
              >
                <p
                  style={{
                    margin: "0 8px",
                    fontSize: "14px",
                    color: "#bbb",
                  }}
                >
                  <FilterListIcon
                    sx={{ verticalAlign: "middle", marginRight: "4px" }}
                  />
                  Filter by:
                </p>
                <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={address}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return <>Locations</>;
                      }
                      return selected;
                    }}
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "4px 24px 4px 8px",
                        fontSize: "14px",
                      },
                      border: "none",
                      outline: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        outline: "none",
                      },
                      "& .MuiList-root .MuiList-padding": {
                        paddingTop: "0 !important",
                        paddingBottom: "0 !important",
                      },
                    }}
                  >
                    <MenuItem>Locations</MenuItem>
                    {locations.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="header-list-item">
              <Box display="flex" gap={1}>
                <IconButton
                  size="small"
                  disabled={page === 0}
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
                  disabled={page === totalPage - 1}
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
          </div>
          <Grid container className="body-list">
            {list.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className="body-list-item"
                  key={index}
                  onClick={() => navigate(`/job/${item.id}`)}
                >
                  <div className="body-list-item-info">
                    {item?.image ? (
                      <img src={item?.image} alt="logo" />
                    ) : (
                      <Avatar></Avatar>
                    )}
                    <div className="body-list-item-info-text">
                      <TextClamp2 sx={{ fontWeight: 600 }}>
                        {item.name}
                      </TextClamp2>
                      <TextClamp>{item.company}</TextClamp>
                    </div>
                  </div>
                  <div className="body-list-item-option">
                    <div className="body-list-item-chip">
                      <Chip label={`${item.salary} $`} sx={{ mr: 1 }} />
                      <Chip label={item.step} />
                    </div>
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
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                    >
                      <FavoriteBorderIcon fontSize="small" />
                    </IconButton>
                  </div>
                </Grid>
              );
            })}
            <Grid item xs={12} sm={12} md={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <IconButton
                  size="small"
                  disabled={page === 0}
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
                <p>
                  <span style={{ color: "#9d42ff" }}>{page + 1}</span> /{" "}
                  {totalPage}
                </p>
                <IconButton
                  size="small"
                  onClick={handleNextPage}
                  disabled={page === totalPage - 1}
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
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export const MediumList2 = () => {
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getList = async () => {
    try {
      const { payload } = await dispatch(
        getListSpecialityRedux({
          page: page + 1,
          limit: 8,
          order: "createdAt",
          sort: "DESC",
        })
      );
      setList(payload.list);
      setTotalPage(payload.totalPages);
    } catch (error) {
      toast.error(error || "Server error");
    }
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPage - 1) setPage(page + 1);
  };

  useEffect(() => {
    getList();
  }, [page]);

  return (
    <>
      {list && list.length > 0 && (
        <Box className="list-medium">
          <div className="header-list">
            <div className="header-list-item">
              <h2>TOP OUTSTANDING CAREERS</h2>
            </div>
            <div className="header-list-item">
              <Box display="flex" gap={1}>
                <IconButton
                  size="small"
                  disabled={page === 0}
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
                  disabled={page === totalPage - 1}
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
          </div>
          <Grid container className="body-list-card">
            {list.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  className="body-list-item-card"
                  key={index}
                  onClick={() => navigate(`/job/${item.id}`)}
                >
                  <img
                    src="https://images.icon-icons.com/3041/PNG/512/twitch_logo_icon_189242.png"
                    alt=""
                  />
                  <TextClamp>
                    <span style={{ color: "#1f2937", fontWeight: 600 }}>
                      {item.name}
                    </span>
                  </TextClamp>
                  <p>
                    {Math.floor(Math.random() * (1000 - 100 + 1)) + 100} jobs
                  </p>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
};
