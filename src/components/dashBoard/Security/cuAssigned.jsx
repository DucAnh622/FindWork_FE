import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import {
  assignedRole,
  removeAssignedRole,
} from "../../../services/roleService";
import { getMethodStyles } from "../../../utils/utils";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IOSSwitch } from "../../customize/switchButton";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  getListPermissionByRoleRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/adminSlice";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { EmptyData } from "../../../components/shared/emptyData";

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
    id: "method",
    numeric: false,
    disablePadding: false,
    label: "Method",
  },
  {
    id: "path",
    numeric: false,
    disablePadding: false,
    label: "Path",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "option",
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
          List assigned
        </Typography>
      )}
      {numSelected > 0 && (
        <>
          <Tooltip title="Assigned">
            <Button
              variant="contained"
              size="small"
              onClick={props.handleAssigned}
              color="primary"
            >
              <AddCircleIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Remove" sx={{ ml: 1 }} color="error">
            <Button
              variant="contained"
              size="small"
              onClick={props.handleRemoveAssigned}
            >
              <RemoveCircleIcon />
            </Button>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const CuAsssigned = ({ id }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.admin?.listPermissionByRole);
  const page = useSelector((state) => state.admin?.page);
  const limit = useSelector((state) => state.admin?.limit);
  const total = useSelector((state) => state.admin?.total);
  const totalPage = useSelector((state) => state.admin?.totalPage);
  const order = useSelector((state) => state.admin?.order);
  const orderBy = useSelector((state) => state.admin?.orderBy);
  const isLoading = useSelector((state) => state.admin?.isLoading);
  const [selected, setSelected] = useState([]);

  const handleAssigned = async () => {
    let res = await assignedRole({
      id: id,
      permissions: selected,
    });
    if (res && res.statusCode === 200) {
      toast.success(res.message);
      getList(id);
      setSelected([]);
    } else {
      toast.error(res.message);
      getList(id);
      setSelected([]);
    }
  };

  const handleRemoveAssigned = async () => {
    let res = await removeAssignedRole({
      id: +id,
      permissions: selected,
    });
    if (res && res.statusCode === 200) {
      toast.success(res.message);
      getList(id);
      setSelected([]);
    } else {
      toast.error(res.message);
      getList(id);
      setSelected([]);
    }
  };

  const getList = async (id) => {
    dispatch(
      await getListPermissionByRoleRedux({
        page: page + 1,
        limit: limit,
        roleId: id,
        order: orderBy,
        sort: order,
      })
    );
  };

  useEffect(() => {
    getList(id);
  }, [id, page, limit, order, orderBy]);

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
              handleAssigned={handleAssigned}
              handleRemoveAssigned={handleRemoveAssigned}
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
                          admin="checkbox"
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
                          <TableCell align="left" title={row.name}>
                            <TextClamp>{row.name}</TextClamp>
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              sx={{
                                display: "inline-block",
                                padding: "4px 12px",
                                fontSize: "16px",
                                borderRadius: 2,
                                ...getMethodStyles(row.method),
                              }}
                            >
                              {row.method}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <TextClamp>{row.path}</TextClamp>
                          </TableCell>
                          <TableCell align="left" title={row.description}>
                            <TextClamp>{row.description}</TextClamp>
                          </TableCell>
                          <TableCell align="left">
                            <FormControlLabel
                              control={
                                <IOSSwitch sx={{ m: 1 }} checked={row.check} />
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                        <EmptyData />
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
          </Paper>
        )}
      </Box>
    </div>
  );
};
