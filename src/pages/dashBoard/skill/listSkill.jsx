import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import { deleteSkill } from "../../../services/skillService";
import { toast } from "react-toastify";
import { CuSkill } from "./cuSkill";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";
import { useSelector, useDispatch } from "react-redux";
import {
  getListSkillRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/skillSlice";
import { FormTable } from "../../../components/customize/FormTable";

export const ListSkill = () => {
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
  const list = useSelector((state) => state.skill?.listSkill);
  const page = useSelector((state) => state.skill?.page);
  const limit = useSelector((state) => state.skill?.limit);
  const total = useSelector((state) => state.skill?.total);
  const order = useSelector((state) => state.skill?.order);
  const orderBy = useSelector((state) => state.skill?.orderBy);
  const isLoading = useSelector((state) => state.skill?.isLoading);
  const [selected, setSelected] = useState([]);
  const [skill, setSkill] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Create");
  const [deleteType, setDeleteType] = useState("Single");

  const handleModal = (type, item) => {
    switch (type) {
      case "edit":
        setOpen(true);
        setType("Update");
        setSkill(item);
        break;
      case "delete":
        setOpenDelete(true);
        setSkill(item && item);
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
    setSkill({});
    setSelected([]);
    getListSkill();
  };

  const handleDelete = async () => {
    let res = await deleteSkill(
      deleteType === "Single" ? [skill.id] : selected
    );
    if (res && res.statusCode === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    handleClose();
  };

  const getListSkill = async () => {
    dispatch(
      await getListSkillRedux({
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
        title="skills"
        handleModal={handleModal}
        list={list}
        headCells={headCells}
        getList={getListSkill}
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
      <CuSkill
        open={open}
        type={type}
        skill={skill}
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
