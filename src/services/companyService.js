import axiosInstance from "./axiosInstance";

export const createCompany = (data) => {
  return axiosInstance.post("/companies", data);
};

export const getListCompany = (page, limit, order, sort) => {
  return axiosInstance.get(
    `/companies?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
  );
};

export const getListAllCompany = () => {
  return axiosInstance.get("/companies/all");
};

export const deleteCompany = (ids) => {
  return axiosInstance.delete("/companies", {
    data: { ids: ids },
  });
};

export const getCompanyById = (id) => {
  return axiosInstance.get(`/companies/${id}`);
};

export const updateCompany = (data) => {
  return axiosInstance.put(`/companies/${data.id}`, data);
};
