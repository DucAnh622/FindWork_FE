import { useRoutes } from "react-router-dom";
import { guestRoutes, userRoutes, hrRoutes, adminRoutes } from "./routes";
import { NotFound } from "../pages/notFound";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CircularWithValueLabel } from "../components/customize/loading";
import "../index.scss";
const RootRoutes = () => {
  const loading = useSelector((state) => state.user?.login?.isLoading);

  const element = useRoutes([
    ...guestRoutes,
    ...adminRoutes,
    ...hrRoutes,
    ...userRoutes,
    { path: "*", element: <NotFound /> },
  ]);

  if (loading === true) {
    return <CircularWithValueLabel />;
  }

  return (
    <>
      {element}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default RootRoutes;
