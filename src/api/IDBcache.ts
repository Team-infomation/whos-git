const idb = window.indexedDB;
// ||
// window.mozIndexedDB ||
// window.webkitIndexedDB ||
// window.msIndexedDB ||
// window.shimIndexedDB;

// CACHE SAVE KEYWORD
export const addKeywordToIndexedDB = (getKeyword: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("keyword");
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
        console.log("keyword", e);
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
// CACHE SAVE SEARCH RESULT
export const addResultDataToIndexedDB = (resultData: object) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("searchResult");
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
