import { openDB } from "idb";

export const indexedDBStart = () => {
  const indexedDB = window.indexedDB;
  const dbName = "whos_git";
  const request = indexedDB.open(dbName, 1);
  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;
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
  };
};