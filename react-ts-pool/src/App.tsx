import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Nav } from "./components/ui-kit/Nav";
import { Home } from "./components/student";
import { UsersLayout } from "./components/coach/users";
import { AccountLayout } from "./components/account";
import { PrivateRoute, PrivateAdminRoute } from "./components/routers";
import { history } from "./services/history";
import { authActions, useAppDispatch, useAppSelector } from "./store";
import { Alert } from "./components/ui-kit/Alert";

function App() {
  const auth = useAppSelector((x) => x.auth.value);
  const dispatch = useAppDispatch();
  const logout = () => dispatch(authActions.logout());
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <div className="bg-gray-200 h-screen">
      <div className="md:max-w-[80%] mx-auto 2xl:max-w-[70%] p-2 bg-gray-100 h-screen">
        <Nav auth={auth} logout={logout} />
        <Alert />
        <div className="">
          <Routes>
            <Route path="account/*" element={<AccountLayout />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateAdminRoute />}>
                <Route path="/admin/users/*" element={<UsersLayout />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
