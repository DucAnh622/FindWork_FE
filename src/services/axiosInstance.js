import axios from "axios";
import { refreshToken } from "../services/userService";
import { loginSuccess } from "../redux/slices/userSlice";
import store from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:9999/api/v1",
  timeout: 10000,
});

instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  function (config) {
    const accessToken = store.getState().user?.login?.access_token;
    if (accessToken !== null || accessToken !== "") {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },

  async function (error) {
    const originalRequest = error.config;
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "The server is not responding. Please try again later.",
        code: "TIMEOUT",
      });
    }
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await refreshToken();
        if (response && response.statusCode === 200) {
          store.dispatch(loginSuccess(response.data));
          originalRequest.headers["Authorization"] =
            "Bearer " + response.data.access_token;
        }
        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    if (error.response) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

export default instance;
