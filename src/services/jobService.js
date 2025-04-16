import axiosInstance from "../services/axiosInstance";

export const createJob = (data) => {
    return axiosInstance.post('/jobs/',data)
}

export const updateJob = (data) => {
    return axiosInstance.put(`/jobs/${data.id}`,data)
}

export const getJobByID = (id) => {
    return axiosInstance.get(`/jobs/${id}`);
}

export const getListJob = (page,limit,order,sort) => {
    return axiosInstance.get(`/jobs?page=${page}&limit=${limit}&order=${order}&sort=${sort}`);
}

export const deleteJob = (ids) => {
  return axiosInstance.delete("/jobs", {
    data: { ids: ids },
  });
};