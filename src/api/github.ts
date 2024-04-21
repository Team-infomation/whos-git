// import axios from "../util/instance";
import axios from "axios";

const url = "https://api.github.com/";
const token = import.meta.env.VITE_APP_GITHUB_TOKEN;

export const memberSearchGET = (keyword: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}search/users?q=${keyword}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const memberInfoGET = (memberLoginId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}users/${memberLoginId}`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
