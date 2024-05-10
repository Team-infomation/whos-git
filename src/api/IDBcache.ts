// TYPE
type ResultType = {
  repoName: string;
  setTime: Date;
};
const idb = window.indexedDB;

// CACHE SAVE KEYWORD
export const addKeywordToIndexedDB = (getKeyword: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("whos_git", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("keyword", "readwrite");
      const keywordDB = transaction.objectStore("keyword");

      const keyword = keywordDB.put({ keyword: getKeyword });
      keyword.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e);
      };

      keyword.onerror = (e) => {
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
// CACHE SAVE MEMBER INFO
export const addResultMemberDataToIndexedDB = (
  resultData: object,
  readmeData: string,
  setTime: Date,
  login: string
) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("whos_git", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("member", "readwrite");
      const memberResultDB = transaction.objectStore("member");

      const setMemberData = memberResultDB.put({
        memberResult: resultData,
        readmeData: readmeData,
        setTime: setTime,
        memberId: login,
      });

      setMemberData.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e);
        console.log("member", e);
      };

      setMemberData.onerror = (e) => {
        reject(e);
        console.log(e);
      };
      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
// CACHE GET MEMBER INFO
// export const getResultMemberDataToIndexedDB = (login: string) => {
//   return new Promise((resolve, reject) => {
//     const dbOpen = idb.open("whos_git", 1);

//     dbOpen.onsuccess = () => {
//       const db = dbOpen.result;
//       const transaction = db.transaction("member", "readwrite");
//       const memberDB = transaction.objectStore("member");
//       const member = memberDB.getAll();

//       member.onsuccess = (e: any | object) => {
//         const result = e.target.result;
//         const currentTime: any | Date = new Date();

//         const filteredByLogin = result.filter(
//           (item: any) => item.memberId === login
//         );
//         const filteredByTime = filteredByLogin.filter((item: any) => {
//           console.log(currentTime, item.setTime);
//           const timeDiff = Math.abs(currentTime - item.setTime);
//           const oneHourInMs = 60 * 60 * 1000;
//           return timeDiff <= oneHourInMs;
//         });

//         resolve(filteredByTime);
//         console.log("check", filteredByTime);
//       };

//       member.onerror = (e) => {
//         console.log(e);
//         reject(e);
//       };

//       transaction.oncomplete = () => {
//         db.close();
//       };
//     };
//   });
// };
export const getResultMemberDataToIndexedDB = (login: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("whos_git", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("member", "readwrite");
      const memberDB = transaction.objectStore("member");

      const members = memberDB.getAll();

      members.onsuccess = (e: any | object) => {
        const result = e.target.result;
        const currentTime: any | Date = new Date();

        const filteredByLoginAndTime = result.filter(
          (item: any) =>
            item.memberId === login &&
            Math.abs(currentTime - item.setTime) <= 60 * 60 * 1000
        );

        resolve(filteredByLoginAndTime);
        console.log("check", filteredByLoginAndTime);
      };

      members.onerror = (e) => {
        console.log(e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
// CACHE SAVE SEARCH RESULT
export const addResultDataToIndexedDB = (resultData: object) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("whos_git", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("searchResult", "readwrite");
      const resultDB = transaction.objectStore("searchResult");

      const setResult = resultDB.put({ data: resultData });

      setResult.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e);
        console.log("searchResult", e);
      };

      setResult.onerror = (e) => {
        reject(e);
      };
      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
// CACHE SAVE REPOSITORY REMADME RESULT
export const addRepositoryReadmeDataToIndexedDB = (
  resultReadme: string,
  repoName: string,
  loginId: string
) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("whos_git", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("repoReadme", "readwrite");
      const resultRepoReadmeDB = transaction.objectStore("repoReadme");

      const setResult = resultRepoReadmeDB.put({
        data: resultReadme,
        repoName: repoName,
        loginId: loginId,
        setTime: new Date(),
      });

      setResult.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e);
        console.log("repoReadme", e);
      };

      setResult.onerror = (e) => {
        reject(e);
      };
      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
// CACHE GET REPOSITORY README
export const getRepositoryReadmeDataToIndexedDB = (
  loginId: string,
  repoName: string
) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("whos_git", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("repoReadme", "readonly");
      const readmeDB = transaction.objectStore("repoReadme");
      const repoReadme = readmeDB.getAll();

      repoReadme.onsuccess = (e: any | object) => {
        const result = e.target.result;
        const currentTime: any | Date = new Date();

        const filterData = result.filter((item: ResultType) => {
          if (!item.repoName) {
            return false;
          }

          const itemDate: any | Date = new Date(item.setTime);
          const differenceInDays = Math.abs(
            (currentTime - itemDate) / (1000 * 60 * 60 * 24)
          );

          return differenceInDays <= 1 && item.repoName === repoName;
        });
        resolve(filterData);
      };

      repoReadme.onerror = (e) => {
        console.log(e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
// CACHE SAVE REPOSITORY FILE LIST
export const addRepositoryFileListDataToIndexedDB = (
  loginId: string,
  repoName: string,
  repoResult: object
) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("whos_git", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("repository", "readwrite");
      const repositoryDB = transaction.objectStore("repository");
      const repository = repositoryDB.put({
        loginId: loginId,
        repositoryList: [
          {
            repoName: repoName,
            data: repoResult,
            setTime: new Date(),
          },
        ],
      });

      repository.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e);
        console.log("repository", e);
      };

      repository.onerror = (e) => {
        reject(e);
        console.log("error", e);
      };
      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
