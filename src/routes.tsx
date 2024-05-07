import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/_layout";
import Result from "./pages/result";
import Home from "./pages/home";
import MemberDetail from "./pages/detail/[id]";
import RepositoryList from "./pages/repository/[id]";

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
        path: "/:login",
        element: <MemberDetail />,
      },
      {
        path: "/:login/:repoName",
        element: <RepositoryList />,
      },
    ],
  },
]);

export default router;
