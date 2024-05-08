import { easeBack } from "d3";
import { openDB } from "idb";

export const indexedDBStart = () => {
  const indexedDB = window.indexedDB;
  const dbName = "whos_git";
  const request = indexedDB.open(dbName, 1);

  const deleteOldData = () => {
    const oneDay = 24 * 60 * 60 * 1000;
    const yesterday = Date.now() - oneDay;

    const dbPromise = request.result;
    dbPromise.then((db: any) => {
      const transaction = db.transaction(["keyword", "searchResult", "..."]);

      transaction.onerror = (e: any) => {
        console.error("Error deleting old data:", e.target.error);
      };

      for (const storeName of transaction.objectStoreNames) {
        const store = transaction.objectStore(storeName);
        const index = store.index("timestamp");

        index.openCursor(yesterday, null).onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            store.delete(cursor.key);
            cursor.continue();
          } else {
            console.log("No old data found in", storeName);
          }
        };
      }
    });
  };

  const checkInterval = setInterval(deleteOldData, 60 * 60 * 1000);

  request.onupgradeneeded = (e) => {
    console.log("check data", e);
    console.log("checkInterval", checkInterval);
  };

  request.onupgradeneeded = (e: any) => {
    const db = e.target.result;
    const keywordStore = db.createObjectStore("keyword", {
      keyPath: "id",
      autoIncrement: true,
    });
    const searchResultStore = db.createObjectStore("searchResult", {
      keyPath: "id",
      autoIncrement: true,
    });
    const memberStore = db.createObjectStore("member", {
      keyPath: "id",
      autoIncrement: true,
    });
    const repositoryStore = db.createObjectStore("repository", {
      keyPath: "id",
      autoIncrement: true,
    });
    const repositoryReadmeStroe = db.createObjectStore("repoReadme", {
      keyPath: "id",
      autoIncrement: true,
    });
    const commitStore = db.createObjectStore("commit", {
      keyPath: "id",
      autoIncrement: true,
    });

    console.log("Object stores created successfully");
  };
  request.onsuccess = (e: any) => {
    console.log("Database opened successfully", e);
  };
  request.onerror = (e: any) => {
    console.error("Error opening database:", e.target.error);
    window.location.href = "/";
  };
};
