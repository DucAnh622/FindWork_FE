import axiosInstance from "./axiosInstance";

export const createSkill = (data) => {
  return axiosInstance.post("/skills/", data);
};

export const updateSkill = (data) => {
  return axiosInstance.put(`/skills/${data.id}`, data);
};

export const getListSkill = (page, limit, order, sort) => {
  return axiosInstance.get(
    `/skills?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
  );
};

export const getListAllSkill = () => {
  return axiosInstance.get("/skills/all");
};

export const deleteSkill = (ids) => {
  return axiosInstance.delete("/skills", {
    data: { ids: ids },
  });
};

export const getSkillById = (id) => {
  return axiosInstance.get(`/skills/${id}`);
};
