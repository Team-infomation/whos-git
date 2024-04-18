// import axios from "../util/instance";
import axios from "axios";

const url = "https://api.github.com/";

export const memberSearchGET = (keyword: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}search/users?q=${keyword}`, {})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
