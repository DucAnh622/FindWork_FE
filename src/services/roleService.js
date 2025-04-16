import axiosInstance from "./axiosInstance";

export const createRole = (data) => {
  return axiosInstance.post("/roles/", data);
};

export const getListRoleAll = () => {
  return axiosInstance.get("/roles/all");
};

export const assignedRole = (data) => {
  return axiosInstance.put("/roles/assigned", data);
};

export const removeAssignedRole = (data) => {
  return axiosInstance.put(`/roles/remove/assigned`, data);
};

export const getListPermissionByRole = (page, limit, roleId, order, sort) => {
  return axiosInstance.get(
    `/roles/assigned?page=${page}&limit=${limit}&id=${roleId}&order=${order}&sort=${sort}`
  );
};

export const updateRole = (data) => {
  return axiosInstance.put(`/roles/${data.id}`, data);
};

export const getListRole = (page, limit, order, sort) => {
  return axiosInstance.get(
    `/roles?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
  );
};

export const getListAllRole = () => {
  return axiosInstance.get("/roles/all");
};

export const deleteRole = (ids) => {
  return axiosInstance.delete("/roles", {
    data: { ids: ids },
  });
};

export const getRoleById = (id) => {
  return axiosInstance.get(`/roles/${id}`);
};
