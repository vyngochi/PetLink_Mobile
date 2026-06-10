import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_BASE_URL,
  timeout: 10000,
});

export default api;
