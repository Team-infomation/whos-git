// import axios from "../util/instance";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const url = "https://api.github.com/";
const token = import.meta.env.VITE_APP_GITHUB_TOKEN;
// SEARCH
export const memberSearchGET = (keyword: string, page: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}search/users?q=${keyword}&page=${page}`, {
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
// DETAIL
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
// CUSTOM PROFILE
export const memberRepoReadMeGET = (
  memberLoginId: string,
  repoName: string
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}repos/${memberLoginId}/${repoName}/contents/README.md`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
// REPOSITORY LIST
export const memberRepositoryListGET = (uri: string, page: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${uri}?page=${page}`, {
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
// REPOSITORY DETAIL
export const memberRepositoryInfoGET = (loginId: string, repoName: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}repos/${loginId}/${repoName}/contents`, {
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
// EXPLOER REPOSITORY FILE AND DIRECTORY DETAIL
export const explorerRepositoryListGET = (
  loginId: string,
  repoName: string,
  dirName: string
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}repos/${loginId}/${repoName}/contents/${dirName}`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((response) => {
        resolve(response);
        console.log(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// REPOSITORY COMMIT
export const memberRepositoryCommitGET = (
  loginId: string,
  repoName: string,
  page: number
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}repos/${loginId}/${repoName}/commits?page=${page}`, {
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
// REPOSITORY SELECTDATE COMMIT
export const memberRepositorySelectDateCommitGET = (
  loginId: string,
  repoName: string,
  page: number,
  year: number,
  month: number
) => {
  const startYear = new Date(year, 0, 1);
  const endYear = new Date(year, 11, 31);

  return new Promise((resolve, reject) => {
    axios
      // .get(`${url}repos/${loginId}/${repoName}/commits`, {
      .get(`${url}repos/kkt9102/starbucksreserve/commits`, {
        params: {
          since: startYear.toISOString(),
          until: endYear.toISOString(),
          page: page,
        },
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
