import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatSort } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  getListCompanyRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/companySlice";
import { DeleteModal } from "../../../components/dashBoard/Modal/deleteModal";
import { deleteCompany } from "../../../services/companyService";
import { FormTable } from "../../../components/customize/FormTable";
import { toast } from "react-toastify";

export const ListCompany = () => {
  const headCells = [
    {
      id: "name",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "image",
      type: "image",
      numeric: false,
      disablePadding: false,
      label: "Image",
    },
    {
      id: "speciality",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Speciality",
    },
    {
      id: "address",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Address",
    },
    {
      id: "phone",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Phone",
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
  const navigate = useNavigate();
  const list = useSelector((state) => state.company?.listCompany);
  const page = useSelector((state) => state.company?.page);
  const limit = useSelector((state) => state.company?.limit);
  const total = useSelector((state) => state.company?.total);
  const order = useSelector((state) => state.company?.order);
  const orderBy = useSelector((state) => state.company?.orderBy);
  const isLoading = useSelector((state) => state.company?.isLoading);
  const [selected, setSelected] = useState([]);
  const [deleteType, setDeleteType] = useState("Single");
  const [openDelete, setOpenDelete] = useState(false);
  const [company, setCompany] = useState({});

  const handleModal = (type, item) => {
    switch (type) {
      case "edit":
        navigate(`/dashboard/company/update/${item.id}`);
        break;
      case "delete":
        setOpenDelete(true);
        setCompany(item && item);
        setDeleteType(item ? "Single" : "Multiple");
        break;
      default:
        navigate("/dashboard/company/create");
        break;
    }
  };

  const handleDelete = async () => {
    let res = await deleteCompany(
      deleteType === "Single" ? [company.id] : selected
    );
    if (res && res.statusCode === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpenDelete(false);
    setDeleteType("Single");
    setCompany({});
    setSelected([]);
    getListCompany();
  };

  const getListCompany = async () => {
    dispatch(
      await getListCompanyRedux({
        page: page,
        limit: limit,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  return (
    <>
      <FormTable
        title="companies"
        handleModal={handleModal}
        list={list}
        headCells={headCells}
        getList={getListCompany}
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
