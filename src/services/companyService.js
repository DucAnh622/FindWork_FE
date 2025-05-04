import axiosInstance from "./axiosInstance";

export const createCompany = (data) => {
  return axiosInstance.post("/companies", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getListCompany = (page, limit, order, sort) => {
  return axiosInstance.get(
    `/companies?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
  );
};

export const searchListCompany = (
  page,
  limit,
  order,
  sort,
  keyword,
  specialityId,
  address = []
) => {
  const params = {
    page,
    limit,
    keyword: keyword || "",
    order,
    sort,
  };

  if (typeof specialityId === "number" && !isNaN(specialityId)) {
    params.specialityId = specialityId;
  }

  if (Array.isArray(address) && address.length > 0) {
    params.address = address.join(",");
  }

  console.log("Search params:", params);
  return axiosInstance.get("/companies/search", { params });
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

export const updateCompany = (data, id) => {
  return axiosInstance.put(`/companies/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
