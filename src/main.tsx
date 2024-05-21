// MODULE
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// COMPONENT
import router from "./routes.tsx";
// STYLE
import "./assets/_index.css";
// UTIL
import { indexedDBStart } from "./util/indexedDB.ts";

indexedDBStart();
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HelmetProvider>
    <RouterProvider router={router}></RouterProvider>
  </HelmetProvider>
  // </React.StrictMode>
);
