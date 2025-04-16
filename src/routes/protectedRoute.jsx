import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, roles, ...rest }) => {
  const user = useSelector((state) => state.user?.login?.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (rest.path === "/dashboard" && !roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/" />;
  }

  return element;
};
