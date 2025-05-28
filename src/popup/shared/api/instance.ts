import axios, { AxiosInstance } from "axios";

const baseURL = "http://localhost:4200/api";
if (!baseURL) {
  throw new Error("SERVER_URL is not working");
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else if (config.data) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export { axiosInstance };
