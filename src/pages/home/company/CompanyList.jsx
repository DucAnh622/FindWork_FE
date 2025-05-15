import { useState, useEffect } from "react";
import "../../../assets/styles/dashBoard.scss";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  TextField,
  Button,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getListCompanyRedux,
  changePage,
  changeOrder,
} from "../../../redux/slices/companySlice.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../../assets/styles/CompanyList.scss";
import { CardTemplate2 } from "../../../components/home/cardTemplate/cardTemplate2";
import { formatSort } from "../../../utils/utils.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { EmptyData } from "../../../components/shared/emptyData.jsx";
import { FormFilterMultiple } from "../../../components/customize/FormFilterMultiple";
import { locations } from "../../../utils/constant";

export const CompanyList = () => {
  const dataDefault = {
    keyword: "",
    specialityId: "",
    address: [],
  };

  const [data, setData] = useState(dataDefault);
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState("createdAt");
  const list = useSelector((state) => state.company?.listCompany);
  const page = useSelector((state) => state.company?.page);
  const totalPage = useSelector((state) => state.company?.totalPage);
  const order = useSelector((state) => state.company?.order);
  const orderBy = useSelector((state) => state.company?.orderBy);

  const getList = async () => {
    dispatch(
      await getListCompanyRedux({
        page: page + 1,
        limit: 20,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  const handleSearch = async () => {
    dispatch(
      await getListCompanyRedux({
        page: page + 1,
        limit: 20,
        order: orderBy,
        sort: formatSort(order),
        data: data,
      })
    );
  };

  const handleChangeRadio = (event) => {
    const value = event.target.value;
    setSelectedSort(value);
    dispatch(changeOrder(value));
  };

  useEffect(() => {
    getList();
  }, [page, order, orderBy, data]);

  return (
    <div className="ListPage Company">
      <div className="container">
        <div className="header-list">
          <div className="header-text-top">
            <h2>COMPANY LIST</h2>
            <p>
              Search for company information and find the best workplace for you
            </p>
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
                  Best company
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
                  type="search"
                  placeholder="Search job"
                  value={data.keyword}
                  onChange={(e) =>
                    setData({ ...data, keyword: e.target.value })
                  }
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
                  onClick={handleSearch}
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
                value="address"
                control={
                  <Radio
                    checked={selectedSort === "address"}
                    onChange={handleChangeRadio}
                  />
                }
                label="Location"
                sx={{
                  "& .MuiRadio-root.Mui-checked": {
                    color: "#9d42ff",
                  },
                }}
              />
            </Box>
          </div>
        </div>
        {typeof list === "object" ? (
          <>
            {list.length > 0 ? (
              <div className="body-content">
                <>
                  <div className="body-list">
                    {list.map((item, index) => {
                      return <CardTemplate2 data={item} key={item.id} />;
                    })}
                  </div>
                  {totalPage > 1 && (
                    <Stack
                      spacing={2}
                      alignItems="center"
                      textAlign="center"
                      pt={2}
                    >
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
              </div>
            ) : (
              <EmptyData />
            )}
          </>
        ) : (
          <CircularWithValueLabel />
        )}
      </div>
    </div>
  );
};
