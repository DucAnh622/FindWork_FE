import axiosInstance from "./axiosInstance";

export const createResume = async (data) => {
  return axiosInstance.post("/resumes/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getListResume = (page, limit, order, sort) => {
  return axiosInstance.get(
    `/resumes?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
  );
};

export const getListResumePersonal = (page, limit, order, sort) => {
  return axiosInstance.get(
    `/resumes/personal?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
  );
};

export const getListResumeJob = (page, limit, order, sort, jobId) => {
  return axiosInstance.get(
    `/resumes?page=${page}&limit=${limit}&id=${jobId}&order=${order}&sort=${sort}`
  );
};

export const getListResumeStatus = (page, limit, order, sort, status) => {
  return axiosInstance.get(
    `/resumes?page=${page}&limit=${limit}&status=${status}&order=${order}&sort=${sort}`
  );
};

export const deleteResume = (ids) => {
  return axiosInstance.delete("/resumes", {
    data: { ids: ids },
  });
};
