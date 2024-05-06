// import axios from "../util/instance";
import axios from "axios";

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
        resolve(response);
      })
      .catch((error) => {
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
export const exloerRepositoryListGET = (
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
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// REPOSITORY COMMIT
export const memberRepositoryCommitGET = (
  loginId: string,
  repoName: string
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}repos/${loginId}/${repoName}/commits`, {
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
