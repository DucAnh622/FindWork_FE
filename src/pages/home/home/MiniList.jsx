import { useEffect, useState } from "react";
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
import { TextClamp } from "../../../components/customize/TextClamp";
import { toast } from "react-toastify";
import { getListSpecialityRedux } from "../../../redux/slices/specialitySlice";

export const MiniList = () => {
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
          limit: 5,
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

  useEffect(() => {
    getList();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPage - 1) setPage(page + 1);
  };

  if (!list || list.length === 0) return null;

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
      <List
        disablePadding
        sx={{
          m: "0 auto",
          width: "100%",
          flex: 1,
          minHeight: 240,
        }}
      >
        {list.map((item, index) => (
          <Box key={index}>
            <ListItem
              button={true}
              onClick={() => navigate(`/speciality/${item.id}`)}
              sx={{
                fontWeight: 500,
                fontSize: 8,
                pr: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  color: "#9d42ff",
                },
                "&:hover svg": { color: "#9d42ff" },
              }}
            >
              <ListItemText
                primary={<TextClamp lines={1}>{item.name}</TextClamp>}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: 8,
                }}
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
        <Typography fontSize={12}>
          <span style={{ color: "#9d42ff" }}>{page + 1}</span> / {totalPage}
        </Typography>
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
                border: "1px solid #dee0e2",
                color: "#dee0e2",
                cursor: "not-allowed",
              },
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
            }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
