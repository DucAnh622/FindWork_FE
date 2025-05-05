import axiosInstance from "./axiosInstance";

export const createSpeciality = (data) => {
  return axiosInstance.post("/specialities/", data);
};

export const updateSpeciality = (data) => {
  return axiosInstance.put(`/specialities/${data.id}`, data);
};

export const getListSpeciality = (page, limit, order, sort, keyword) => {
  return axiosInstance.get(
    `/specialities?page=${page}&limit=${limit}&keyword=${keyword}&order=${order}&sort=${sort}`
  );
};

export const getListAllSpeciality = () => {
  return axiosInstance.get("/specialities/all");
};

export const deleteSpeciality = (ids) => {
  return axiosInstance.delete("/specialities", {
    data: { ids: ids },
  });
};

export const getSpecialityById = (id) => {
  return axiosInstance.get(`/specialities/${id}`);
};
