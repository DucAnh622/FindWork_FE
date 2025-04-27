import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import { deletePermission } from "../../../services/permissionService";
import { CuPermission } from "./cuPermission";
import { toast } from "react-toastify";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";
import { useSelector, useDispatch } from "react-redux";
import {
  getListPermissionRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/permissionSlice";
import { FormTable } from "../../../components/customize/FormTable";

export const ListPermission = () => {
  const headCells = [
    {
      id: "name",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "method",
      type: "method",
      numeric: false,
      disablePadding: false,
      label: "Method",
    },
    {
      id: "path",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Path",
    },
    {
      id: "description",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
  ];

  const dispatch = useDispatch();
  const list = useSelector((state) => state.permission?.listPermission);
  const page = useSelector((state) => state.permission?.page);
  const limit = useSelector((state) => state.permission?.limit);
  const total = useSelector((state) => state.permission?.total);
  const order = useSelector((state) => state.permission?.order);
  const orderBy = useSelector((state) => state.permission?.orderBy);
  const isLoading = useSelector((state) => state.permission?.isLoading);
  const [selected, setSelected] = useState([]);
  const [permission, setPermission] = useState({});
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [type, setType] = useState("Create");
  const [deleteType, setDeleteType] = useState("Single");

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    getList();
    setType("Create");
    setDeleteType("Single");
    setPermission({});
    setSelected([]);
  };

  const handleModal = (type, item) => {
    switch (type) {
      case "edit":
        setOpen(true);
        setType("Update");
        setPermission(item);
        break;
      case "delete":
        setOpenDelete(true);
        setPermission(item && item);
        setDeleteType(item ? "Single" : "Multiple");
        break;
      default:
        setOpen(true);
        break;
    }
  };

  const handleDelete = async () => {
    let res = await deletePermission(
      deleteType === "Single" ? [permission.id] : selected
    );
    if (res && res.statusCode === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    handleClose();
  };

  const getListPermission = async () => {
    dispatch(
      await getListPermissionRedux({
        page: page + 1,
        limit: limit,
        order: orderBy,
        sort: order,
      })
    );
  };

  return (
    <>
      <FormTable
        title="permissions"
        handleModal={handleModal}
        list={list}
        headCells={headCells}
        getList={getListPermission}
        isLoading={isLoading}
        limit={limit}
        page={page}
        total={total}
        order={order}
        orderBy={orderBy}
        changeOrder={changeOrder}
        changePage={changePage}
        changeSort={changeSort}
        changeRowPerPage={changeRowPerPage}
        setSelected={setSelected}
        selected={selected}
      />
      <CuPermission
        open={open}
        type={type}
        permission={permission}
        handleClose={() => handleClose()}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleClose}
        handleDelete={() => handleDelete()}
      />
    </>
  );
};
