import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";
import { history } from "../../services";

export function PrivateAdminRoute() {
  const auth = useAppSelector((x) => x.auth.value);

  if (!(auth.role === "admin") && !(auth.role === "owner")) {
    return <Navigate to="/account/login" state={{ from: history.location }} />;
  }
  return <Outlet />;
}
