import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getListResumeRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/resumeSlice";
import { PDFModal } from "../../../components/dashBoard/Modal/pdfModal";
import { FormTable } from "../../../components/customize/FormTable";

export const ListResume = () => {
  const headCells = [
    {
      id: "fullname",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Fullname",
    },
    {
      id: "email",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "nameCV",
      type: "text",
      numeric: false,
      disablePadding: false,
      label: "Name CV",
    },
    {
      id: "createdAt",
      type: "date",
      numeric: false,
      disablePadding: false,
      label: "Created Day",
    },
    {
      id: "updatedAt",
      type: "date",
      numeric: false,
      disablePadding: false,
      label: "Updated Day",
    },
  ];

  const dispatch = useDispatch();
  const list = useSelector((state) => state.resume?.listResume);
  const page = useSelector((state) => state.resume?.page);
  const limit = useSelector((state) => state.resume?.limit);
  const total = useSelector((state) => state.resume?.total);
  const order = useSelector((state) => state.resume?.order);
  const orderBy = useSelector((state) => state.resume?.orderBy);
  const isLoading = useSelector((state) => state.resume?.isLoading);
  const [selected, setSelected] = useState([]);
  const [resume, setResume] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setResume({});
    getListResume();
  };

  const handleModal = (type, item) => {
    switch (type) {
      case "view":
        setOpen(true);
        setResume(item);
        break;
    }
  };

  const getListResume = async () => {
    dispatch(
      await getListResumeRedux({
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
        title="resumes"
        handleModal={handleModal}
        list={list}
        headCells={headCells}
        getList={getListResume}
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
        addDisable={true}
        updateDisable={true}
        deleteDisable={true}
        viewDisable={false}
      />
      <PDFModal open={open} resume={resume} handleClose={handleClose} />
    </>
  );
};
