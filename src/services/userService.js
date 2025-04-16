import axiosInstance from "./axiosInstance";

export const login = (data) => {
    return axiosInstance.post("/auth/login", {username: data.email, password: data.password});
};

export const register = (data) => {
    return axiosInstance.post("/auth/register", data);
}

export const logout = () => {
    return axiosInstance.post("/auth/logout");
}

export const refreshToken = () => {
    return axiosInstance.get("/auth/refresh");
}

export const updateUser = (data) => {
    return axiosInstance.put(`/users/${data.id}`, data);
}

export const assignedUserRoles = (data) => {
    return axiosInstance.put("/users/assigned/role", data);
}

export const deleteUser = (id) => {
    return axiosInstance.delete(`/users/${id}`);
}

export const deleteMultiple = (ids) => {
  return axiosInstance.delete("/users", {
    data: { ids: ids },
  });
};

export const getListUser = (page,limit,order,sort) => {
    return axiosInstance.get(`/users?page=${page}&limit=${limit}&order=${order}&sort=${sort}`);
}

export const getUserById = (id) => {
    return axiosInstance.get(`/users/${id}`);
}
