import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { TextClamp } from "../../../components/customize/TextClamp";

export const MiniList = ({
  isloading,
  list = [],
  page,
  getListRedux,
  changePage,
  changeRowPerPage,
  totalPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getList = async () => {
    await dispatch(changeRowPerPage(5));
    await dispatch(
      getListRedux({
        page: page + 1,
        limit: 5,
        order: "createdAt",
        sort: "desc",
      })
    );
  };

  useEffect(() => {
    getList();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 0) dispatch(changePage(page - 1));
  };

  const handleNextPage = () => {
    if (page < totalPage - 1) dispatch(changePage(page + 1));
  };

  const handleNavigate = (id) => {
    navigate(`/speciality/${id}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        minHeight: 300,
        borderRadius: 2,
        p: 1,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isloading ? (
        <CircularWithValueLabel />
      ) : (
        <>
          <List
            disablePadding
            sx={{
              m: "0 auto",
              width: "100%",
              flex: 1,
            }}
          >
            {list.map((item, index) => (
              <Box key={index}>
                <ListItem
                  button="true"
                  onClick={() => handleNavigate(item.id)}
                  sx={{
                    fontWeight: 500,
                    fontSize: 8,
                    pr: 1,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5", color: "#9d42ff" },
                    "&:hover svg": { color: "#9d42ff" },
                  }}
                >
                  <ListItemText
                    primary={<TextClamp lines={1}>{item.name}</TextClamp>}
                    primaryTypographyProps={{ fontWeight: 500, fontSize: 8 }}
                  />
                  <ChevronRightIcon fontSize="small" color="action" />
                </ListItem>
              </Box>
            ))}
          </List>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              py: 1,
              fontSize: 12,
              color: "gray",
              marginTop: "auto",
            }}
          >
            <Typography fontSize={12}>{`${page + 1}/${totalPage}`}</Typography>
            <Box display="flex" gap={1}>
              <IconButton
                size="small"
                onClick={handlePrevPage}
                disabled={page === 0}
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
        </>
      )}
    </Paper>
  );
};
