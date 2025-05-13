import { Box, IconButton, Button, Chip, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { TextClamp2, TextClamp } from "../../../components/customize/TextClamp";
import {
  getListCompanyRedux,
  changePage,
} from "../../../redux/slices/companySlice";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import { formatSort } from "../../../utils/utils";

export const LargeList = () => {
  const navigate = useNavigate();
  const list = useSelector((state) => state.company?.listCompany);
  const page = useSelector((state) => state.company?.page);
  const totalPage = useSelector((state) => state.company?.totalPage);
  const order = useSelector((state) => state.company?.order);
  const orderBy = useSelector((state) => state.company?.orderBy);
  const dispatch = useDispatch();

  const handleNavigate = (id) => {
    navigate(`/company/${id}`);
  };

  const getList = async () => {
    await dispatch(
      getListCompanyRedux({
        page: page + 1,
        limit: 9,
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

  return (
    <>
      {list && list.length > 0 && (
        <Box className="list-large">
          <div className="header-list">
            <div className="header-list-banner">
              <div className="header-list-banner-text">
                <h2>Exemplary Major Brands</h2>
                <p>Hundreds of major brands are recruiting on ItWork</p>
              </div>
            </div>
          </div>
          <div className="body-list">
            <div className="body-list-item-first">
              <div className="body-list-item-image">
                {list[0]?.image ? (
                  <img src={list[0]?.image} alt="logo" />
                ) : (
                  <Avatar></Avatar>
                )}
              </div>
              <div className="body-list-item-text">
                <h2 onClick={() => handleNavigate(list[0]?.id)}>
                  <TextClamp sx={{ fontSize: 20 }}>{list[0]?.name}</TextClamp>
                </h2>
                <TextClamp sx={{ color: "#fff", fontSize: 16 }}>
                  {list[0]?.speciality}
                </TextClamp>
                <div className="job-count">
                  <WorkIcon />
                  <span style={{ margin: "0 4px" }}>
                    {list[0]?.jobCount > 10 ? "+10" : list[0]?.jobCount}
                  </span>
                  jobs
                </div>
                <Button
                  size="small"
                  className="body-list-item-button"
                  sx={{
                    backgroundColor: "#9d42ff",
                    color: "white",
                    "&:hover": {
                      opacity: 0.8,
                      color: "white !important",
                      backgroundColor: "#9d42ff !important",
                    },
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  startIcon={<AddIcon />}
                >
                  follow
                </Button>
              </div>
            </div>

            {list.slice(1).map((item, index) => {
              return (
                <div
                  className="body-list-item"
                  key={index}
                  onClick={() => handleNavigate(item.id)}
                >
                  <div className="body-list-item-info">
                    {item?.image ? (
                      <img src={item?.image} alt="logo" />
                    ) : (
                      <Avatar></Avatar>
                    )}
                    <div className="body-list-item-info-text">
                      <TextClamp2 sx={{ color: "#9d42ff", fontWeight: 600 }}>
                        {item.name}
                      </TextClamp2>
                      <TextClamp>{item.speciality}</TextClamp>
                      <TextClamp2 sx={{ fontSize: 12 }}>
                        {item.address}
                      </TextClamp2>
                    </div>
                  </div>
                  <div className="body-list-item-option">
                    <div className="body-list-item-chip">
                      <Chip
                        label={
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <WorkIcon />
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                margin: "0 4px",
                              }}
                            >
                              {item.jobCount > 10 ? "+10" : item.jobCount}
                            </span>
                            jobs
                          </div>
                        }
                      />
                    </div>
                    <Button
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
                      <AddIcon fontSize="small" />
                      Follow
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
            mt={1}
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
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <p>
              {page + 1}/{totalPage}
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
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};
