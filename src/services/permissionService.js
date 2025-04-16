import axiosInstance from "./axiosInstance";

export const createPermission = (data) => {
  return axiosInstance.post("/permissions/", data);
};

export const updatePermission = (data) => {
  return axiosInstance.put(`/permissions/${data.id}`, data);
};

export const getListPermission = (page, limit, order, sort) => {
  return axiosInstance.get(
    `/permissions?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
  );
};

export const getListAllPermission = () => {
  return axiosInstance.get("/permissions/all");
};

export const deletePermission = (ids) => {
  return axiosInstance.delete("/permissions", {
    data: { ids: ids },
  });
};

export const getPermissionById = (id) => {
  return axiosInstance.get(`/permissions/${id}`);
};
