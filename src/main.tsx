import ReactDOM from "react-dom/client";
import "./assets/_index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { indexedDBStart } from "./util/indexedDB.ts";
indexedDBStart();
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);
