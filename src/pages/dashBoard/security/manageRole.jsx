import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import { deleteRole } from "../../../services/roleService";
import { CuRole } from "./cuRole";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getListRoleRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/roleSlice";
import { FormTable } from "../../../components/customize/FormTable";

export const ListRole = () => {
  const headCells = [
    {
      id: "name",
      type: "role",
      numeric: false,
      disablePadding: false,
      label: "Name",
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
  const list = useSelector((state) => state.role?.listRole);
  const page = useSelector((state) => state.role?.page);
  const limit = useSelector((state) => state.role?.limit);
  const total = useSelector((state) => state.role?.total);
  const order = useSelector((state) => state.role?.order);
  const orderBy = useSelector((state) => state.role?.orderBy);
  const isLoading = useSelector((state) => state.role?.isLoading);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [role, setRole] = useState({});
  const [type, setType] = useState("Create");
  const [deleteType, setDeleteType] = useState("Single");

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    getList();
    setType("Create");
    setSelected([]);
    setDeleteType("Single");
    setRole({});
  };

  const handleModal = (type, item) => {
    switch (type) {
      case "edit":
        setOpen(true);
        setType("Update");
        setRole(item);
        break;
      case "delete":
        setOpenDelete(true);
        setRole(item && item);
        setDeleteType(item ? "Single" : "Multiple");
        break;
      default:
        setOpen(true);
        break;
    }
  };

  const handleDelete = async () => {
    let res = await deleteRole(deleteType === "Single" ? [role.id] : selected);
    if (res && res.statusCode === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    handleClose();
  };

  const getListRole = async () => {
    dispatch(
      await getListRoleRedux({
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
        title="roles"
        handleModal={handleModal}
        list={list}
        headCells={headCells}
        getList={getListRole}
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
      <CuRole
        open={open}
        type={type}
        role={role}
        handleClose={() => handleClose()}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleClose}
        handleDetele={handleDelete}
      />
    </>
  );
};
