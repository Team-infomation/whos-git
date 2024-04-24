import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com/",
  withCredentials: true,
  timeout: 10000,
});

export default instance;
