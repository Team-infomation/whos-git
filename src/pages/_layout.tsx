import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/header";

const Layout: React.FC = () => {
  return (
    <Suspense fallback={"로딩중"}>
      <Header />
      <Outlet />
    </Suspense>
  );
};

export default Layout;
