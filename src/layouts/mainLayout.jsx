import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/header";
export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
