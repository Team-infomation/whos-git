import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Header from "../component/header";

const Layout: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Suspense fallback={"로딩중"}>
        <Header />
        <Outlet />
      </Suspense>
    </QueryClientProvider>
  );
};

export default Layout;
