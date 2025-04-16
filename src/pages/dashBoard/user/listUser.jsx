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
import { Avatar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import {
  assignedUserRoles,
  deleteMultiple,
} from "../../../services/userService";
import { getListRoleAll } from "../../../services/roleService";
import { MultipleSelect } from "../../../components/customize/selectCheckBoxTable";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import {
  formatSort,
  formatListSelectCheckBox,
  formatListData,
  getStatusStyles,
} from "../../../utils/utils";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../../components/dashBoard/Modal/confirmModal";
import { useSelector, useDispatch } from "react-redux";
import {
  getListUserRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
  changeListUser,
} from "../../../redux/slices/adminSlice";
import { getAllRoleRedux } from "../../../redux/slices/roleSlice";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";

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

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "fullname",
    numeric: false,
    disablePadding: false,
    label: "Fullname",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
    sortable: false,
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "Option",
    numeric: false,
    disablePadding: false,
    label: "Option",
    sortable: false,
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
          List users
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
            onClick={() => navigate("/dashboard/user/create")}
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

export const ListUser = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.admin?.listUser);
  const listRole = useSelector((state) => state.role?.arrRole);
  const totalPage = useSelector((state) => state.admin?.totalPage);
  const page = useSelector((state) => state.admin?.page);
  const limit = useSelector((state) => state.admin?.limit);
  const total = useSelector((state) => state.admin?.total);
  const order = useSelector((state) => state.admin?.order);
  const orderBy = useSelector((state) => state.admin?.orderBy);
  const isLoading = useSelector((state) => state.admin?.isLoading);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState({});
  const [resetError, setResetError] = useState(false);
  const [deleteType, setDeleteType] = useState("Single");
  const [openDelete, setOpenDelete] = useState(false);
  const [user, setUser] = useState({});

  const handleModalDelete = (item) => {
    setOpenDelete(true);
    setUser(item && item);
    setDeleteType(item ? "Single" : "Multiple");
  };

  const handleDelete = async () => {
    let res = await deleteMultiple(
      deleteType === "Single" ? [user.id] : selected
    );
    if (res && res.statusCode === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    handleClose();
  };

  const getList = async () => {
    dispatch(
      await getListUserRedux({
        page: page + 1,
        limit: limit,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  const getListRole = async () => {
    dispatch(getAllRoleRedux());
  };

  useEffect(() => {
    getListRole();
  }, []);

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

  const handleChangeSelectBox = (index, event, row, value) => {
    const updatedList = list.map((item, idx) =>
      idx === index ? { ...item, roles: value } : item
    );
    dispatch(changeListUser(updatedList));
  };

  const handleConfirm = (row) => {
    setOpen(true);
    setSelectedRole(row);
  };

  const handleSubmit = async () => {
    let res = await assignedUserRoles({
      id: selectedRole.id,
      roleIds: formatListData(selectedRole.roles),
    });
    if (res && res.statusCode === 200) {
      toast.success(res.message);
      handleClose();
    } else {
      toast.error(res.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRole({});
    setResetError(true);
    getList();
    getListRole();
    setOpenDelete(false);
    setSelected([]);
    setDeleteType("Single");
    setTimeout(() => setResetError(false), 0);
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
                          <TableCell align="left" sx={{ width: "300px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "200px",
                              }}
                            >
                              <Avatar
                                sx={{ width: 40, height: 40, marginRight: 2 }}
                                alt={row.username}
                                src={row.image}
                              />
                              <Box>
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "15px" }}
                                  title={row.username}
                                >
                                  {row.username}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontSize: "13px" }}
                                >
                                  {row.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="left" title={row.fullname}>
                            {row.fullname}
                          </TableCell>
                          <TableCell align="left">
                            <MultipleSelect
                              options={listRole}
                              label="Select roles"
                              value={row.roles || []}
                              onChange={(event, value) =>
                                handleChangeSelectBox(index, event, row, value)
                              }
                              width={200}
                              handleBlurSelect={() => handleConfirm(row)}
                              resetError={resetError}
                            />
                          </TableCell>
                          <TableCell align="left">{row.phone}</TableCell>
                          <TableCell align="left">{row.address}</TableCell>
                          <TableCell align="left">
                            <Typography
                              sx={{
                                display: "inline-block",
                                padding: "4px 12px",
                                fontSize: "16px",
                                minWidth: "80px",
                                textAlign: "center",
                                borderRadius: 2,
                                ...getStatusStyles(row.status),
                              }}
                            >
                              {row.status}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Link to={`/dashboard/user/update/${row.id}`}>
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
            <ConfirmModal
              open={open}
              handleClose={handleClose}
              handleConfirm={handleSubmit}
            />
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
