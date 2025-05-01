import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import { formatSort } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";
import {
  getListJobRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/jobSlice";
import { deleteJob } from "../../../services/jobService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormTable } from "../../../components/customize/FormTable";
export const ListJob = () => {
  const headCells = [
    {
      id: "name",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "step",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Step",
    },
    {
      id: "level",
      type: "level",
      numeric: false,
      disablePadding: false,
      label: "Level",
    },
    {
      id: "experience",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Experience",
    },
    {
      id: "education",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Education",
    },
    {
      id: "company",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Company",
    },
    {
      id: "workDay",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Work day",
    },
    {
      id: "workTime",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Work time",
    },
    {
      id: "salary",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Salary $",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector((state) => state.job?.listJob);
  const page = useSelector((state) => state.job?.page);
  const limit = useSelector((state) => state.job?.limit);
  const total = useSelector((state) => state.job?.total);
  const order = useSelector((state) => state.job?.order);
  const orderBy = useSelector((state) => state.job?.orderBy);
  const isLoading = useSelector((state) => state.job?.isLoading);
  const [selected, setSelected] = useState([]);
  const [deleteType, setDeleteType] = useState("Single");
  const [openDelete, setOpenDelete] = useState(false);
  const [job, setJob] = useState({});

  const handleModal = (type, item) => {
    switch (type) {
      case "edit":
        navigate(`/dashboard/company/update/${item.id}`);
        break;
      case "delete":
        setOpenDelete(true);
        setJob(item && item);
        setDeleteType(item ? "Single" : "Multiple");
        break;
      default:
        navigate("/dashboard/company/create");
        break;
    }
  };

  const handleClose = () => {
    setOpenDelete(false);
    setDeleteType("Single");
    setJob({});
    setSelected([]);
    getListJob();
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

  const getListJob = async () => {
    await dispatch(
      getListJobRedux({
        page: page + 1,
        limit: limit,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  return (
    <>
      <FormTable
        title="jobs"
        handleModal={handleModal}
        list={list}
        headCells={headCells}
        getList={getListJob}
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
        open={openDelete}
        handleClose={handleClose}
        handleDelete={() => handleDelete()}
      />
    </>
  );
};
