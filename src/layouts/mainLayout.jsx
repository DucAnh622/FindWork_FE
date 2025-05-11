import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/header";
import { Footer } from "../components/shared/footer";
export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
};
