import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import { deleteSpeciality } from "../../../services/specialityService";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";
import { toast } from "react-toastify";
import { CuSpeciality } from "./cuSpeciality";
import { useSelector, useDispatch } from "react-redux";
import {
  getListSpecialityRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/specialitySlice";
import { FormTable } from "../../../components/customize/FormTable";

export const ListSpeciality = () => {
  const headCells = [
    {
      id: "name",
      type: "text",
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
  const list = useSelector((state) => state.speciality?.listSpeciality);
  const page = useSelector((state) => state.speciality?.page);
  const limit = useSelector((state) => state.speciality?.limit);
  const total = useSelector((state) => state.speciality?.total);
  const order = useSelector((state) => state.speciality?.order);
  const orderBy = useSelector((state) => state.speciality?.orderBy);
  const isLoading = useSelector((state) => state.speciality?.isLoading);
  const [selected, setSelected] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [speciality, setSpeciality] = useState({});
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Create");
  const [deleteType, setDeleteType] = useState("Single");

  const handleModal = (type, item) => {
    switch (type) {
      case "edit":
        setOpen(true);
        setType("Update");
        setSpeciality(item);
        break;
      case "delete":
        setOpenDelete(true);
        setSpeciality(item && item);
        setDeleteType(item ? "Single" : "Multiple");
        break;
      default:
        setOpen(true);
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setType("Create");
    setDeleteType("Single");
    setSpeciality({});
    setSelected([]);
    getListSpeciality();
  };

  const handleDelete = async () => {
    let res = await deleteSpeciality(
      deleteType === "Single" ? [speciality.id] : selected
    );
    if (res && res.statusCode === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    handleClose();
  };

  const getListSpeciality = async () => {
    dispatch(
      await getListSpecialityRedux({
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
        title="specialities"
        handleModal={handleModal}
        list={list}
        headCells={headCells}
        getList={getListSpeciality}
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
      <CuSpeciality
        open={open}
        type={type}
        speciality={speciality}
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
