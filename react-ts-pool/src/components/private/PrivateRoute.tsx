import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// import { history } from "_helpers";

export function PrivateRoute() {
  // const auth = useSelector((x) => x.auth.value);
  // if (!auth) {
  if (true) {
    return <Navigate to="/account/login" />;
  }

  return <Outlet />;
}
