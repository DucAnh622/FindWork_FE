import axiosInstance from "../services/axiosInstance";

export const createJob = (data) => {
  return axiosInstance.post("/jobs/", data);
};

export const updateJob = (data) => {
  return axiosInstance.put(`/jobs/${data.id}`, data);
};

export const getJobByID = (id) => {
  return axiosInstance.get(`/jobs/${id}`);
};

export const getListJob = (page, limit, order, sort) => {
  return axiosInstance.get(
    `/jobs?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
  );
};

export const searchListJob = (
  page,
  limit,
  order,
  sort,
  keyword,
  addresses = [],
  levels = [],
  steps = []
) => {
  const params = {
    page,
    limit,
    order,
    sort,
    keyword: keyword || "",
  };

  if (addresses.length > 0) {
    params.address = addresses.join(",");
  }

  if (levels.length > 0) {
    params.level = levels.join(",");
  }

  if (steps.length > 0) {
    params.step = steps.join(",");
  }

  return axiosInstance.get("/jobs/search", { params });
};

export const getListJobByCompany = (page, limit, order, sort, companyId) => {
  return axiosInstance.get(
    `/jobs/company?page=${page}&limit=${limit}&companyId=${companyId}&order=${order}&sort=${sort}`
  );
};

export const deleteJob = (ids) => {
  return axiosInstance.delete("/jobs", {
    data: { ids: ids },
  });
};
