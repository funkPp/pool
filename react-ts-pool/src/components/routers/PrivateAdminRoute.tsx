import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";
import { history } from "../../shared";

export function PrivateAdminRoute() {
  const auth = useAppSelector((x) => x.auth.value);

  if (!(auth.role === "admin") && !(auth.role === "owner")) {
    return <Navigate to="/" state={{ from: history.location }} />;
  }
  return <Outlet />;
}
