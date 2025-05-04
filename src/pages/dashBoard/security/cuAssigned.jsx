import "../../../assets/styles/dashBoard.scss";
import * as React from "react";
import { useState } from "react";
import {
  assignedRole,
  removeAssignedRole,
} from "../../../services/roleService";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getListPermissionByRoleRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/adminSlice";
import { FormTable } from "../../../components/customize/FormTable";

export const CuAsssigned = ({ id }) => {
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
    {
      id: "check",
      type: "check",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  const dispatch = useDispatch();
  const list = useSelector((state) => state.admin?.listPermissionByRole);
  const page = useSelector((state) => state.admin?.page);
  const limit = useSelector((state) => state.admin?.limit);
  const total = useSelector((state) => state.admin?.total);
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

  const getListAssign = async () => {
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

  return (
    <>
      <FormTable
        assign={true}
        title="assigned"
        list={list}
        id={id}
        headCells={headCells}
        getList={getListAssign}
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
        handleAssigned={handleAssigned}
        handleRemoveAssigned={handleRemoveAssigned}
        setSelected={setSelected}
        selected={selected}
      />
    </>
  );
};
