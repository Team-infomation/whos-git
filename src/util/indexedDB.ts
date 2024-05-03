import { openDB } from "idb";

export const indexedDBStart = () => {
  const indexedDB = window.indexedDB;
  const dbName = "whos_git";
  const request = indexedDB.open(dbName, 1);

  const deleteOldData = () => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const yesterday = Date.now() - oneDay;

    // Open the database for read/write access
    const dbPromise = request.result;
    dbPromise.then((db) => {
      const transaction = db.transaction(["keyword", "searchResult", "..."]); // Include all stores containing data to check

      transaction.onerror = (event) => {
        console.error("Error deleting old data:", event.target.error);
      };

      // Loop through each object store
      for (const storeName of transaction.objectStoreNames) {
        const store = transaction.objectStore(storeName);
        const index = store.index("timestamp"); // Assuming you have an index on "timestamp" property

        index.openCursor(yesterday, null).onsuccess = (event) => {
          const cursor = event.target.result;
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

  // Set interval to check for old data every hour (adjust as needed)
  const checkInterval = setInterval(deleteOldData, 60 * 60 * 1000);

  request.onupgradeneeded = (event) => {
    // ... rest of the code for creating object stores ...
  };

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
