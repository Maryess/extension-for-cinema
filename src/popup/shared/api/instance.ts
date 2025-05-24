import axios from "axios";

export const SERVER_URL = "http://localhost:4200/api";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
