import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatSort, getLevelStyles } from "../../../utils/utils";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";
import {
  getListJobRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/jobSlice";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { deleteJob } from "../../../services/jobService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1,
  whiteSpace: "nowrap",
};

const TextClamp = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Hiển thị tối đa 2 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
`;

const TextClamp1 = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Hiển thị tối đa 2 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
`;

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "step",
    numeric: false,
    disablePadding: false,
    label: "Step",
  },
  {
    id: "level",
    numeric: false,
    disablePadding: false,
    label: "Level",
  },
  {
    id: "experience",
    numeric: false,
    disablePadding: false,
    label: "Experience",
  },
  {
    id: "education",
    numeric: false,
    disablePadding: false,
    label: "Education",
  },
  {
    id: "company",
    numeric: false,
    disablePadding: false,
    label: "Company",
  },
  {
    id: "workDay",
    numeric: false,
    disablePadding: false,
    label: "Work day",
  },
  {
    id: "workTime",
    numeric: false,
    disablePadding: false,
    label: "Work time",
  },
  {
    id: "salary",
    numeric: false,
    disablePadding: false,
    label: "Salary $",
  },
  {
    id: "Option",
    numeric: false,
    disablePadding: false,
    label: "Option",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable !== false ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  const navigate = useNavigate();
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List jobs
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => props.handleModalDelete()}
            sx={{ color: "#e53935" }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Create">
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate("/dashboard/job/create")}
            color="warning"
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const ListJob = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.job?.listJob);
  const page = useSelector((state) => state.job?.page);
  const limit = useSelector((state) => state.job?.limit);
  const total = useSelector((state) => state.job?.total);
  const totalPage = useSelector((state) => state.job?.totalPage);
  const order = useSelector((state) => state.job?.order);
  const orderBy = useSelector((state) => state.job?.orderBy);
  const isLoading = useSelector((state) => state.job?.isLoading);
  const [selected, setSelected] = useState([]);
  const [deleteType, setDeleteType] = useState("Single");
  const [openDelete, setOpenDelete] = useState(false);
  const [job, setJob] = useState({});

  const handleModalDelete = (item) => {
    setOpenDelete(true);
    setJob(item && item);
    setDeleteType(item ? "Single" : "Multiple");
  };

  const handleClose = () => {
    setOpenDelete(false);
    setDeleteType("Single");
    setJob({});
    setSelected([]);
    getList();
  };

  const handleDelete = async () => {
    let res = await deleteJob(deleteType === "Single" ? [job.id] : selected);
    if (res && res.statusCode === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    handleClose();
  };

  const getList = async () => {
    await dispatch(
      getListJobRedux({
        page: page + 1,
        limit: limit,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  useEffect(() => {
    getList();
  }, [page, limit, order, orderBy]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch(changeSort(isAsc ? "desc" : "asc"));
    dispatch(changeOrder(property));
    dispatch(changePage(0));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = list.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(changePage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(changeRowPerPage(parseInt(event.target.value, 10)));
    dispatch(changePage(0));
  };

  return (
    <div className="dashBoard">
      <Box sx={{ width: "100%" }}>
        {isLoading === true ? (
          <CircularWithValueLabel />
        ) : (
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              handleModalDelete={() => handleModalDelete()}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={list.length}
                />
                <TableBody>
                  {list.length > 0 ? (
                    list.map((row, index) => {
                      const isItemSelected = selected.includes(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell
                            padding="checkbox"
                            onClick={(event) => handleClick(event, row.id)}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {page * limit + index + 1}
                          </TableCell>
                          <TableCell
                            align="left"
                            title={row.name}
                            sx={{ width: 150 }}
                          >
                            <TextClamp>{row.name}</TextClamp>
                          </TableCell>
                          <TableCell align="left" title={row.step}>
                            <TextClamp>{row.step}</TextClamp>
                          </TableCell>
                          <TableCell align="left" title={row.level}>
                            <TextClamp1
                              sx={{
                                display: "inline-block",
                                padding: "4px 12px",
                                fontSize: "16px",
                                minWidth: "80px",
                                textAlign: "center",
                                borderRadius: 2,
                                ...getLevelStyles(row.level),
                              }}
                            >
                              {row.level}
                            </TextClamp1>
                          </TableCell>
                          <TableCell
                            align="left"
                            title={row.experience}
                            sx={{ width: 200 }}
                          >
                            <TextClamp>{row.experience}</TextClamp>
                          </TableCell>
                          <TableCell align="left" title={row.education}>
                            <TextClamp>{row.education}</TextClamp>
                          </TableCell>
                          <TableCell align="left" title={row.company}>
                            <TextClamp>{row.company}</TextClamp>
                          </TableCell>
                          <TableCell
                            align="left"
                            title={row.workDay}
                            sx={{ width: 300 }}
                          >
                            <TextClamp>{row.workDay}</TextClamp>
                          </TableCell>
                          <TableCell
                            align="left"
                            title={row.workTime}
                            sx={{ width: 150 }}
                          >
                            <TextClamp>{row.workTime}</TextClamp>
                          </TableCell>
                          <TableCell
                            align="left"
                            title={row.salary}
                            sx={{ width: 150 }}
                          >
                            <TextClamp>{row.salary}</TextClamp>
                          </TableCell>
                          <TableCell align="left">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Link to={`/dashboard/job/update/${row.id}`}>
                                <IconButton
                                  aria-label="edit"
                                  size="medium"
                                  color="primary"
                                  sx={{ mr: 1 }}
                                >
                                  <BorderColorIcon fontSize="inherit" />
                                </IconButton>
                              </Link>
                              <IconButton
                                onClick={() => handleModalDelete(row)}
                                aria-label="delete"
                                size="medium"
                                color="error"
                              >
                                <DeleteOutlineIcon fontSize="inherit" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                        No data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPage > 1 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
            <DeleteModal
              open={openDelete}
              handleClose={handleClose}
              handleDelete={() => handleDelete()}
            />
          </Paper>
        )}
      </Box>
    </div>
  );
};
