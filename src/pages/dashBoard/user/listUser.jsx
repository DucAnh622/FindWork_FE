import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import { deleteMultiple } from "../../../services/userService";
import { formatSort } from "../../../utils/utils";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getListUserRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/adminSlice";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";
import { FormTable } from "../../../components/customize/FormTable";

export const ListUser = () => {
  const headCells = [
    {
      id: "username",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Username",
    },
    {
      id: "fullname",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Fullname",
    },
    {
      id: "roles",
      type: "roles",
      numeric: false,
      disablePadding: false,
      label: "Role",
      sortable: false,
    },
    {
      id: "phone",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "address",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Address",
    },
    {
      id: "status",
      type: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  const dispatch = useDispatch();
  const list = useSelector((state) => state.admin?.listUser);
  const page = useSelector((state) => state.admin?.page);
  const limit = useSelector((state) => state.admin?.limit);
  const total = useSelector((state) => state.admin?.total);
  const order = useSelector((state) => state.admin?.order);
  const orderBy = useSelector((state) => state.admin?.orderBy);
  const isLoading = useSelector((state) => state.admin?.isLoading);
  const [selected, setSelected] = useState([]);
  const [deleteType, setDeleteType] = useState("Single");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleModal = (type, item) => {
    switch (type) {
      case "delete":
        setOpen(true);
        setUser(item && item);
        setDeleteType(item ? "Single" : "Multiple");
        break;
      default:
        break;
    }
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

  const getListUser = async () => {
    dispatch(
      await getListUserRedux({
        page: page + 1,
        limit: limit,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
    getListUser();
    setSelected([]);
    setDeleteType("Single");
  };

  return (
    <>
      <FormTable
        title="users"
        handleModal={handleModal}
        list={list}
        headCells={headCells}
        getList={getListUser}
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
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleDelete={() => handleDelete()}
      />
    </>
  );
};
