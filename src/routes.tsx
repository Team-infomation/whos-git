import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/_layout";
import Result from "./pages/result";
import Home from "./pages/home";
import MemberDetail from "./pages/detail";

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
      {
        path: "/detail",
        element: <MemberDetail />,
      },
    ],
  },
]);

export default router;
