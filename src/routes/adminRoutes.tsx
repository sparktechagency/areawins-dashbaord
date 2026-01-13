import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const user = {
    role: "Admin",
  };
  const isAdmin =
    (user && user?.role === "Admin") || user?.role === "Super_Admin";
  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  // If admin, render the requested admin route component
  return <>{children}</>;
};

export default AdminRoutes;
