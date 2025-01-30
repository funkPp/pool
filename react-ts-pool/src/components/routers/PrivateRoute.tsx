import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";
import { history } from "../../shared";

export function PrivateRoute() {
  const auth = useAppSelector((x) => x.auth.value);
  if (!auth) {
    return <Navigate to="/account/login" state={{ from: history.location }} />;
  }
  return <Outlet />;
}
