import "../../assets/styles/dashBoard.scss";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, FormControlLabel } from "@mui/material";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { IOSSwitch } from "../../components/customize/switchButton";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  getStatusStyles,
  getLevelStyles,
  getMethodStyles,
  getRolesStyles,
  formatDateData,
} from "../../utils/utils";
import { useDispatch } from "react-redux";
import Zoom from "react-medium-image-zoom";
import { CircularWithValueLabel } from "../../components/customize/loading";
import { TextClamp } from "../customize/TextClamp";

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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    headCells,
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
            inputProps={{ "aria-label": "select all rows" }}
          />
        </TableCell>
        <TableCell padding="checkbox">Rank</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable === false ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                )}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
        <TableCell padding="checkbox">Option</TableCell>
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
  const {
    numSelected,
    title,
    assign,
    handleAssigned,
    handleRemoveAssigned,
    addDisable,
  } = props;
  return (
    <>
      {assign === false ? (
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
              List {title}
            </Typography>
          )}
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton
                onClick={() => props.handleModal("delete")}
                sx={{ color: "#e53935" }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              {addDisable === false && (
                <Tooltip title="Create">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => props.handleModal("create")}
                    color="warning"
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Tooltip>
              )}
            </>
          )}
        </Toolbar>
      ) : (
        <>
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
                    onClick={handleAssigned}
                    color="primary"
                  >
                    <AddCircleIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Remove" sx={{ ml: 1 }} color="error">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleRemoveAssigned}
                  >
                    <RemoveCircleIcon />
                  </Button>
                </Tooltip>
              </>
            )}
          </Toolbar>
        </>
      )}
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const FormTable = (props) => {
  const {
    id,
    assign = false,
    title,
    getList,
    headCells,
    list,
    isLoading,
    limit,
    page,
    total,
    order,
    orderBy,
    changeOrder,
    changePage,
    changeSort,
    changeRowPerPage,
    handleModal,
    selected,
    setSelected,
    handleAssigned,
    handleRemoveAssigned,
    addDisable = false,
    updateDisable = false,
    deleteDisable = false,
    viewDisable = true,
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getList();
    } else {
      getList();
    }
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
              title={title}
              assign={assign}
              addDisable={addDisable}
              handleModal={handleModal}
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
                  headCells={headCells}
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
                          key={index}
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
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell padding="checkbox">
                            {page * limit + index + 1}
                          </TableCell>
                          {headCells.map((cell) => {
                            const value = row[cell.id];
                            switch (cell.type) {
                              case "image":
                                return (
                                  <TableCell key={cell.id} align="left">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Zoom>
                                        <img
                                          src={value}
                                          alt={row.name}
                                          style={{
                                            height: "50px",
                                            maxWidth: "70px",
                                            width: "100%",
                                            margin: "auto",
                                            borderRadius: "8px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </Zoom>
                                    </Box>
                                  </TableCell>
                                );
                              case "status":
                                return (
                                  <TableCell key={cell.id} align="left">
                                    <Typography
                                      sx={{
                                        display: "inline-block",
                                        padding: "4px 12px",
                                        fontSize: "16px",
                                        minWidth: "80px",
                                        textAlign: "center",
                                        borderRadius: 2,
                                        ...getStatusStyles(value),
                                      }}
                                    >
                                      {value}
                                    </Typography>
                                  </TableCell>
                                );
                              case "method":
                                return (
                                  <TableCell key={cell.id} align="left">
                                    <Typography
                                      sx={{
                                        display: "inline-block",
                                        padding: "4px 12px",
                                        fontSize: "16px",
                                        minWidth: "80px",
                                        textAlign: "center",
                                        borderRadius: 2,
                                        ...getMethodStyles(value),
                                      }}
                                    >
                                      {value}
                                    </Typography>
                                  </TableCell>
                                );
                              case "role":
                                return (
                                  <TableCell key={cell.id} align="left">
                                    <Typography
                                      sx={{
                                        display: "inline-block",
                                        padding: "4px 12px",
                                        fontSize: "16px",
                                        minWidth: "80px",
                                        textAlign: "center",
                                        borderRadius: 2,
                                        ...getRolesStyles(value),
                                      }}
                                    >
                                      {value}
                                    </Typography>
                                  </TableCell>
                                );
                              case "roles":
                                return (
                                  <TableCell key={cell.id} align="left">
                                    <Typography
                                      sx={{
                                        display: "inline-block",
                                        padding: "4px 12px",
                                        fontSize: "16px",
                                        minWidth: "80px",
                                        textAlign: "center",
                                        borderRadius: 2,
                                        ...getRolesStyles(value[0].name),
                                      }}
                                    >
                                      {value[0].name}
                                    </Typography>
                                  </TableCell>
                                );
                              case "date":
                                return (
                                  <TableCell key={cell.id} align="left">
                                    <Typography title={value}>
                                      {formatDateData(value)}
                                    </Typography>
                                  </TableCell>
                                );
                              case "level":
                                return (
                                  <TableCell key={cell.id} align="left">
                                    <TextClamp
                                      title={value}
                                      sx={{
                                        display: "inline-block",
                                        padding: "4px 12px",
                                        fontSize: "16px",
                                        minWidth: "80px",
                                        textAlign: "center",
                                        borderRadius: 2,
                                        ...getLevelStyles(value),
                                      }}
                                    >
                                      {value}
                                    </TextClamp>
                                  </TableCell>
                                );
                              case "check":
                                return (
                                  <TableCell key={cell.id} align="left">
                                    <FormControlLabel
                                      control={
                                        <IOSSwitch
                                          sx={{ m: 1 }}
                                          checked={row.check}
                                        />
                                      }
                                    />
                                  </TableCell>
                                );
                              default:
                                return (
                                  <TableCell
                                    key={cell.id}
                                    align={cell.numeric ? "right" : "left"}
                                    sx={{ minWidth: 150 }}
                                  >
                                    <TextClamp title={value}>{value}</TextClamp>
                                  </TableCell>
                                );
                            }
                          })}
                          <TableCell align="left">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              {viewDisable === false && (
                                <IconButton
                                  onClick={() => handleModal("view", row)}
                                  aria-label="view"
                                  size="medium"
                                  color="warning"
                                >
                                  <VisibilityIcon fontSize="inherit" />
                                </IconButton>
                              )}
                              {updateDisable === false && (
                                <IconButton
                                  onClick={() => handleModal("edit", row)}
                                  aria-label="delete"
                                  size="medium"
                                  color="primary"
                                >
                                  <BorderColorIcon fontSize="inherit" />
                                </IconButton>
                              )}
                              {deleteDisable === false && (
                                <IconButton
                                  onClick={() => handleModal("delete", row)}
                                  aria-label="delete"
                                  size="medium"
                                  color="error"
                                >
                                  <DeleteOutlineIcon fontSize="inherit" />
                                </IconButton>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={headCells.length + 3}
                        sx={{ textAlign: "center" }}
                      >
                        No data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={total}
              rowsPerPage={limit}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Box>
    </div>
  );
};
