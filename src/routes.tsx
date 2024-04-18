import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/_layout";
import Result from "./pages/result";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/result",
        element: <Result />,
      },
    ],
  },
]);

export default router;
