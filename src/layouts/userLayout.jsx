import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/header";

export const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
