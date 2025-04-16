import axiosInstance from "./axiosInstance";
import { uploadFile } from "./uploadService";

export const createResume = async (data) => {
  let res = await uploadFile(data.url);
  if (res && res.statusCode === 201) {
    data.url = res.data?.url;
  }
  return axiosInstance.post("/resumes/", data);
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
